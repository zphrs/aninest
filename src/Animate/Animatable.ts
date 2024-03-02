import { clamp, lerpFunc } from '../Utils/vec2'
import { broadcast, type Listener, type Listeners } from '../Listeners'
import type { Interp } from './Interp'

export type Animatable = { [key: string]: number }

export type Bounds<T> = {
	lower?: Partial<T>
	upper?: Partial<T>
}

export type AnimatableEvents = 'start' | 'end' | 'bounce' | 'interrupt'

export type RecursiveAnimatable<T> = {
	[P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? RecursiveAnimatable<T[P]> : number
}

type LocalRecursiveAnimatable<T> = {
	[P in keyof T]: T[P] extends number ? number : undefined
} & Animatable

type ChildrenOfRecursiveAnimatable<T> = {
	[P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? T[P] : undefined
}

type PartialRecursiveAnimatable<T> = {
	[P in keyof T]?: T[P] extends number ? number : PartialRecursiveAnimatable<T[P]>
}

type Mask<T> = {
	[P in keyof T]: T[P] | boolean
}

export type AnimationInfoWithoutChildren<Animating extends RecursiveAnimatable<unknown>> = {
	time: number
	timingFunction: Interp
	from: LocalRecursiveAnimatable<Animating>
	to: Partial<LocalRecursiveAnimatable<Animating>> | null
	bounds?: Bounds<LocalRecursiveAnimatable<Animating>>
} & Listeners<AnimatableEvents, Partial<LocalRecursiveAnimatable<Animating>>> &
	Listeners<'recursiveStart', undefined>

export type AnimationInfo<Animating extends RecursiveAnimatable<unknown>> =
	AnimationInfoWithoutChildren<Animating> & {
		children: {
			[P in keyof Animating]: Animating[P] extends number
				? undefined
				: AnimationInfo<RecursiveAnimatable<Animating[P]>>
		}
	}

function getProgress<Animating extends Animatable>(info: AnimationInfo<Animating>) {
	return clamp(0, info.timingFunction(info.time), 1)
}

export function animationNeedsUpdate<Animating extends Animatable>(info: AnimationInfo<Animating>) {
	return info.to != null && getProgress(info) < 1 - Number.EPSILON
}

function lerpAnimatable<Animating extends Animatable>(
	from: Animating,
	to: Partial<Animating>,
	progress: number
) {
	const out = {} as Animatable
	for (const [key, fromValue] of Object.entries(from)) {
		const toValue = to[key]
		out[key] = toValue !== undefined ? lerpFunc(fromValue, toValue, progress) : fromValue
	}

	return out
}

function copyObject<T>(obj: T) {
	return { ...obj }
}
export function createLocalAnimationInfo<Animating extends RecursiveAnimatable<unknown>>(
	init: LocalRecursiveAnimatable<Animating>,
	timing: Interp,
	bounds?: LocalRecursiveAnimatable<Bounds<Animating>>
): AnimationInfoWithoutChildren<Animating> {
	const initCpy = copyObject(init)
	const boundsCpy = bounds ? copyObject(bounds) : undefined
	return {
		time: 0,
		timingFunction: timing,
		from: initCpy,
		to: null,
		bounds: boundsCpy as Bounds<LocalRecursiveAnimatable<Animating>>,
		startListeners: new Set(),
		endListeners: new Set(),
		bounceListeners: new Set(),
		interruptListeners: new Set(),
		recursiveStartListeners: new Set()
	}
}

function separateChildren<T extends RecursiveAnimatable<unknown>>(
	obj: T
): [LocalRecursiveAnimatable<T>, ChildrenOfRecursiveAnimatable<T>] {
	const anim = {} as LocalRecursiveAnimatable<T>
	const children = {} as ChildrenOfRecursiveAnimatable<T>
	for (const key in obj) {
		const value = obj[key]
		if (typeof value === 'number') {
			anim[key] = value as LocalRecursiveAnimatable<T>[Extract<keyof T, string>]
		} else {
			children[key] = value as unknown as ChildrenOfRecursiveAnimatable<T>[Extract<keyof T, string>]
		}
	}
	return [anim, children]
}

export function createAnimationInfo<Init extends RecursiveAnimatable<unknown>>(
	init: Init,
	timing: Interp,
	bounds?: Bounds<Init>
): AnimationInfo<Init> {
	const [anim, children] = separateChildren(init)
	const [boundsAnim, _boundsChildren] = separateChildren(bounds ?? {})
	const info = createLocalAnimationInfo(anim, timing, boundsAnim) as unknown as AnimationInfo<Init>
	info.children = {} as AnimationInfo<Init>['children']
	for (const [key, child] of Object.entries(children)) {
		info.children[key as keyof typeof info.children] = createAnimationInfo(
			child as RecursiveAnimatable<unknown>,
			timing,
			bounds
		) as Init[keyof Init] extends number
			? undefined
			: AnimationInfo<RecursiveAnimatable<Init[keyof Init]>>
	}
	return info as unknown as AnimationInfo<Init>
}

export function modifyTo<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	to: PartialRecursiveAnimatable<Animating>
) {
	const [localTo, children] = separateChildren(to as RecursiveAnimatable<unknown>)
	// modify children recursively
	for (const [key, child] of Object.entries(children)) {
		const childInfo = info.children[key as keyof Animating]
		if (!childInfo) continue
		modifyTo(childInfo, child as PartialRecursiveAnimatable<unknown>)
	}
	if (Object.keys(localTo).length === 0) return
	let completeTo = localTo as Partial<LocalRecursiveAnimatable<Animating>>
	if (info.to) {
		completeTo = mergeDicts(info.to, localTo)
		saveState(info, getCurrentState(info))
		broadcast(info.interruptListeners, completeTo)
	}
	info.time = 0
	info.to = completeTo
	updateAnimationInfo(info, 0)
	broadcast(info.startListeners, completeTo)
	broadcast(info.recursiveStartListeners, undefined)
}

export function addListener<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	type: AnimatableEvents,
	listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
) {
	info[`${type}Listeners`].add(listener)
}
export function removeListener<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	type: AnimatableEvents,
	listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
) {
	info[`${type}Listeners`].delete(listener)
}

