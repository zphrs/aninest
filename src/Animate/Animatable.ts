/**
 * This module deals with creating and modifying animations.
 * @module Animatable
 */

import { clamp, lerpFunc } from "../Utils/vec2"
import { broadcast, type Listener, type Listeners } from "../Listeners"
import type { Interp } from "./Interp"

export type Animatable = { [key: string]: number }

export type Bounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

export type PartialBounds<T> = Partial<Bounds<T>>

export type AnimatableEvents = "start" | "end" | "bounce" | "interrupt"

/**
 * @description The generic type of the animation state.
 * @example 
{ 
  a: {x: 0, y: 0},
  b: {x: 0, y: 0} 
}
 */
export type RecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown>
    ? RecursiveAnimatable<T[P]>
    : number
}

export type LocalRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends number ? number : undefined
} & Animatable

type ChildrenOfRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? T[P] : undefined
}

export type PartialRecursiveAnimatable<T> = {
  [P in keyof T]?: T[P] extends number
    ? number
    : PartialRecursiveAnimatable<T[P]>
}

export type Mask<T> = {
  [P in keyof T]: T[P] | boolean
}

export type AnimationWithoutChildren<
  Animating extends RecursiveAnimatable<unknown>
> = {
  _time: number
  _timingFunction: Interp
  _from: LocalRecursiveAnimatable<Animating>
  _to: Partial<LocalRecursiveAnimatable<Animating>> | null
  _bounds: Bounds<LocalRecursiveAnimatable<Animating>>
} & Listeners<AnimatableEvents, Partial<LocalRecursiveAnimatable<Animating>>> &
  Listeners<"recursiveStart", undefined>

export type Animation<Animating extends RecursiveAnimatable<unknown>> =
  AnimationWithoutChildren<Animating> & {
    readonly children: {
      [P in keyof Animating]: Animating[P] extends number
        ? undefined
        : Animation<RecursiveAnimatable<Animating[P]>>
    }
  }

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

type WritableAnimation<T extends RecursiveAnimatable<unknown>> = Writeable<
  Animation<T>
>

function getProgress<Animating extends Animatable>(anim: Animation<Animating>) {
  return clamp(0, anim._timingFunction(anim._time), 1)
}
/**
 * @module Animation
 * @group Utils
 * @param anim The animation object
 * @returns whether the animation needs to be updated
 */
export function animationNeedsUpdate<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  return anim._to != null && getProgress(anim) < 1 - Number.EPSILON
}

function lerpAnimatable<Animating extends Animatable>(
  from: Animating,
  to: Partial<Animating>,
  progress: number
) {
  const out = {} as Animatable
  for (const [key, fromValue] of Object.entries(from)) {
    const toValue = to[key]
    out[key] =
      toValue !== undefined ? lerpFunc(fromValue, toValue, progress) : fromValue
  }

  return out
}

function copyObject<T>(obj: T) {
  return { ...obj }
}

function createLocalAnimation<Animating extends RecursiveAnimatable<unknown>>(
  init: LocalRecursiveAnimatable<Animating>,
  timing: Interp,
  bounds: PartialBounds<LocalRecursiveAnimatable<Animating>>
): AnimationWithoutChildren<Animating> {
  const initCpy = copyObject(init)
  const boundsCpy = copyObject(bounds)
  return {
    _time: 0,
    _timingFunction: timing,
    _from: initCpy,
    _to: null,
    _bounds: boundsCpy as Bounds<LocalRecursiveAnimatable<Animating>>,
    startListeners: new Set(),
    endListeners: new Set(),
    bounceListeners: new Set(),
    interruptListeners: new Set(),
    recursiveStartListeners: new Set(),
  }
}

function separateChildren<T extends RecursiveAnimatable<unknown>>(
  obj: T
): [LocalRecursiveAnimatable<T>, ChildrenOfRecursiveAnimatable<T>] {
  const anim = {} as LocalRecursiveAnimatable<T>
  const children = {} as ChildrenOfRecursiveAnimatable<T>
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === "number") {
      anim[key] = value as LocalRecursiveAnimatable<T>[Extract<keyof T, string>]
    } else {
      children[key] =
        value as unknown as ChildrenOfRecursiveAnimatable<T>[Extract<
          keyof T,
          string
        >]
    }
  }
  return [anim, children]
}

