/**
 * This module deals with creating and modifying Animations.
 * @module Animatable
 */

import { lerpFunc } from "../Utils/vec2"
import { broadcast, type Listener } from "../Listeners"
import { type Interp } from "./Interp"
import type {
  Animation,
  Animatable,
  AnimationWithoutChildren,
  LocalAnimatable,
  PartialRecursiveAnimatable,
  RecursiveAnimatable,
  UnknownRecursiveAnimatable as UnknownRecursiveAnimatable,
  UnknownAnimation,
  WritableAnimation,
} from "./AnimatableTypes"
import {
  HasChildren,
  Mask,
  perMaskedChild,
  separateChildren,
} from "./RecursiveHelpers"
import {
  ANIM_TYPES,
  removeRecursiveListener,
  addLocalListener,
  ANIM_TYPES_WITH_VALUE,
} from "./AnimatableEvents"
import type { Vec2 } from "../Utils/vec2"
import { capitalizeFirstLetter } from "../Utils"

function getProgress<Animating extends Animatable>(
  anim: Animation<Animating>
): number | undefined {
  const progress = anim._timingFunction(anim._time)
  if (progress === undefined) {
    return undefined
  }
  return progress
}
/**
 * Returns whether the animation needs to be updated.
 * @group Status
 * @param anim The animation object
 * @returns whether the animation needs to be updated
 */
export function animationNeedsUpdate<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  return anim._to != null && getProgress(anim) != undefined
}

function lerpAnimatable<Animating extends Animatable>(
  from: Animating,
  to: Partial<Animating>,
  progress: number,
  into: Animating = {} as Animating,
  skipFrom = false
): Animating {
  const out = into as Animatable
  if (!skipFrom) Object.assign(out, from)
  for (const [key, toValue] of Object.entries(to)) {
    const fromValue = from[key]
    out[key] = lerpFunc(fromValue, toValue as number, progress)
  }
  return out as Animating
}

function copyObject<T>(obj: T, into: object = {}): T {
  const out = into as T
  for (const key in obj) {
    out[key] = obj[key]
  }
  return out
}

function recursivelyCopyObject<T>(obj: T): T {
  const out = {} as T
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === "number") {
      out[key] = value
    } else {
      out[key] = recursivelyCopyObject(value)
    }
  }
  return out
}

function createLocalAnimation<Animating extends UnknownRecursiveAnimatable>(
  init: LocalAnimatable<Animating>,
  timing: Interp
): AnimationWithoutChildren<Animating> {
  const initCpy = recursivelyCopyObject(init)
  const anim = {
    _time: 0,
    _timingFunction: timing,
    _from: initCpy,
    _to: null,
  } as AnimationWithoutChildren<Animating>
  for (const type of ANIM_TYPES) {
    anim[`${type}Listeners`] = new Map()
    if (type != "update")
      anim[`recursive${capitalizeFirstLetter(type)}Listeners`] = new Map()
  }
  return anim
}

function addRecursiveListeners(info: UnknownAnimation) {
  // add the recursive listeners
  for (const eventType of ANIM_TYPES_WITH_VALUE) {
    const capitalized = capitalizeFirstLetter(eventType)
    const recursiveKey = `recursive${capitalized}Listeners` as const
    const unsubscribe = (listener: Listener<unknown>) => {
      removeRecursiveListener(info, eventType, listener)
    }
    const onLocal = () => {
      broadcast(info[recursiveKey], info, unsubscribe)
    }
    addLocalListener(info, eventType, onLocal)
  }
}

/**
 * Creates an animation info object, automatically inferring type from the init object.
 * @group Construction
 * @example
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
  upper: { a: 1, b: 1 },
  lower: { a: -1, b: -1 },
})
 * @param init The initial state of the animation
 * @param timing The timing function. See {@link Interp} for some common timing functions.
 * @returns The animation info object.
 */
export function createAnimation<Init extends UnknownRecursiveAnimatable>(
  init: Init,
  timing: Interp
): Animation<Init> {
  const [anim, children] = separateChildren(init)
  const info = createLocalAnimation(
    anim as LocalAnimatable<Init>,
    timing
  ) as WritableAnimation<Init>

  info.children = {} as WritableAnimation<Init>["children"]
  for (const [key, child] of Object.entries(children)) {
    info.children[key as keyof typeof info.children] = createAnimation(
      child as UnknownRecursiveAnimatable,
      timing
    ) as Init[keyof Init] extends number
      ? undefined
      : Animation<RecursiveAnimatable<Init[keyof Init]>>
  }
  addRecursiveListeners(info as UnknownAnimation)
  return info as Animation<Init>
}

