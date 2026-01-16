/**
 * Adds bounds to an animation to ensure an animation
 * will end within the given bounds.
 * @module Bound
 */

import { UnknownAnimatable, PartialRecursiveAnimatable } from "aninest"

/**
   * The bounds of the animation. The animation will be loosely clamped to these bounds.
   * @internal
   * @example
  // Assuming the animation is of type {a: Vec2, b: Vec2}:
  const bounds: Bounds<PartialRecursiveAnimatable<unknown>> = {
    lower: { a: {x: 0, y: 0}, b: {x: 0} },
    upper: { a: {x: 1, y: 1} }
  } // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
   */
export type FullBounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

/**
 * The partial bounds of the animation, making the upper and lower bound dictionaries optional.
 * Note that for {@link FullBounds} both the upper and lower objects are required to be within the 
 * Bounds object, although both can simply be an empty object.
 * @see {@link FullBounds} for the full bounds type and for further explanation of the bounds.
 * @internal
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
} // Note that there is no upper bounds object
 */
export type PartialFullBounds<T> = Partial<FullBounds<T>>
/**
 * The bounds of the animation, which means that all values within
 * the bounds are optional, including the the `upper` and `lower` objects.
 * The animation will be loosely clamped to these bounds.
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds: PartialRecursiveBounds<{a: Vec2, b: Vec2}> = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
  upper: { a: {x: 1, y: 1} }
} // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
 */
export type Bounds<Animating extends UnknownAnimatable> = PartialFullBounds<
  PartialRecursiveAnimatable<Animating>
>