/**
 * Creates an animation info object, automatically inferring type from the init object.
 * @example
 * const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
 *   upper: { a: 1, b: 1 },
 *   lower: { a: -1, b: -1 },
 * })
 * @param init The initial state of the animation
 * @param timing The timing function. See [Interp.ts](./Interp.ts) for some common timing functions
 * @param bounds Optional bounds for the animation. The animation will be loosely clamped to these bounds
 * @returns The animation info object.
 */
export function createAnimation<Init extends RecursiveAnimatable<unknown>>(
  init: Init,
  timing: Interp,
  bounds?: Bounds<Init>
): Animation<Init> {
  const [anim, children] = separateChildren(init)
  const { upper: upperBounds, lower: lowerBounds } = bounds || {
    upper: undefined,
    lower: undefined,
  }
  const [upperBoundsAnim, upperBoundsChildren] = separateChildren(
    upperBounds || {}
  )
  const [lowerBoundsAnim, lowerBoundsChildren] = separateChildren(
    lowerBounds || {}
  )
  const info = createLocalAnimation(anim, timing, {
    upper: upperBoundsAnim,
    lower: lowerBoundsAnim,
  }) as WritableAnimation<Init>

  info.children = {} as WritableAnimation<Init>["children"]
  for (const [key, child] of Object.entries(children)) {
    const childBounds = {
      upper: upperBoundsChildren[key as keyof typeof upperBoundsChildren],
      lower: lowerBoundsChildren[key as keyof typeof lowerBoundsChildren],
    }
    info.children[key as keyof typeof info.children] = createAnimation(
      child as RecursiveAnimatable<unknown>,
      timing,
      childBounds
    ) as Init[keyof Init] extends number
      ? undefined
      : Animation<RecursiveAnimatable<Init[keyof Init]>>
  }
  return info as Animation<Init>
}
/**
 * Sets the final stopping point of the animation.
 * The animation will start to interpolate to the new state.
 * @example
 * modifyTo<{a: number, b: number}>(anim, { a: 1, b: 1 })
 * @example
 * modifyTo<{a: Vec2, b: Vec2}>(anim, {a: {x: 1}})
 * @example
 * modifyTo<{a: Vec2, b: Vec2}>(anim.children.a, {x: 1})
 * @param anim The animation object
 * @param to The new partial state of the animation. A partial state
 * means that if the complete state is `{ a: 0, b: 0 }` and you call `modifyTo(anim, { a: 1 })`,
 * the new target state will be `{ a: 1, b: 0 }`.
 *
 */
export function modifyTo<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  to: PartialRecursiveAnimatable<Animating>
) {
  const [localTo, children] = separateChildren(
    to as RecursiveAnimatable<unknown>
  )
  // modify children recursively
  for (const [key, child] of Object.entries(children)) {
    const childInfo = anim.children[key as keyof Animating]
    if (!childInfo) continue
    modifyTo(childInfo, child as PartialRecursiveAnimatable<unknown>)
  }
  if (Object.keys(localTo).length === 0) return
  let completeTo = localTo as Partial<LocalRecursiveAnimatable<Animating>>
  if (anim._to) {
    completeTo = mergeDicts(anim._to, localTo)
    saveState(anim, getLocalState(anim))
    broadcast(anim.interruptListeners, completeTo)
  }
  anim._time = 0
  anim._to = completeTo
  updateAnimation(anim, 0)
  broadcast(anim.startListeners, completeTo)
  broadcast(anim.recursiveStartListeners, undefined)
}
/**
 * Adds a local listener to the animation. You can listen to the following events:
 * - start
 * - end
 * - bounce: hitting a bound
 * - interrupt: when a new `modifyTo` is called before the animation is finished
 * Animation listeners are scoped to only trigger when the current level of the animation is modified.
 * @example
 * const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
 * addListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
 * addListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
 * modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
 * @see {@link addRecursiveStartListener} for a recursive listener which triggers on any child modification
 * @see {@link removeListener} to remove a listener from an animation
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt"
 * @param listener The listener function - return true from the function to remove the listener
 */