/**
 * An object which contains either numbers or created animations.
 * @internal
 */
type ParentAnimatable<Animating extends UnknownRecursiveAnimatable> = {
  [K in keyof Animating]: Animating[K] extends number
    ? number
    : UnknownAnimation
}

/**
 * Creates a parent animation from a dictionary of children which will function the same
 * as though the parent and children were created at once.
 * @example
const a = createAnimation({x: 0, y: 0})
const b = createAnimation({x: 1, y: 0})
const anim = createParentAnimation({a, b, c: 1})
 * @param children a dictionary of children animations and numbers. 
 * Note that {@link Animatable} objects are not allowed.
 * @param timing The timing function which will only be applied to the numbers in the provided `children` dictionary.
 * @group Construction
 * @returns
 */
export function createParentAnimation<
  Animating extends UnknownRecursiveAnimatable
>(children: ParentAnimatable<Animating>, timing: Interp) {
  const [anim, anims] = separateChildren(children)
  const info = createLocalAnimation(
    anim as LocalAnimatable<Animating>,
    timing
  ) as WritableAnimation<Animating>
  info.children = anims as unknown as WritableAnimation<Animating>["children"]

  // add the recursive listeners
  addRecursiveListeners(info as UnknownAnimation)
  return info as Animation<Animating>
}
/**
 * Sets the final stopping point of the animation.
 * The animation will start to interpolate to the new state the next
 * time {@link updateAnimation} is called.
 * @group State Modification
 * @example modifyTo<{a: number, b: number}>(anim, { a: 1, b: 1 })
 * @example modifyTo<{a: Vec2, b: Vec2}>(anim, {a: {x: 1}})
 * @example modifyTo<{a: Vec2, b: Vec2}>(anim.children.a, {x: 1})
 * @see {@link Vec2}
 * @param anim The animation object
 * @param to The new partial state of the animation. A partial state
 * means that if the complete state is `{ a: 0, b: 0 }` and you call `modifyTo(anim, { a: 1 })`,
 * the new target state will be `{ a 1, b: 0 }`.
 *
 */
export function modifyTo<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  to: PartialRecursiveAnimatable<Animating>
) {
  const [localTo, children] = separateChildren(to as UnknownRecursiveAnimatable)
  let completeTo = localTo as Partial<LocalAnimatable<Animating>>
  if (anim._to) {
    completeTo = mergeDicts(anim._to, localTo)
    saveState(anim, getLocalState(anim, anim._from, true))
    broadcast(anim.interruptListeners, completeTo)
  }
  if (Object.keys(localTo).length !== 0) {
    // condition due to conditional early exit below
    // used to keep track of if the full modifyTo tree is terminated
    broadcast(anim.beforeStartListeners, completeTo) // (
  }
  // modify children recursively
  for (const [key, childValue] of Object.entries(children)) {
    const childInfo = anim.children[key as keyof Animating]
    if (!childInfo) continue
    modifyTo<Animating>(
      childInfo as Animation<Animating>,
      childValue as PartialRecursiveAnimatable<unknown>
    ) // recursive call a: (something)
  }
  if (Object.keys(localTo).length === 0) return
  anim._time = 0
  anim._to = completeTo
  broadcast(anim.startListeners, completeTo) // )
  updateAnimation(anim, 0)
}

/**
 * Applies the dictionary `toApply` to the base dictionary `base`, modifying the base dictionary in place.
 * @example
base = {a: 1, b: 2, c: 3}
toApply = {a: 0}
applyDictTo(base, toApply) // base == {a: 0, b: 2, c: 3}
 * @param base
 * @param toApply
 * @returns The base dictionary
 * @internal
 */
export function applyDictTo<T1 extends object, T2 extends object>(
  base: T1,
  toApply: T2 | undefined
): T1 & T2 {
  return mergeDicts(base, toApply, base)
}

/**
 *
 * @param oldBounds The old bounds
 * @param newBounds The new bounds (overwrites the old bounds)
 * @param into The object to merge the bounds into
 * @returns either the passed in into object or a new object with the merged bounds
 * @internal
 */
