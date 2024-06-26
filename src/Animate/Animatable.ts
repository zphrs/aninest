/**
 * This module deals with creating and modifying animations.
 * @module Animatable
 */

import { clamp, lerpFunc } from "../Utils/vec2"
import { broadcast, type Listener } from "../Listeners"
import { type Interp } from "./Interp"
import type {
  Animation,
  Animatable,
  Bounds,
  AnimationWithoutChildren,
  LocalAnimatable,
  PartialBounds,
  PartialRecursiveAnimatable,
  RecursiveAnimatable,
  UnknownRecursiveAnimatable as UnknownRecursiveAnimatable,
  UnknownAnimation,
  UnknownAnimations,
  unsubscribe,
  WritableAnimation,
  Mask,
} from "./AnimatableTypes"
import { separateChildren } from "./RecursiveHelpers"
import {
  START,
  END,
  BOUNCE,
  INTERRUPT,
  UPDATE,
  AnimatableEvents,
  AnimatableEventsWithValue,
  ANIM_TYPES,
} from "./AnimatableEvents"

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
 * @internal
 */
function animationNeedsUpdate<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  return anim._to != null && getProgress(anim) != undefined
}

function lerpAnimatable<Animating extends Animatable>(
  from: Animating,
  to: Partial<Animating>,
  progress: number,
  into: Animating = {} as Animating
): Animating {
  const out = into as Animatable
  for (const [key, fromValue] of Object.entries(from)) {
    const toValue = to[key]
    out[key] =
      toValue !== undefined ? lerpFunc(fromValue, toValue, progress) : fromValue
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

function capitalizeFirstLetter<T extends string>(string: T): Capitalize<T> {
  return (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<T>
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
  timing: Interp,
  bounds: PartialBounds<LocalAnimatable<Animating>>
): AnimationWithoutChildren<Animating> {
  const initCpy = recursivelyCopyObject(init)
  const boundsCpy = recursivelyCopyObject(bounds)
  const anim = {
    _time: 0,
    _timingFunction: timing,
    _from: initCpy,
    _to: null,
    _bounds: boundsCpy as Bounds<LocalAnimatable<Animating>>,
  } as AnimationWithoutChildren<Animating>
  for (const type of ANIM_TYPES) {
    anim[`${type}Listeners`] = new Set() as any
    anim[`recursive${capitalizeFirstLetter(type)}Listeners`] = new Set()
  }
  return anim
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
 * @param timing The timing function. See [Interp.ts](./Interp.ts) for some common timing functions
 * @param bounds Optional bounds for the animation. The animation will be loosely clamped to these bounds
 * @returns The animation info object.
 */
export function createAnimation<Init extends UnknownRecursiveAnimatable>(
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
      child as UnknownRecursiveAnimatable,
      timing,
      childBounds
    ) as Init[keyof Init] extends number
      ? undefined
      : Animation<RecursiveAnimatable<Init[keyof Init]>>
  }
  // add the recursive listeners
  addLocalListener(info, START, () => {
    broadcast(info.recursiveStartListeners, info, listener => {
      removeRecursiveListener(info, START, listener as Listener<unknown>)
    })
  })
  addLocalListener(info, END, () => {
    broadcast(info.recursiveEndListeners, info, listener => {
      removeRecursiveListener(info, END, listener as Listener<unknown>)
    })
  })
  addLocalListener(info, BOUNCE, () => {
    broadcast(info.recursiveBounceListeners, info, listener => {
      removeRecursiveListener(info, BOUNCE, listener as Listener<unknown>)
    })
  })
  addLocalListener(info, INTERRUPT, () => {
    broadcast(info.recursiveInterruptListeners, info, listener => {
      removeRecursiveListener(info, INTERRUPT, listener as Listener<unknown>)
    })
  })
  addLocalListener(info, UPDATE, () => {
    broadcast(info.recursiveUpdateListeners, info, listener => {
      removeRecursiveListener(info, UPDATE, listener as Listener<unknown>)
    })
  })
  return info as Animation<Init>
}
/**
 * Sets the final stopping point of the animation.
 * The animation will start to interpolate to the new state.
 * @group State Modification
 * @example modifyTo<{a: number, b: number}>(anim, { a: 1, b: 1 })
 * @example modifyTo<{a: Vec2, b: Vec2}>(anim, {a: {x: 1}})
 * @example modifyTo<{a: Vec2, b: Vec2}>(anim.children.a, {x: 1})
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
  // modify children recursively
  for (const [key, childValue] of Object.entries(children)) {
    const childInfo = anim.children[key as keyof Animating]
    if (!childInfo) continue
    modifyTo(childInfo, childValue as PartialRecursiveAnimatable<unknown>)
  }
  if (Object.keys(localTo).length === 0) return
  let completeTo = localTo as Partial<LocalAnimatable<Animating>>
  if (anim._to) {
    completeTo = mergeDicts(anim._to, localTo)
    saveState(anim, getLocalState(anim))
    broadcast(anim.interruptListeners, completeTo)
  }
  anim._time = 0
  anim._to = completeTo
  broadcast(anim.startListeners, completeTo)
  updateAnimation(anim, 0)
}
/**
 * Adds a local listener to the animation. You can listen to the following events:
 * - start
 * - end
 * - bounce: hitting a bound
 * - interrupt: when a new `modifyTo` is called before the animation is finished
 * Animation listeners are scoped to only trigger when the current level of the animation is modified.
 * @group Events
 * @example
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addLocalListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addLocalListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
 * @see {@link addRecursiveListener} for a recursive listener which triggers on any child modification
 * @see {@link removeListener} to remove a listener from an animation
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt", "update"
 * @param listener The listener function - return true from the function to remove the listener
 * @returns A function to remove the listener
 */
export function addLocalListener<
  Animating extends UnknownRecursiveAnimatable,
  Event extends AnimatableEvents
>(
  anim: Animation<Animating>,
  type: Event,
  listener: Event extends AnimatableEventsWithValue
    ? Listener<Partial<LocalAnimatable<Animating>>>
    : Listener<undefined>
): unsubscribe {
  anim[`${type}Listeners`].add(listener as Listener<unknown>)
  return () => removeLocalListener(anim, type, listener)
}

/**
 * Removes a listener from the animation
 * @group Events
 * @see {@link addLocalListener} to add a listener to an animation
 * @example
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = state => console.log("started", state)
addLocalListener(anim, "start", listener)
 *
modifyTo(anim, {a: {x: 1}}) // will trigger the listener
 *
removeLocalListener(anim, "start", listener)
 * modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt", "update"
 * @param listener The listener function to remove
 */
export function removeLocalListener<
  Animating extends UnknownRecursiveAnimatable,
  Event extends AnimatableEvents
>(
  anim: Animation<Animating>,
  type: Event,
  listener: Event extends AnimatableEventsWithValue
    ? Listener<Partial<LocalAnimatable<Animating>>>
    : Listener<Partial<undefined>>
) {
  anim[`${type}Listeners`].delete(listener as Listener<unknown>)
}

/**
 * Adds a recursive start listener to the animation. This listener will trigger on any child modification.
 * @group Events
 * @example
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveListener(anim, "start", () => console.log("started")) // will trigger
 * @param anim
 * @param type
 * @param listener () => boolean Returns whether to remove the listener. Void or false to keep the listener.
 * @returns A function to remove the listener
 */
export function addRecursiveListener<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener: Listener<UnknownAnimation> | Listener<undefined>
): unsubscribe {
  let unsubscribers: unsubscribe[] = []
  unsubscribers.push(
    addLocalListener(anim, type, listener as Listener<unknown>)
  )
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: UnknownAnimation
    }
  )) {
    unsubscribers.push(
      addRecursiveListener(childInfo, type, listener as Listener<unknown>)
    )
  }
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}

