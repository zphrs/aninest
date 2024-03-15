/**
 * This module deals with creating and modifying animations.
 * @module Animatable
 */

import { clamp, lerpFunc } from "../Utils/vec2"
import {
  broadcast,
  ListenerSet,
  type Listener,
  type Listeners,
} from "../Listeners"
import { NO_INTERP, type Interp } from "./Interp"

/**
 * The local state of the animation, meaning only the numbers in the topmost level of the input animation.
 * @group State Types
 * @example
const startingState = {a: {x: 0, y: 0}, b: 0}
// Looking at the root level:
{b: 0}
// Looking at the 'a' child:
{ x: 0, y: 0 }
 */
export type Animatable = { [key: string]: number }

/**
 * The bounds of the animation. The animation will be loosely clamped to these bounds.
 * @group Bounds
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
  upper: { a: {x: 1, y: 1} }
} // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
 */
export type Bounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

/**
 * The partial bounds of the animation, making the lower and upper bounds optional.
 * @group Bounds
 * @see {@link Bounds} for the full bounds type and for further explanation of the bounds.
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
} // Note that there are no upper bounds
 */
export type PartialBounds<T> = Partial<Bounds<T>>
export const START = "start"
export const END = "end"
export const BOUNCE = "bounce"
export const INTERRUPT = "interrupt"
export const UPDATE = "update"
const animTypes = [START, END, BOUNCE, INTERRUPT, UPDATE] as const
type AnimatableEventsWithValue = (typeof animTypes)[number]

/**
 * The various event types that are emitted by the animation.
 * Here are the possible events:
 * - **start**: when the animation's target state is changed by calling {@link modifyTo}
 * and the new state is different from the current state.
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with only the changed values.
 * - **end**: when the animation fully comes to a stop, provides the resting state
 * Returns an {@link LocalAnimatable Animatable} of the new local state with the final resting state.
 * - **bounce**: when the animation bounces off a bound
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with only the bounced values.
 * - **interrupt**: when a new `modifyTo` is called before the animation is finished
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with all of the currently in progress values.
 * - **update**: when the animation is updated
 * Returns `undefined`
 * @group Events
 */
export type AnimatableEvents = AnimatableEventsWithValue | "update"

/**
 * The generic type of the animation state.
 * @group State Types
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

/**
 * A local slice of the Animatable type.
 * @group State Types
 * @example
const startingState = {a: {x: 0, y: 0}, b: 0}
// the following are the local slices of the type of the startingState:
// looking at the root level
{b: 0}
// looking at the 'a' child
{ x: 0, y: 0 }
 */
export type LocalAnimatable<T> = {
  [P in keyof T]: T[P] extends number ? number : undefined
} & Animatable

type ChildrenOfRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? T[P] : undefined
}

/**
 * A subtree of the Animatable type.
 * @group State Types
 * @example
const startingState: RecursiveAnimatable<{a: number, b: number}> = {a: {x: 0, y: 0}}
// the following are all valid partial states of the type of the startingState:
// example 3
{
 a: {x: 1, y: 1}
}
// example 2
{
  a: {x: 1}
}
// example 1
{}
 */
export type PartialRecursiveAnimatable<T> = {
  [P in keyof T]?: T[P] extends number
    ? number
    : PartialRecursiveAnimatable<T[P]>
}

type Mask<T> = {
  [P in keyof T]: T[P] | boolean
}

/**
 * The local animation object. This is a recursive type, meaning that it can contain other animations.
 * @internal
 */
type AnimationWithoutChildren<Animating extends RecursiveAnimatable<unknown>> =
  {
    _time: number
    _timingFunction: Interp
    _from: LocalAnimatable<Animating>
    _to: Partial<LocalAnimatable<Animating>> | null
    _bounds: Bounds<LocalAnimatable<Animating>>
    _cache?: Animating // the current state of the animation
  } & Listeners<
    AnimatableEventsWithValue,
    Partial<LocalAnimatable<Animating>>
  > &
    Listeners<"update", unknown> & {
      [key in `recursive${Capitalize<AnimatableEvents>}Listeners`]: ListenerSet<unknown>
    }