export function addLocalListener<
  Animating extends RecursiveAnimatable<unknown>
>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
) {
  anim[`${type}Listeners`].add(listener)
}

/**
 * Removes a listener from the animation
 * @see {@link addLocalListener} to add a listener to an animation
 * @example
 * // setup
 * const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
 * const listener = state => console.log("started", state)
 * addListener(anim, "start", listener)
 *
 * modifyTo(anim, {a: {x: 1}}) // will trigger the listener
 *
 * removeListener(anim, "start", listener)
 * modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt" - the type used to add the listener
 * @param listener The listener function to remove
 */
export function removeListener<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
) {
  anim[`${type}Listeners`].delete(listener)
}

/**
 * Adds a recursive start listener to the animation. This listener will trigger on any child modification.
 * @example
 * const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
 * addRecursiveStartListener(anim, () => console.log("started")) // will trigger
 * @param anim
 * @param listener
 */
export function addRecursiveStartListener<
  Animating extends RecursiveAnimatable<unknown>
>(anim: Animation<Animating>, listener: Listener<undefined>) {
  for (const childInfo of Object.values<
    Animation<RecursiveAnimatable<unknown>>
  >(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
    }
  )) {
    addRecursiveStartListener(childInfo, listener)
  }
  anim.recursiveStartListeners.add(listener)
}

/**
 * Removes a recursive start listener from the animation
 * @example
 * // setup
 * const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
 * const listener = () => console.log("started")
 * addRecursiveStartListener(anim, listener)
 *
 * modifyTo(anim.children.a, {x: 1}) // will trigger the listener
 *
 * removeRecursiveStartListener(anim, listener)
 * modifyTo(anim.children.a, {x: 0}) // will not trigger the listener
 * @param anim
 * @param listener
 */
export function removeRecursiveStartListener<
  Animating extends RecursiveAnimatable<unknown>
>(anim: Animation<Animating>, listener: Listener<undefined>) {
  for (const childInfo of Object.values<
    Animation<RecursiveAnimatable<unknown>>
  >(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
    }
  )) {
    removeRecursiveStartListener(childInfo, listener)
  }
  anim.recursiveStartListeners.delete(listener)
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

/**
 * Modifies the bounds of an object, changing what the animation is currently interpolating to.
 * Note: you might have to call `updateAnimationInfo` after this to make sure the animation is updated,
 * if the current state is outside the new bounds.
 * You can also call `animationNeedsUpdate` to check if the animation needs to be updated before calling `updateAnimationInfo`.
 * @example
 * const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
 *  upper: { a: 1, b: 1 },
 * })
 * modifyTo(anim, { a: 2 }) // will animate out to `a: 2` and then bounce back to `a: 1`
 * ...// run updateAnimationInfo in a loop here
 * modifyAnimationBounds(anim, {
 * lower: { b: -1 },
 * })
 * @param anim The animation to modify
 * @param bounds The new bounds to set. They can be partial and will be merged with the old bounds.
 */
export function boundAnimation<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  bounds: PartialBounds<PartialRecursiveAnimatable<Animating>> | undefined
) {
  const { upper: upperBounds, lower: lowerBounds } = bounds || {
    upper: undefined,
    lower: undefined,
  }
  const [upperBoundsAnim, upperBoundsChildren] = separateChildren(
    upperBounds || {}
  )
  const [lowerBoundsAnim, lowerBoundsChildren] = separateChildren(
    lowerBounds || {}
  )

  const localBounds: Bounds<Animating> = {
    lower: mergeDicts(anim._bounds?.lower, lowerBoundsAnim),
    upper: mergeDicts(anim._bounds?.upper, upperBoundsAnim),
  }
  anim._bounds = localBounds as Bounds<LocalRecursiveAnimatable<Animating>>
  for (const [key, child] of Object.entries(anim.children)) {
    const childBounds = {
      upper: upperBoundsChildren[key as keyof typeof upperBoundsChildren],
      lower: lowerBoundsChildren[key as keyof typeof lowerBoundsChildren],
    }
    boundAnimation(
      child as Animation<RecursiveAnimatable<unknown>>,
      childBounds
    )
  }

  boundLocalAnimation(anim)
}

