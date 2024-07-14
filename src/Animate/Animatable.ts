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
  UnknownAnimations,
  WritableAnimation,
} from "./AnimatableTypes"
import {
  HasChildren,
  Mask,
  perMaskedChild,
  separateChildren,
} from "./RecursiveHelpers"
import {
  START,
  END,
  INTERRUPT,
  UPDATE,
  ANIM_TYPES,
  removeRecursiveListener,
  addLocalListener,
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
    anim[`recursive${capitalizeFirstLetter(type)}Listeners`] = new Map()
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

type ParentAnimatable<Animating extends UnknownRecursiveAnimatable> = {
  [K in keyof Animating]: Animating[K] extends number
    ? number
    : Animation<UnknownRecursiveAnimatable>
}

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
  return info as Animation<Animating>
}
/**
 * Sets the final stopping point of the animation.
 * The animation will start to interpolate to the new state.
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
  // modify children recursively
  for (const [key, childValue] of Object.entries(children)) {
    const childInfo = anim.children[key as keyof Animating]
    if (!childInfo) continue
    modifyTo<Animating>(
      childInfo as Animation<Animating>,
      childValue as PartialRecursiveAnimatable<unknown>
    )
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
 * Applies the dictionary `toApply` to the base dictionary `base`, modifying the base dictionary in place.
 * @param base
 * @param toApply
 * @returns The base dictionary
 * @example
base = {a: 1, b: 2, c: 3}
toApply = {a: 0}
applyDictTo(base, toApply) // base == {a: 0, b: 2, c: 3}
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
    const anim = a as unknown as Animation<UnknownRecursiveAnimatable>
    anim._timingFunction = interp
    const to = getLocalInterpingTo(anim)
    saveState(anim, getLocalState(anim, anim._from))
    anim._to = to
    updateAnimationInner(anim, 0)
  }
  locallyChangeInterpFunction(anim as Animation<UnknownRecursiveAnimatable>)
  perMaskedChild(
    anim as HasChildren<number, Animating>,
    mask,
    locallyChangeInterpFunction
  )
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
  Animating extends Partial<LocalAnimatable<UnknownRecursiveAnimatable>>
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