/**
 * The animation object. This is a recursive type, meaning that it can contain other animations.
 * @group Construction
 * @example const anim: Animation<{a: Vec2}> = createAnimation({a: {x: 0, y: 0}}) 
 // the anim object will look like this:
  {
    <private fields>
    children: {
    a: {
      // holds the state of a, which is currently {x: 0, y: 0}
      <private fields>
    }
  }
 */
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
 * Returns whether the animation needs to be updated.
 * @group Status
 * @param anim The animation object
 * @returns whether the animation needs to be updated
 */
export function animationNeedsUpdate<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  return anim._to != null && getProgress(anim) < 1 - Number.EPSILON
}
/**
 * Checks if any property of the animation is still in progress.
 * @param anim
 * @returns
 */
export function animationTreeNeedsUpdate<Animating extends Animatable>(
  anim: Animation<Animating>
) {
  if (animationNeedsUpdate(anim)) return true
  for (const child of Object.values(anim.children)) {
    if (animationTreeNeedsUpdate(child)) return true
  }
  return false
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

function createLocalAnimation<Animating extends RecursiveAnimatable<unknown>>(
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
  for (const type of animTypes) {
    anim[`${type}Listeners`] = new Set() as any
    anim[`recursive${capitalizeFirstLetter(type)}Listeners`] = new Set()
  }
  return anim
}

function separateChildren<T extends RecursiveAnimatable<unknown>>(
  obj: T
): [LocalAnimatable<T>, ChildrenOfRecursiveAnimatable<T>] {
  const anim = {} as LocalAnimatable<T>
  const children = {} as ChildrenOfRecursiveAnimatable<T>
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === "number") {
      anim[key] = value as LocalAnimatable<T>[Extract<keyof T, string>]
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
 * Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state.
 * @group Helpers
 * @example
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
loopAnimation(anim)
anim.modifyTo({a: 1, b: 1})
anim.updateAnimation(0.5)
anim.getStateTree() // {a: 0.5, b: 0.5}
anim.updateAnimation(0.49)
anim.getStateTree() // {a: ~1, b: ~1}
anim.updateAnimation(0.01) // will trigger the loop
anim.getStateTree() // {a: 0, b: 0}
 * @param anim
 * @returns A function that will stop the loop when called
 */
export function loopAnimation<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>
) {
  // only one init/towards at a time
  let init: PartialRecursiveAnimatable<Animating> | null = null
  let towards: PartialRecursiveAnimatable<Animating> | null = null
  const onEnd = () => {
    if (init === null || towards === null) return
    if (animationTreeNeedsUpdate(anim)) return
    removeRecursiveListener(anim, START, onStart) // must remove to prevent infinite recursion
    removeRecursiveListener(anim, END, onEnd)
    const currInterpFunction = anim._timingFunction
    changeInterpFunction(anim, NO_INTERP)
    modifyTo(anim, init) // will apply immediately because of NO_INTERP
    changeInterpFunction(anim, currInterpFunction)
    modifyTo(anim, towards)
    addRecursiveListener(anim, START, onStart)
    return true
  }
  const onStart = () => {
    init = getStateTree(anim, init || {})
    towards = getInterpingToTree(anim, towards || {})
    addRecursiveListener(anim, END, onEnd)
  }
  addRecursiveListener(anim, START, onStart)
  return () => {
    removeRecursiveListener(anim, START, onStart)
    removeRecursiveListener(anim, END, onEnd)
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
  updateAnimation(anim, 0)

  broadcast(anim.startListeners, completeTo)
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
addListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
 * @see {@link addRecursiveListener} for a recursive listener which triggers on any child modification
 * @see {@link removeListener} to remove a listener from an animation
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt", "update"
 * @param listener The listener function - return true from the function to remove the listener
 */
export function addLocalListener<
  Animating extends RecursiveAnimatable<unknown>,
  Event extends AnimatableEvents
>(
  anim: Animation<Animating>,
  type: Event,
  listener: Event extends AnimatableEventsWithValue
    ? Listener<Partial<LocalAnimatable<Animating>>>
    : Listener<undefined>
) {
  anim[`${type}Listeners`].add(listener as Listener<unknown>)
}

/**
 * Removes a listener from the animation
 * @group Events
 * @see {@link addLocalListener} to add a listener to an animation
 * @example
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = state => console.log("started", state)
addListener(anim, "start", listener)
 *
modifyTo(anim, {a: {x: 1}}) // will trigger the listener
 *
removeListener(anim, "start", listener)
 * modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
 * @param anim The animation object
 * @param type "start", "end", "bounce", "interrupt", "update"
 * @param listener The listener function to remove
 */
export function removeListener<
  Animating extends RecursiveAnimatable<unknown>,
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
 */
export function addRecursiveListener<
  Animating extends RecursiveAnimatable<unknown>
>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener:
    | Listener<Animation<RecursiveAnimatable<unknown>>>
    | Listener<undefined>
) {
  const capitalizedType = (type.charAt(0).toUpperCase() +
    type.slice(1)) as Capitalize<AnimatableEvents>
  anim[`recursive${capitalizedType}Listeners`].add(
    listener as Listener<unknown>
  )
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
    }
  )) {
    addRecursiveListener(childInfo, type, listener as Listener<unknown>)
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
  Animating extends RecursiveAnimatable<unknown>
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
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: Animation<RecursiveAnimatable<unknown>>
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
 * You can also call {@link animationNeedsUpdate} to check if the animation needs to be updated before calling {@link updateAnimation}.
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
  anim._bounds = localBounds as Bounds<LocalAnimatable<Animating>>
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
  state: LocalAnimatable<Animating>
) {
  copyObject(state, anim._from)
  anim._to = null
  anim._time = 0
}