function boundLocalAnimation<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  const { upper, lower } = anim._bounds
  const interpingTo = getLocalInterpingTo(anim)
  for (const key in interpingTo) {
    const currVal = interpingTo[key]
    const lowerBound = lower[key]
    const upperBound = upper[key]
    const newVal = clamp(lowerBound, interpingTo[key], upperBound)
    if (newVal !== currVal) {
      modifyTo(anim, {
        [key as keyof Animating]: newVal,
      } as PartialRecursiveAnimatable<Animating>)
      // we know info.to is not null because of modifyTo
      broadcast(anim.bounceListeners, anim._to!)
    }
  }
}

function saveState<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  state: LocalRecursiveAnimatable<Animating>
) {
  anim._from = copyObject(state)
  anim._to = null
  anim._time = 0
}

/**
 * Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.
 * To access the local state of a child, use `anim.children.childName` as the input.
 * @example
 * const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
 * const localState = getLocalState(anim) // {}
 * const localStateA = getLocalState(anim.children.a) // {x: 0, y: 0}
 * const localStateB = getLocalState(anim.children.b) // {x: 1, y: 1}
 * @example
 * const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
 * const localState = getLocalState(anim) // { b: 1 }
 * const localStateA = getLocalState(anim.children.a) // { x: 0, y: 0 }
 * @param anim The animation object
 * @returns The local state of the animation
 */
export function getLocalState<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>
) {
  if (anim._to === null) {
    return anim._from
  }
  const progress = getProgress(anim)
  return lerpAnimatable(
    anim._from,
    anim._to,
    progress
  ) as LocalRecursiveAnimatable<Animating>
}

/**
 * Gets the total state of the animation, including all children.
 * @example
 * const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
 * const state = getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 1, y: 1}}
 * const stateA = getStateTree(anim.children.a) // {x: 0, y: 0}
 * const stateB = getStateTree(anim.children.b) // {x: 1, y: 1}
 * @param anim
 * @returns
 */
export function getStateTree<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>
): Animating {
  const out = getLocalState(anim) as Animating
  for (const [key, childInfo] of Object.entries(anim.children)) {
    out[key as keyof typeof anim.children] = getStateTree(
      childInfo as Animation<RecursiveAnimatable<unknown>>
    ) as Animating[keyof Animating]
  }
  return out
}

/**
 * Updates the animation by incrementing the current timestamp of the animation by `dt`.
 * @param anim The animation object
 * @param dt The time to increment the animation by. Must be positive. If negative or zero then no-op.
 * @returns {boolean} whether the animation needs to be updated again
 */
export function updateAnimation<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  dt: number
): boolean {
  if (dt < 0) dt = 0
  anim._time += dt
  let out = animationNeedsUpdate(anim)
  // update children
  for (const childInfo of Object.values<
    Animation<RecursiveAnimatable<unknown>>
  >(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
    }
  )) {
    if (updateAnimation(childInfo, dt)) {
      out = true
    }
  }
  if (!out && anim._to) {
    const newState = mergeDicts(anim._from, anim._to)
    saveState<Animating>(anim, newState)
    boundLocalAnimation(anim)
    broadcast(anim.endListeners, anim._from)
    // needs two calls to animationNeedsUpdate
    // because boundAnimation might call modifyTo for info
    // which would make info need an update
    out = animationNeedsUpdate(anim)
    if (!out) {
      broadcast(anim.endListeners, anim._from)
    }
  }
  return out
}