/**
 * Removes a recursive start listener from the animation
 * @group Events
 * @example
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = () => console.log("started")
addRecursiveListener(anim, "start", listener)

modifyTo(anim.children.a, {x: 1}) // will trigger the listener

removeRecursiveListener(anim, "start", listener)
modifyTo(anim.children.a, {x: 0}) // will not trigger the listener
@param anim
@param listener
*/
export function removeRecursiveListener<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener: Listener<Animation<RecursiveAnimatable<Animatable>>>
) {
  const capitalizedType = (type.charAt(0).toUpperCase() +
    type.slice(1)) as Capitalize<AnimatableEvents>
  anim[`recursive${capitalizedType}Listeners`].delete(
    listener as Listener<unknown>
  )
  anim[`${type}Listeners`].delete(listener as Listener<unknown>)
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: UnknownAnimation
    }
  )) {
    removeRecursiveListener(childInfo, type, listener)
  }
}

function mergeDicts<T1 extends object, T2 extends object>(
  oldBounds: T1 | undefined,
  newBounds: T2 | undefined,
  into: object = {}
): T1 & T2 {
  type Combined = T1 & T2
  const out = into as Combined
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
 * Note: you might have to call {@link updateAnimation} after this to make sure the animation is updated,
 * if the current state is outside the new bounds.
 * @group Bounds
 * @example
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
 upper: { a: 1, b: 1 },
})
modifyTo(anim, { a: 2 }) // will animate out to `a: 2` and then bounce back to `a: 1`
...// run updateAnimationInfo in a loop here
modifyAnimationBounds(anim, {
lower: { b: -1 },
})
 * @param anim The animation to modify
 * @param bounds The new bounds to set. They can be partial and will be merged with the old bounds.
 */
