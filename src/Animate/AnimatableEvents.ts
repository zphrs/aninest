export const START = "start"
export const END = "end"
export const BEFORE_END = "beforeEnd"
export const BOUNCE = "bounce"
export const INTERRUPT = "interrupt"
export const UPDATE = "update"
export const ANIM_TYPES = [
  START,
  END,
  BOUNCE,
  INTERRUPT,
  BEFORE_END,
  UPDATE,
] as const
export type AnimatableEventsWithValue = (typeof ANIM_TYPES)[number]

/**
 * The various event types that are emitted by the animation.
 * Here are the possible events:
 * - **start**: when the animation's target state is changed by calling {@link modifyTo}
 * and the new state is different from the current state.
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with only the changed values.
 * - **end**: when the animation fully comes to a stop, provides the resting state
 * Returns an {@link LocalAnimatable Animatable} of the new local state with the final resting state.
 * - **beforeEnd**: when the animation is about to end
 * Useful for preventing the animation from ending to instead loop/bounce/snap etc.
 * - **bounce**: when the animation bounces off a bound
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with only the bounced values.
 * - **interrupt**: when a new `modifyTo` is called before the animation is finished
 * Returns a {@link LocalAnimatable PartialAnimatable} of the new local state with all of the currently in progress values.
 * - **update**: when the animation is updated
 * Returns `undefined`
 * @group Events
 */
export type AnimatableEvents = AnimatableEventsWithValue | "update"
