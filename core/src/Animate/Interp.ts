/**
 * Several interpolation function constructors.
 * @module module:Interp
 */

import { bezierFunc, clamp } from "../Utils/vec2"
import type { updateAnimation } from "./Animatable"

/**
 * Interpolation function.
 * At time 0 it should return either 0 or null (for {@link NO_INTERP})
 * @param t Time in seconds. Guaranteed to be positive.
 * @returns A value or undefined if the animation is finished.
 * @see {@link NO_INTERP}, {@link getLinearInterp}, {@link getSlerp}, and {@link getCubicBezier}
 * to create interpolation functions.
 */
export type Interp = (t: number) => number | undefined

/**
 * A constant interpolation function that makes all animations instantaneous,
 * meaning they will transition between states without needing to call {@link updateAnimation}.
 */
export const NO_INTERP = (_t: number) => undefined

/**
 * Gets the linear progress of an animation based on time and duration, clamped between 0 and 1.
 * @param t
 * @param duration
 * @returns
 */
export function getProgress(t: number, duration: number) {
  return clamp(0, t / duration, 1)
}

/**
 * Returns a linear interpolation function.
 */
export function getLinearInterp(duration: number): Interp {
  if (duration == 0) return NO_INTERP
  return t => (t >= duration ? undefined : getProgress(t, duration))
}

/**
 * Returns a smooth interpolation function based on the sine function.
 */
export function getSlerp(duration: number): Interp {
  if (duration == 0) return NO_INTERP
  return t =>
    t >= duration
      ? undefined
      : Math.sin(getProgress(t, duration) * (Math.PI / 2))
}
/**
 * @param progress 0-1
 * @param c1 control point 1
 * @param c2 control point 2
 * @returns
 * ```txt
 * c2*___
 *      /
 *     /
 *    /__*c1
 * ```
 * [Bezier Explaination](https://morethandev.hashnode.dev/demystifying-the-cubic-bezier-function-ft-javascript#heading-example-time)
 */
function cubicBezier(progress: number, c1: number, c2: number) {
  return bezierFunc(progress, 0, c1, c2, 1)
}

/**
 * Returns a cubic bezier interpolation function.
 */
export function getCubicBezier(
  duration: number,
  c1: number,
  c2: number
): Interp {
  if (duration == 0) return NO_INTERP
  return t =>
    t >= duration ? undefined : cubicBezier(getProgress(t, duration), c1, c2)
}