export function mergeDicts<T1 extends object, T2 extends object>(
  oldBounds: T1 | undefined,
  newBounds: T2 | undefined,
  into: object = {}
): T1 & T2 {
  type Combined = T1 & T2
  const out = into as Combined
  // there are no keys in `undefined` so the loop just doesn't have any iterations
  // when oldBounds/newBounds is undefined
  for (const key in oldBounds) {
    out[key] = oldBounds[key] as Combined[Extract<keyof T1, string>]
  }
  for (const key in newBounds) {
    out[key] = newBounds[key] as Combined[Extract<keyof T2, string>]
  }
  return out
}

export function saveState<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  state: LocalAnimatable<Animating>
) {
  copyObject(state, anim._from)
  anim._to = null
  anim._time = 0
}

/**
 * Gets the current local state of the animation, meaning only the numbers in the topmost level of the animation.
 * To access the local state of a child, use `anim.children.childName` as the input.
 * @group State Retrieval
 * @example
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const localState = getLocalState(anim) // {}
const localStateA = getLocalState(anim.children.a) // {x: 0, y: 0}
const localStateB = getLocalState(anim.children.b) // {x: 1, y: 1}
 * @example
const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
const localState = getLocalState(anim) // { b: 1 }
const localStateA = getLocalState(anim.children.a) // { x: 0, y: 0 }
 * @param anim The animation object
 * @returns The local state of the animation
 */
export function getLocalState<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  into: LocalAnimatable<Animating> = {} as LocalAnimatable<Animating>,
  skipFrom = false
): LocalAnimatable<Animating> {
  if (anim._to === null) {
    if (skipFrom) return into
    const out = into as Animatable
    for (const key in anim._from) {
      out[key] = anim._from[key]
    }
    return into as LocalAnimatable<Animating>
  }
  let progress = getProgress(anim)
  if (progress === undefined) {
    if (anim._to === null) {
      return anim._from
    } else {
      progress = 1
    }
  }
  lerpAnimatable(
    anim._from,
    anim._to,
    progress,
    into as LocalAnimatable<Animating>,
    skipFrom
  )
  return into as LocalAnimatable<Animating>
}

export function getLocalValue<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  key: keyof Animating
): number {
  const from = anim._from[key] as number
  if (anim._to === null) {
    return from
  }
  const to = anim._to[key] as number | undefined
  if (to === undefined) {
    return from
  }
  let progress = getProgress(anim)
  if (progress === undefined) {
    progress = 1
  }
  return lerpFunc(from, to, progress)
}

/**
 * Gets the full state of the animation, including all children.
 * @group State Retrieval
 * @example
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const state = getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 1, y: 1}}
const stateA = getStateTree(anim.children.a) // {x: 0, y: 0}
const stateB = getStateTree(anim.children.b) // {x: 1, y: 1}
 * @param anim
 * @returns
 */
export function getStateTree<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  into: object = {},
  skipFrom = false
): Animating {
  const out = into as Animating
  getLocalState(anim, out as LocalAnimatable<Animating>, skipFrom) as Animating
  for (const [key, childInfo] of Object.entries(anim.children)) {
    if (!out[key as keyof typeof anim.children]) {
      out[key as keyof typeof anim.children] = {} as Animating[keyof Animating]
    }
    getStateTree(
      childInfo as UnknownAnimation,
      out[key as keyof typeof anim.children] as RecursiveAnimatable<Animating>
    )
  }
  return out
}

type Seconds = number

/**
 * Moves the animation forward by a certain amount of time.
 * @group State Modification
 * @param anim The animation object
 * @param dt The timestep to increment the animation by. Must be positive.
 * If negative or zero and the interpolation function is not NO_INTERP then no-op.
 * @returns {boolean} true if the animation needs to be updated again
 */
export function updateAnimation<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  dt: Seconds
): boolean {
  if (dt < 0) dt = 0
  let [checkForDoneness, out] = updateAnimationInner(anim, dt)
  for (const child of checkForDoneness || []) {
    // needs two calls to animationNeedsUpdate
    // because listeners might call modifyTo
    // which would make info need an update
    broadcast(child.beforeEndListeners, child._prevTo || {})
    let localOut = animationNeedsUpdate(child)
    if (!localOut) {
      broadcast(child.endListeners, child._from)
    }
    out = out || localOut
  }
  return out
}

type UnknownAnimations = UnknownAnimation[]