/**
 * Initializes a cache for the animation. The animation will automatically update the cache whenever it or any of its children are updated.
 * @param anim
 * @returns A function to remove caching
 */
export function initializeAnimationCache<
  Animating extends RecursiveAnimatable<unknown>
>(anim: Animation<Animating>) {
  if (anim._cache) {
    console.warn("Cache already added to animation. This is likely a mistake.")
    return
  }
  const onUpdateForCache = () => {
    anim._cache = getStateTree(anim, anim._cache)
  }
  anim._cache = {} as Animating // initialize the cache object
  anim._cache = getStateTree(anim, anim._cache)
  // add recursive update listener to make sure the cache is always up to date
  addRecursiveListener(anim, UPDATE, onUpdateForCache)
  // return the function to cancel caching
  return () => {
    removeRecursiveListener(anim, UPDATE, onUpdateForCache)
    anim._cache = undefined
  }
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
export function getLocalState<Animating extends RecursiveAnimatable<unknown>>(
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
  const progress = getProgress(anim)
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
export function getStateTree<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  into: object = {} as object
): Animating {
  const out = into as Animating
  // we check that the cache is not the into object because we always want to update the cache
  // since the cache is only updated when the animation is updated
  if (anim._cache && anim._cache != out) {
    return anim._cache
  }
  getLocalState(anim, out as LocalAnimatable<Animating>) as Animating
  for (const [key, childInfo] of Object.entries(anim.children)) {
    if (!out[key as keyof typeof anim.children]) {
      out[key as keyof typeof anim.children] = {} as Animating[keyof Animating]
    }
    getStateTree(
      childInfo as Animation<RecursiveAnimatable<unknown>>,
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
 * @returns {boolean} whether the animation needs to be updated again
 */
export function updateAnimation<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  dt: number
): boolean {
  if (dt < 0) dt = 0
  anim._time += dt
  let out = animationNeedsUpdate(anim)
  broadcast(anim.updateListeners, undefined)
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
    // needs two calls to animationNeedsUpdate
    // because boundAnimation might call modifyTo for info
    // which would make info need an update
    out = animationNeedsUpdate(anim)
    if (!out) {
      broadcast(anim.endListeners, anim._from)
    }
  }
  if (anim._cache) {
    anim._cache = getStateTree(anim)
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
  updateAnimation(anim, 0)
  // update children
  const filteredChildren = Object.entries(anim.children).filter(
    ([key, _]) => mask[key as keyof typeof mask] !== false
  ) as [keyof Animating, Animation<RecursiveAnimatable<unknown>>][]
  for (const [key, childInfo] of filteredChildren) {
    changeInterpFunction(
      childInfo as Animation<RecursiveAnimatable<unknown>>,
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
  Animating extends RecursiveAnimatable<unknown>
>(anim: Animation<Animating>, into: object = {}): Animating {
  const out = getLocalInterpingTo(anim, into) as Animating
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
