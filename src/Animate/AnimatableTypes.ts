/**
 * A collection of types to support Animatable.
 * @module AnimatableTypes
 */

import { ListenerSet, Listeners } from "../Listeners"
import { AnimatableEventsWithValue, AnimatableEvents } from "./AnimatableEvents"
import { Interp } from "./Interp"
import {
  Recursive,
  Local,
  PartialRecursive,
  HasChildren,
} from "./RecursiveHelpers"

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

/**
 * Generic unsubscribe function which will remove event listeners.
 */
export type unsubscribe =
  /**
   * Generic unsubscribe function which will remove event listeners.
   */
  () => void

/**
 * Convenient way to write `RecursiveAnimatable<unknown>`,
 * usually used to extend a generic type.
 */
export type UnknownRecursiveAnimatable = RecursiveAnimatable<unknown>
export type UnknownAnimation = Animation<UnknownRecursiveAnimatable>
export type UnknownAnimations = UnknownAnimation[]

/**
 * The generic type of the animation state.
 * @group State Types
 * @example 
{ 
  a: {x: 0, y: 0},
  b: {x: 0, y: 0} 
}
 */
export type RecursiveAnimatable<T> = Recursive<number, T>

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
export type PartialRecursiveAnimatable<T> = PartialRecursive<number, T>
/**
 * Mask over animation. Set any key to `false` in order to mask out
 * that key and that key's subtree.
 * @example
const init = {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
// will only include {b: {x: number}} after the mask is applied
const mask: Mask<typeof init> = {a: false, b: {x: false}}
 */
export type Mask<T> = {
  [P in keyof T]: T[P] | boolean
}

/**
 * The local animation object. This is a recursive type, meaning that it can
 * contain other animations.
 * @internal
 */
export type AnimationWithoutChildren<
  Animating extends UnknownRecursiveAnimatable
> = {
  _time: number
  _timingFunction: Interp
  _from: LocalAnimatable<Animating>
  _prevTo: Partial<LocalAnimatable<Animating>> | null
  _to: Partial<LocalAnimatable<Animating>> | null
} & Listeners<AnimatableEventsWithValue, Partial<LocalAnimatable<Animating>>> &
  Listeners<"update", unknown> & {
    [key in `recursive${Capitalize<AnimatableEvents>}Listeners`]: ListenerSet<unknown>
  }

/**
 * The animation object. This is a recursive type, meaning that it can 
 * contain other animations.
 * @group Construction
 * @example 
 const anim: Animation<{a: Vec2}> = createAnimation({a: {x: 0, y: 0}}) 
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
export type Animation<Animating extends UnknownRecursiveAnimatable> =
  AnimationWithoutChildren<Animating> & {
    readonly children: {
      [P in keyof Animating]: Animating[P] extends number
        ? undefined
        : Animation<RecursiveAnimatable<Animating[P]>>
    }
  }

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type WritableAnimation<T extends UnknownRecursiveAnimatable> = Writeable<
  Animation<T>
>