function updateAnimationInner<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  dt: number
): [UnknownAnimations, boolean] {
  anim._time += dt
  let out = animationNeedsUpdate(anim)
  let checkForDoneness: UnknownAnimations = []
  const toExists = anim._to !== null
  if (anim._to && dt !== 0) broadcast(anim.updateListeners, undefined)
  const children: UnknownAnimations = Object.values(anim.children)
  // update children
  for (const childInfo of children) {
    let update = updateAnimationInner(childInfo, dt)
    out = out || update[1]
    if (update !== undefined) {
      checkForDoneness = checkForDoneness.concat(update[0])
    }
  }
  if (!out && anim._to) {
    const newState = mergeDicts(anim._from, anim._to)
    const prevTo = anim._to
    saveState(anim, newState as LocalAnimatable<Animating>)
    anim._prevTo = prevTo
    checkForDoneness.push(anim as UnknownAnimation)
  }
  if (toExists && anim._to === null && dt === 0) {
    broadcast(anim.updateListeners, undefined)
  }
  return [checkForDoneness, out]
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
 * @group Interpolation
 * @example
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(0, 0)}, getLinearInterp(1))
modifyTo(anim, {a: newVec2(1, 1), b: newVec2(1, 1)})
getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
updateAnimation(anim, 0.5)
getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.5, y: 0.5}}
changeInterpFunction(anim, getLinearInterp(2), {a: false}) // doesn't change a, does change b
updateAnimation(anim, 0.5)
getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.75, y: 0.75}}
 * @param anim
 * @param interp
 * @param mask Assumes default of true for all keys. It is optional.
 */
export function changeInterpFunction<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  interp: Interp,
  mask: Partial<Mask<Animating>> = {} // assumes default of true for all keys
) {
  const locallyChangeInterpFunction = (
    a: HasChildren<number, UnknownRecursiveAnimatable>
  ) => {
    const anim = a as unknown as UnknownAnimation
    anim._timingFunction = interp
    const to = getLocalInterpingTo(anim)
    saveState(anim, getLocalState(anim, anim._from, true))
    anim._to = to
    updateAnimationInner(anim, 0)
  }
  locallyChangeInterpFunction(anim as UnknownAnimation)
  perMaskedChild(
    anim as HasChildren<number, Animating>,
    mask,
    locallyChangeInterpFunction
  )
}

export function getInterpFunction<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>
) {
  return anim._timingFunction
}
/**
 * Gets the local target state that the animation is currently headed to.
 * If the animation is not headed to any state, it will return the current state.
 * This only returns the local state of the animation, meaning only the numbers
 * in the topmost level of the animation.
 * @group State Retrieval
 * @example
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getLocalInterpingTo(anim) // {b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getLocalInterpingTo(anim) // {b: 1, c: 0}
 * @param anim The animation object
 * @returns The local target state of the animation
 */
export function getLocalInterpingTo<
  Animating extends Partial<LocalAnimatable<UnknownRecursiveAnimatable>>
>(anim: Animation<Animating>, into: object = {}): LocalAnimatable<Animating> {
  if (anim._to === null) {
    return copyObject(anim._from, into)
  }
  return mergeDicts(anim._from, anim._to, into)
}

/**
 * Gets a value
 * @param anim
 * @param key
 * @returns
 * @group State Retrieval
 */
export function getLocalInterpingToValue<
  Animating extends LocalAnimatable<UnknownRecursiveAnimatable>
>(anim: Animation<Animating>, key: keyof Animating): number | undefined {
  if (anim._to === null) {
    return anim._from[key]
  }
  const to = anim._to[key]
  if (to !== undefined) return to
  return anim._from[key]
}

/**
 * Gets the full state tree that the animation is currently interpolating to.
 * If the animation is not headed to any state, it will return the current state.
 * @group State Retrieval
 * @example
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getInterpingToTree(anim) // {a: {x: 0, y: 0}, b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0}
updateAnimation(anim, 0.5)
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0} - same as before update
 * @param anim
 * @returns
 */
export function getInterpingToTree<
  Animating extends UnknownRecursiveAnimatable
>(anim: Animation<Animating>, into: object = {}): Animating {
  const out = getLocalInterpingTo(anim, into) as Animating
  for (const [key, childInfo] of Object.entries<UnknownAnimation>(
    anim.children as unknown as {
      [s: string]: UnknownAnimation
    }
  )) {
    out[key as keyof Animating] = getInterpingToTree(
      childInfo
    ) as Animating[keyof Animating]
  }
  return out
}