export function addRecursiveStartListener<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	listener: Listener<undefined>
) {
	for (const childInfo of Object.values<AnimationInfo<RecursiveAnimatable<unknown>>>(
		info.children as unknown as {
			[s: string]: AnimationInfo<RecursiveAnimatable<unknown>>
		}
	)) {
		addRecursiveStartListener(childInfo, listener)
	}
	info.recursiveStartListeners.add(listener)
}

export function removeRecursiveStartListener<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	listener: Listener<undefined>
) {
	for (const childInfo of Object.values<AnimationInfo<RecursiveAnimatable<unknown>>>(
		info.children as unknown as {
			[s: string]: AnimationInfo<RecursiveAnimatable<unknown>>
		}
	)) {
		removeRecursiveStartListener(childInfo, listener)
	}
	info.recursiveStartListeners.delete(listener)
}

function mergeDicts<T1 extends object, T2 extends object>(
	oldBounds: T1 | undefined,
	newBounds: T2 | undefined
): T1 & T2 {
	type Combined = T1 & T2
	const out = {} as Combined
	if (oldBounds) {
		for (const key in oldBounds) {
			out[key] = oldBounds[key] as Combined[Extract<keyof T1, string>]
		}
	}
	for (const key in newBounds) {
		out[key] = newBounds[key] as Combined[Extract<keyof T2, string>]
	}
	return out
}

export function modifyAnimationBounds<Animating extends Animatable>(
	info: AnimationInfo<Animating>,
	bounds: Bounds<Animating> | undefined
) {
	info.bounds = mergeDicts(info.bounds, bounds)
}

