/**
 * A collection of types to support Animatable.
 * @module AnimatableTypes
 */

import { ListenerSet, Listeners } from "../Listeners"
import { AnimatableEventsWithValue } from "./AnimatableEvents"
import { Interp } from "./Interp"
import { HasChildren, Local } from "./RecursiveHelpers"

export type Root<T> = T extends Function
  ? T
  : T extends object
  ? never
  : T extends undefined
  ? never
  : T

export type UnknownRoot = bigint | boolean | symbol | number | string | Function

/**
 * The local state of the animation, meaning only the numbers in the topmost 
 * level of the animation.
 * @group State Types
 * @example
const startingState = {a: {x: 0, y: 0}, b: 0}
// Looking at the root level:
{b: 0}
// Looking at the 'a' child:
{ x: 0, y: 0 }
 */
export type LocalAnimatable = { [key: string]: UnknownRoot }

/**
 * Lets you get the {@link Animatable} type out of the {@link Animation} type.
 * @example
const particle = createParticle();
type Particle = AnimatableOf<(typeof particle)['anim']>;
const updateLayer = getUpdateLayer<Particle>();
updateLayer.mount(particle.anim)
 */
export type AnimatableOf<Anim extends UnknownAnimation> =
  Anim extends Animation<infer T extends UnknownAnimatable> ? T : never

/**
 * Generic unsubscribe function which will remove event listeners.
 */
export type unsubscribe = () => void

/**
 * Convenient way to write {@link Animatable | `Animatable<unknown>`},
 * usually used to extend a generic type.
 */
export type UnknownAnimatable = Animatable<unknown>
/**
 * Convenient way to write `Animation<UnknownRecursiveAnimatable>`.
 * Usually used to cast an animation to this more generic type.
 */
export type UnknownAnimation = Animation<UnknownAnimatable>

/**
 * The generic type of the animation state.
 * @group State Types
 * @example 
{ 
  a: {x: 0, y: 0},
  b: {x: 0, y: 0} 
}
 */
export type Animatable<T> = {
  [P in keyof T]: T[P] extends UnknownRoot ? Root<T[P]> : Animatable<T[P]>
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
export type SlicedAnimatable<T extends UnknownAnimatable> = LocalAnimatable &
  Local<UnknownRoot, T>

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
  [P in keyof T]?: T[P] extends UnknownRoot
    ? Root<T[P]> | undefined
    : PartialRecursiveAnimatable<T[P]>
}
// PartialRecursive<number, T>

/**
 * The local animation object. This is a recursive type, meaning that it can
 * contain other animations.
 */
export type AnimationWithoutChildren<Animating extends UnknownAnimatable> = {
  /** @internal */
  _time: number
  /** @internal */
  _timingFunction: Interp
  /** @internal */
  _from: SlicedAnimatable<Animating>
  /** @internal */
  _prevTo: Partial<SlicedAnimatable<Animating>> | null
  /** @internal */
  _to: Partial<SlicedAnimatable<Animating>> | null
} /** @internal */ & Listeners<
  AnimatableEventsWithValue,
  Partial<SlicedAnimatable<Animating>>
> &
  /** @internal */
  Listeners<"update", unknown> & /** @internal */ {
    /** @internal */
    [key in `recursive${Capitalize<AnimatableEventsWithValue>}Listeners`]: ListenerSet<unknown>
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
    children: {}
  }
}
 */
export type Animation<Animating extends UnknownAnimatable> =
  AnimationWithoutChildren<Animating> & {
    readonly children: {
      [P in keyof Animating]: Animating[P] extends UnknownRoot
        ? never
        : Animation<Animatable<Animating[P]>>
    }
  } & HasChildren<UnknownRoot, Animating>

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type WritableAnimation<T extends UnknownAnimatable> = Writeable<
  Animation<T>
>