export function boundAnimation<Animating extends UnknownRecursiveAnimatable>(
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
  anim._bounds = localBounds as Bounds<LocalAnimatable<Animating>>
  for (const [key, child] of Object.entries(anim.children)) {
    const childBounds = {
      upper: upperBoundsChildren[key as keyof typeof upperBoundsChildren],
      lower: lowerBoundsChildren[key as keyof typeof lowerBoundsChildren],
    }
    boundAnimation(child as UnknownAnimation, childBounds)
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

function saveState<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  state: LocalAnimatable<Animating>
) {
  copyObject(state, anim._from)
  anim._to = null
  anim._time = 0
}

/**
 * Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.
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
  into: LocalAnimatable<Animating> = {} as LocalAnimatable<Animating>
) {
  if (anim._to === null) {
    const out = into as Animatable
    for (const key in anim._from) {
      out[key] = anim._from[key]
    }
    return into as LocalAnimatable<Animating>
  }
  let progress = getProgress(anim)
  if (progress === undefined) {
    if (anim._to === undefined) {
      return anim._from
    } else {
      progress = 1
    }
  }
  lerpAnimatable(
    anim._from,
    anim._to,
    progress,
    into as LocalAnimatable<Animating>
  )
  return into as LocalAnimatable<Animating>
}

/**
 * Gets the total state of the animation, including all children.
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
  into: object = {} as object
): Animating {
  const out = into as Animating
  getLocalState(anim, out as LocalAnimatable<Animating>) as Animating
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

/**
 * Moves forward in the animation by a certain amount of time.
 * @group State Modification
 * @param anim The animation object
 * @param dt The time to increment the animation by. Must be positive. If negative or zero then no-op.
 * @returns {boolean} true if the animation needs to be updated again
 */
export function updateAnimation<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  dt: number
): boolean {
  if (dt < 0) dt = 0
  let [checkForDoneness, out] = updateAnimationInner(anim, dt)
  for (const child of checkForDoneness || []) {
    broadcast(child.beforeEndListeners, child._from)
    boundLocalAnimation(child)
    let localOut = animationNeedsUpdate(child)
    if (!localOut) {
      broadcast(child.endListeners, child._from)
    }
    out = out || localOut
  }
  return out
}
function updateAnimationInner<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  dt: number
): [UnknownAnimations, boolean] {
  anim._time += dt
  let out = animationNeedsUpdate(anim)
  let checkForDoneness: UnknownAnimations = []
  broadcast(anim.updateListeners, undefined)
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
    saveState(anim, newState)
    // needs two calls to animationNeedsUpdate
    // because boundAnimation might call modifyTo for info
    // which would make info need an update
    checkForDoneness.push(anim as UnknownAnimation)
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
  anim._timingFunction = interp
  const to = getLocalInterpingTo(anim)
  saveState(anim, getLocalState(anim))
  anim._to = to
  updateAnimationInner(anim, 0)
  // update children
  const filteredChildren = Object.entries(anim.children).filter(
    ([key, _]) => mask[key as keyof typeof mask] !== false
  ) as [keyof Animating, UnknownAnimation][]
  for (const [key, childInfo] of filteredChildren) {
    changeInterpFunction(
      childInfo,
      interp,
      mask[key as keyof typeof mask] as Partial<
        Mask<RecursiveAnimatable<unknown>>
      >
    )
  }
}
/**
 * Gets the local target state that the animation is currently headed to.
 * If the animation is not headed to any state, it will return the current state.
 * This only returns the local state of the animation, meaning only the numbers
 * in the topmost level of the input animation.
 * @group Interpolation
 * @example
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getLocalInterpingTo(anim) // {b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getLocalInterpingTo(anim) // {b: 1, c: 0}
 * @param anim The animation object
 * @returns The local target state of the animation
 */
export function getLocalInterpingTo<
  Animating extends Partial<LocalAnimatable<unknown>>
>(anim: Animation<Animating>, into: object = {}) {
  if (anim._to === null) {
    return copyObject(anim._from, into)
  }
  return mergeDicts(anim._from, anim._to) as Animating
}
/**
 * Gets the total target state that the animation is currently headed to.
 * If the animation is not headed to any state, it will return the current state.
 * @group State Retrieval
 * @example
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getInterpingToTree(anim) // {a: {x: 0, y: 0}, b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0}
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
