/**
 * Various ways to attach and detach event listeners to an Animation.
 * @module AnimatableEvents
 */

import type {
  LocalAnimatable,
  Animatable,
  UnknownRecursiveAnimatable,
  RecursiveAnimatable,
  UnknownAnimation,
  Animation,
  unsubscribe,
} from "./AnimatableTypes"
import { updateAnimation, modifyTo } from "./Animatable"
import { Listener } from "../Listeners"
import { capitalizeFirstLetter } from "../Utils"

export const BEFORE_START = "beforeStart"
export const START = "start"
export const END = "end"
export const BEFORE_END = "beforeEnd"
export const INTERRUPT = "interrupt"
export const UPDATE = "update"
/**
 * List of event types which provide the values which the animation is interpolating to.
 * @internal
 */
export const ANIM_TYPES_WITH_VALUE = [
  BEFORE_START,
  START,
  END,
  INTERRUPT,
  BEFORE_END,
] as const
export const ANIM_TYPES = [...ANIM_TYPES_WITH_VALUE, UPDATE] as const
/**
 * Animation Events which return the values which the animation is interpolating to.
 * Only excludes the `update` event.
 */
export type AnimatableEventsWithValue = (typeof ANIM_TYPES_WITH_VALUE)[number]

/**
 * Adds a local listener to the animation. You can listen to the  events listed in {@link AnimatableEvents}.
 * Animation listeners are scoped to only trigger when the current level of the animation is modified.
 * Animation listeners are called in the order in which they were added.
 * @example
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addLocalListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addLocalListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
 * @see {@link addRecursiveListener} for a recursive listener which triggers on any child modification
 * @param anim The animation object
 * @param type See {@link AnimatableEvents}
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
  anim[`${type}Listeners`].set(listener as Listener<unknown>, undefined)
  return () => anim[`${type}Listeners`].delete(listener as Listener<unknown>)
}

/**
 * Removes a listener from the animation
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
 * @param type See {@link AnimatableEvents}
 * @param listener The listener function to remove
 * @deprecated Instead use the return value of `{@link addLocalListener}`.
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
 * Animation listeners are called in the order in which they were added.
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
  const unsub = () => {
    unsubscribers.forEach(unsub => unsub())
  }
  const unsubListener: Listener<UnknownAnimation> | Listener<undefined> = (
    arg: UnknownAnimation | undefined
  ) => {
    if (listener(arg as never) === true) {
      unsub()
      return true
    }
    return false
  }
  unsubscribers.push(
    addLocalListener(anim, type, unsubListener as Listener<unknown>)
  )
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: UnknownAnimation
    }
  )) {
    unsubscribers.push(
      addRecursiveListener(childInfo, type, unsubListener as Listener<unknown>)
    )
  }
  return unsub
}

/**
 * Removes a recursive start listener from the animation
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
  type: AnimatableEventsWithValue,
  listener: Listener<Animation<RecursiveAnimatable<Animatable>>>
) {
  const capitalizedType = capitalizeFirstLetter(type)
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

/**
 * Listens to the animation for a specific event.
 * All events aside from `update` return a dictionary of local values which are currently being animated.
 */
export type AnimatableListener<
  Animating extends UnknownRecursiveAnimatable,
  Event extends AnimatableEvents
> = Event extends AnimatableEventsWithValue
  ? Listener<Partial<LocalAnimatable<Animating>>>
  : Listener<undefined>

/**
 * The various event types that are emitted by the animation.
 * Here are the possible events:
 * - **start**: when the animation's target state is changed by calling {@link modifyTo}
 * and the new state is different from the current state.
 * Returns a {@link LocalAnimatable} of the new local state with only the changed values.
 * - **end**: when the animation fully comes to a stop, provides the resting state
 * Returns an {@link Animatable} of the new local state with the final resting state.
 * - **beforeEnd**: when the animation is about to end
 * Useful for preventing the animation from ending to instead loop/bounce/snap etc.
 * - **interrupt**: when a new `modifyTo` is called before the animation is finished
 * Returns a {@link LocalAnimatable} of the new local state with all of the currently in progress values.
 * - **update**: when the current state of the animation changes, usually from a call to
 * {@link updateAnimation}.
 * Returns `undefined`
 */
export type AnimatableEvents = AnimatableEventsWithValue | "update"