function boundAnimation<Animating extends Animatable>(info: AnimationInfo<Animating>) {
	if (!info.bounds) return
	const { upper, lower } = info.bounds
	function getOrUndefined<T>(dict: T | undefined, key: string) {
		return dict ? dict[key as keyof T] : undefined
	}
	for (const key in info.from) {
		const currVal = info.from[key]
		const lowerBound = getOrUndefined(lower, key)
		const upperBound = getOrUndefined(upper, key)
		const newVal = clamp(lowerBound, info.from[key], upperBound)
		if (newVal !== currVal) {
			modifyTo(info, {
				[key as keyof Animating]: newVal
			} as PartialRecursiveAnimatable<Animating>)
			// we know info.to is not null because of modifyTo
			broadcast(info.bounceListeners, info.to!)
		}
	}
}

function saveState<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	state: LocalRecursiveAnimatable<Animating>
) {
	info.from = copyObject(state)
	info.to = null
	info.time = 0
}

export function getCurrentState<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>
) {
	if (info.to === null) {
		return info.from
	}
	const progress = getProgress(info)
	return lerpAnimatable(info.from, info.to, progress) as LocalRecursiveAnimatable<Animating>
}

export function getCurrentStateWithChildren<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>
): Animating {
	const out = getCurrentState(info) as Animating
	for (const [key, childInfo] of Object.entries(info.children)) {
		out[key as keyof Animating] = getCurrentStateWithChildren(
			childInfo as AnimationInfo<RecursiveAnimatable<unknown>>
		) as Animating[keyof Animating]
	}
	return out
}

/**
 * @returns whether the animation needs to be updated again
 */
export function updateAnimationInfo<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	dt: number
): boolean {
	info.time += dt
	// needs two calls to animationNeedsUpdate
	// because boundAnimation might call modifyTo for info
	// which would make info need an update
	if (!animationNeedsUpdate(info)) {
		boundAnimation(info)
	}
	let out = animationNeedsUpdate(info)
	// update children
	for (const childInfo of Object.values<AnimationInfo<RecursiveAnimatable<unknown>>>(
		info.children as unknown as {
			[s: string]: AnimationInfo<RecursiveAnimatable<unknown>>
		}
	)) {
		if (updateAnimationInfo(childInfo, dt)) {
			out = true
		}
	}
	if (!out && info.to) {
		const newState = mergeDicts(info.from, info.to)
		saveState<Animating>(info, newState)
		broadcast(info.endListeners, info.from)
		return true
	}
	return out
}

export function changeInterpFunction<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>,
	interp: Interp,
	mask: Partial<Mask<Animating>> = {} // assumes default of true for all keys
) {
	info.timingFunction = interp
	info.time = 0
	saveState(info, getCurrentState(info))
	broadcast(info.recursiveStartListeners, undefined)
	updateAnimationInfo(info, 0)
	// update children
	const filteredChildren = Object.entries(info.children).filter(
		([key, _]) => mask[key as keyof typeof mask] !== false
	) as [keyof Animating, AnimationInfo<RecursiveAnimatable<unknown>>][]
	for (const [key, childInfo] of filteredChildren) {
		changeInterpFunction(
			childInfo as AnimationInfo<Animatable>,
			interp,
			mask[key as keyof typeof mask] as Partial<Mask<Animatable>>
		)
	}
}

export function getInterpingTo<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>
) {
	if (info.to === null) {
		return info.from
	}
	return mergeDicts(info.to, info.from) as Animating
}

export function getInterpingToWithChildren<Animating extends RecursiveAnimatable<unknown>>(
	info: AnimationInfo<Animating>
): Animating {
	const out = getInterpingTo(info) as Animating
	for (const [key, childInfo] of Object.entries<AnimationInfo<RecursiveAnimatable<unknown>>>(
		info.children as unknown as {
			[s: string]: AnimationInfo<RecursiveAnimatable<unknown>>
		}
	)) {
		out[key as keyof Animating] = getInterpingToWithChildren(
			childInfo
		) as Animating[keyof Animating]
	}
	return out
}
