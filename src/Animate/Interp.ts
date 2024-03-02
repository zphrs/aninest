import { bezierFunc, clamp } from '../Utils/vec2'

export type Interp = (t: number) => number

export const NO_INTERP = (_t: number) => 1

function getProgress(t: number, duration: number) {
	return clamp(0, t / duration, 1)
}

export function getLinearInterp(duration: number): Interp {
	if (duration == 0) return NO_INTERP
	return (t) => t / duration
}

export function getSlerp(duration: number): Interp {
	if (duration == 0) return NO_INTERP
	return (t) => Math.sin(getProgress(t, duration) * (Math.PI / 2))
}
/**
 *
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

export function getCubicBezier(duration: number, c1: number, c2: number): Interp {
	if (duration == 0) return NO_INTERP
	return (t) => cubicBezier(getProgress(t, duration), c1, c2)
}