/**
 * Changes the interpolation function of specific subproperties based on the mask.
 *
 * Note: you only have the granularity of each dictionary level. For instance,
 * if you had the following animation structure:
 * ```ts
 * const anim = createAnimation({a: {x: 0, y: 0}, b: {x: 0, y: 0}}, getLinearInterp(1))
 * ```
 * then you could change the interpolation function of `a` and `b` but not `a.x` and `a.y`.
 * To change `a.x` seprately from `a.y`, this would be your structure:
 * ```ts
 * const anim = createAnimation({a: {x: {value: 0}, y: {value: 0}}, b: {x: 0, y: 0}}, getLinearInterp(1))
 * // only changes `a.x` interp function
 * changeInterpFunction(anim, getLinearInterp(2), {a: {x: true, y: false}, b: false})
 * ```
 * Then to get the value of `a.x` you would call `getLocalState(anim.children.a.children.x).value`.
 *
 * To get the `value` of both `x` and `y` and simply store set the variables `x` and `y` to the
 * respective values you could do:
 * ```ts
 * const {x: {value: x}, y: {value: y}} = getStateTree(anim.children.a)
 * ```
 * @example
 * const anim = createAnimation({a: newVec2(0, 0), b: newVec2(0, 0)}, getLinearInterp(1))
 * modifyTo(anim, {a: newVec2(1, 1), b: newVec2(1, 1)})
 * getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
 * updateAnimation(anim, 0.5)
 * getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.5, y: 0.5}}
 * changeInterpFunction(anim, getLinearInterp(2), {a: false}) // doesn't change a, does change b
 * updateAnimation(anim, 0.5)
 * getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.75, y: 0.75}}
 * @param anim
 * @param interp
 * @param mask Assumes default of true for all keys. It is optional.
 */
export function changeInterpFunction<
  Animating extends RecursiveAnimatable<unknown>
>(
  anim: Animation<Animating>,
  interp: Interp,
  mask: Partial<Mask<Animating>> = {} // assumes default of true for all keys
) {
  anim._timingFunction = interp
  anim._time = 0
  const to = getLocalInterpingTo(anim)
  saveState(anim, getLocalState(anim))
  anim._to = to
  broadcast(anim.recursiveStartListeners, undefined)
  updateAnimation(anim, 0)
  // update children
  const filteredChildren = Object.entries(anim.children).filter(
    ([key, _]) => mask[key as keyof typeof mask] !== false
  ) as [keyof Animating, Animation<RecursiveAnimatable<unknown>>][]
  for (const [key, childInfo] of filteredChildren) {
    changeInterpFunction(
      childInfo as Animation<Animatable>,
      interp,
      mask[key as keyof typeof mask] as Partial<Mask<Animatable>>
    )
  }
}
/**
 * Gets the local target state that the animation is currently headed to.
 * If the animation is not headed to any state, it will return the current state.
 * This only returns the local state of the animation, meaning only the numbers
 * in the topmost level of the input animation.
 * @example
 * const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
 * getLocalInterpingTo(anim) // {b: 0, c: 0}
 * modifyTo(anim, {a: newVec(1, 1), b: 1})
 * getLocalInterpingTo(anim) // {b: 1, c: 0}
 * @param anim The animation object
 * @returns The local target state of the animation
 */
export function getLocalInterpingTo<
  Animating extends Partial<LocalRecursiveAnimatable<unknown>>
>(anim: Animation<Animating>) {
  if (anim._to === null) {
    return anim._from
  }
  return mergeDicts(anim._from, anim._to) as Animating
}
/**
 * Gets the total target state that the animation is currently headed to.
 * If the animation is not headed to any state, it will return the current state.
 * @example
 * const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
 * getInterpingToTree(anim) // {a: {x: 0, y: 0}, b: 0, c: 0}
 * modifyTo(anim, {a: newVec(1, 1), b: 1})
 * getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0}
 * @param anim
 * @returns
 */
export function getInterpingToTree<
  Animating extends RecursiveAnimatable<unknown>
>(anim: Animation<Animating>): Animating {
  const out = getLocalInterpingTo(anim) as Animating
  for (const [key, childInfo] of Object.entries<
    Animation<RecursiveAnimatable<unknown>>
  >(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
    }
  )) {
    out[key as keyof Animating] = getInterpingToTree(
      childInfo
    ) as Animating[keyof Animating]
  }
  return out
}
