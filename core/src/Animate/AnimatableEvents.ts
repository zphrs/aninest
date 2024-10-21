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
import { modifyTo } from "./Animatable"
import { Listener } from "../Listeners"
import { capitalizeFirstLetter } from "../Utils"

/**
 * Broadcasts before the animation recurses into its children to update their values.
 * Only broadcasted if there is a local change to the animation at the level
 * this event is attached to.
 * @group EventTypes
 */
export const BEFORE_START = "beforeStart"
/**
 * Same as {@link `START`} but by convention no {@link modifyTo} calls should be made in any
 * listeners attached to this event. This is useful for extensions which
 * need to know when the animation is starting such as the proxy extension but which
 * don't need to trigger any modifications to any animation states.
 * @group EventTypes
 */
export const IMMUTABLE_START = "immutableStart"
/**
 * Broadcasts after an animation's target state is set to a new value.
 * @group EventTypes
 */
export const START = "start"
/**
 * Broadcasts at the end of an interpolation, excluding any interruptions triggered
 * before the animation fully comes to rest, including interruptions created on the
 * {@link BEFORE_END} event.
 * @group EventTypes
 */
export const END = "end"
/**
 * Broadcasts right before the animation ends to allow for the animation to be interrupted
 * before it ends. This is useful to create snapping, looping, or bouncing animations without
 * triggering any {@link END} events.
 * @group EventTypes
 */
export const BEFORE_END = "beforeEnd"
/**
 * Broadcasts when a new target state is set while the animation is not at its resting state
 * yet. This event is useful for reverting any changes made to the animation state before
 * continuing the animation. See the momentum extension for an example of this.
 * @group EventTypes
 */
export const INTERRUPT = "interrupt"
/**
 * Broadcasts every time the animation state's time is updated so long as the animation is running.
 * @group EventTypes
 */
export const UPDATE = "update"
/**
 * List of event types which provide the values which the animation is interpolating to
 * (or in the case of `end` the final values).
 */
export const ANIM_TYPES_WITH_VALUE = [
  BEFORE_START,
  IMMUTABLE_START,
  START,
  END,
  INTERRUPT,
  BEFORE_END,
] as const
export const ANIM_TYPES = [...ANIM_TYPES_WITH_VALUE, UPDATE] as const
/**
 * Animation Events which return the values which the animation is interpolating to.
 * Only excludes the `update` event.
 * @group EventTypes
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
 * @param options Contains one option, `signal` which supports passing in an AbortSignal.
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
    : Listener<undefined>,
  options: { signal?: AbortSignal } = {}
): unsubscribe {
  anim[`${type}Listeners`].set(listener as Listener<unknown>, undefined)
  const out = () =>
    anim[`${type}Listeners`].delete(listener as Listener<unknown>)
  const { signal } = options
  if (signal) {
    signal.addEventListener("abort", out, { once: true })
  }
  return out
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
 * @deprecated Instead use the return value of `{@link addLocalListener}`
 * or the AbortSignal passed into `{@link addLocalListener}` with the `options`'
 * `signal` field.
 * 
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
 * @param options Contains one option, `signal` which supports passing in an AbortSignal.
 * @returns A function to remove the listener
 */
export function addRecursiveListener<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  type: AnimatableEvents,
  listener: Listener<UnknownAnimation> | Listener<undefined>,
  options: { signal?: AbortSignal } = {}
): unsubscribe {
  let unsubscribers: unsubscribe[] = []
  const unsub = () => {
    unsubscribers.forEach(unsub => unsub())
  }
  unsubscribers.push(
    addLocalListener(anim, type, listener as Listener<unknown>, options)
  )
  for (const childInfo of Object.values(
    anim.children as unknown as {
      [s: string]: UnknownAnimation
    }
  )) {
    unsubscribers.push(
      addRecursiveListener(
        childInfo,
        type,
        listener as Listener<unknown>,
        options
      )
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
 * @param anim
 * @param listener
 * @deprecated Instead use the return value of `{@link addRecursiveListener}`
 * or the AbortSignal passed into `{@link addRecursiveListener}` with the `options`'
 * `signal` field.
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
 * The collection of events which can be listened to on an animation.
 * Returns `undefined`
 * @see AnimatableEvents/EventTypes for a list of events which return values.
 * @group EventTypes
 */
export type AnimatableEvents = AnimatableEventsWithValue | typeof UPDATE
