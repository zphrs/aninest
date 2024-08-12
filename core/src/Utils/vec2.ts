/**
 * A collection of 2D vector math functions and a few other generic scalar operations.
 * @description Vectors are represented as `{x: number, y: number}` and are meant to be immutable,
 * following a functional programming style.
 * @module Vec2
 */

/**
 * Lerps between a and b by t.
 * @param a
 * @param b
 * @param t
 * @returns
 */
export const lerpFunc = (a: number, b: number, t: number) => a + (b - a) * t
export const bezierFunc = (
  t: number,
  start: number,
  c1: number,
  c2: number,
  end: number
) => {
  // use lerp func
  const ab = lerpFunc(start, c1, t)
  const bc = lerpFunc(c1, c2, t)
  const cd = lerpFunc(c2, end, t)
  const abbc = lerpFunc(ab, bc, t)
  const bccd = lerpFunc(bc, cd, t)
  return lerpFunc(abbc, bccd, t)
}

/**
 * A 2D vector.
 */
export type Vec2 = { readonly x: number; readonly y: number }

/**
 * A 2D vector with x and y set to 0.
 */
export const ZERO_VEC2 = { x: 0, y: 0 } as { x: 0; y: 0 }

/**
 * Clamps a value between a minimum and maximum value.
 * @param min The minimum clamping value. If undefined, no minimum clamping is done.
 * @param n The value to clamp.
 * @param max The maximum clamping value. If undefined, no maximum clamping is done.
@example
let value = 1.5
let clampedValue = clamp(0, value, 1) // clampedValue is 1
 * @returns The clamped value.
 */
export const clamp = (
  min: number | undefined,
  n: number,
  max: number | undefined
) => {
  let out = n
  if (min != undefined) {
    out = Math.max(min, out)
  }
  if (max != undefined) {
    out = Math.min(max, out)
  }
  return out
}

/**
 * Vec2 Constructor
 */
export const newVec2 = (x: number, y: number): Vec2 => ({ x, y })

/**
 * Adds two vectors together, returning a new vector.
 */
export const addVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x + v2.x, v1.y + v2.y)

/**
 * Subtracts v2 from v1 immutably.
 * @returns a new vector.
 */
export const subVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x - v2.x, v1.y - v2.y)

/**
 * Does component-wise multiplication of two vectors immutably.
 * @returns A new vector.
 */
export const mulVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x * v2.x, v1.y * v2.y)

/**
 * Multiplies a vector `v` by a scalar `s` immutably.
 * @param v
 * @param s
 * @returns A new vector.
 */
export const mulScalar = (v: Vec2, s: number) => newVec2(v.x * s, v.y * s)

/**
 * Performs component-wise division of `v1` / `v2` immutably.
 * @param v1
 * @param v2
 * @returns A new vector.
 */
export const divVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x / v2.x, v1.y / v2.y)

/**
 * Calculates the magnitude of a vector.
 * @param v
 * @returns The magnitude of the vector.
 */
export const mag = (v: Vec2) => Math.sqrt(magSquared(v))

/**
 * Converts a vector to an array.
 * Useful for spreading into function arguments.
 * @param v
 * @returns An array with the x and y components of the vector in the format [x, y].
 */
export const vecToIter = (v: Vec2) => [v.x, v.y] as const

/**
 * Squares the magnitude of a vector.
 * @param v
 * @returns
 */
export const magSquared = (v: Vec2) => v.x * v.x + v.y * v.y

/**
 * Returnes a normalized version of the vector.
 * @param v
 * @returns A new vector.
 */
export const normalize = (v: Vec2) => divScalar(v, mag(v))

/**
 * Divides a vector `v` by a scalar `s` immutably.
 * @param v
 * @param s
 * @returns A new vector.
 */
export const divScalar = (v: Vec2, s: number) => newVec2(v.x / s, v.y / s)

/**
 * Calculates the dot product of two vectors.
 * @param v1
 * @param v2
 * @returns A scalar.
 */
export const dot = (v1: Vec2, v2: Vec2) => v1.x * v2.x + v1.y * v2.y

/**
 * Calculates the cross product of two vectors.
 * @param v1
 * @param v2
 * @returns A scalar.
 */
export const cross = (v1: Vec2, v2: Vec2) => v1.x * v2.y - v1.y * v2.x

/**
 * Rotates a vector by an angle in radians.
 * @param v
 * @param angle The angle to rotate the vector by in radians.
 * @returns A new vector.
 */
export const rotate = (v: Vec2, angle: number) => {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return newVec2(v.x * c - v.y * s, v.x * s + v.y * c)
}

/**
 * Rotates a vector around a pivot point by an angle in radians.
 * @param v The vector to rotate.
 * @param pivot The point to rotate the vector around.
 * @param angle The angle to rotate the vector by in radians.
 * @returns A new vector.
 */
export const rotateAround = (v: Vec2, pivot: Vec2, angle: number) => {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  const x = v.x - pivot.x
  const y = v.y - pivot.y
  return newVec2(x * c - y * s + pivot.x, x * s + y * c + pivot.y)
}

/**
 * Duplicates the vector.
 * @param v
 * @returns The duplicated vector.
 */
export const copy = (v: Vec2) => newVec2(v.x, v.y)

/**
 * Calculates the distance between two vectors.
 * @param v1 The first vector.
 * @param v2 The second vector.
 * @returns A scalar.
 */
export const distanceTo = (v1: Vec2, v2: Vec2) => Math.sqrt(distanceTo2(v1, v2))
/**
 * Calculates the squared distance between two vectors.
 * @returns A scalar.
 */
export const distanceTo2 = (v1: Vec2, v2: Vec2) =>
  Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2)

/**
 * Calls a function func on each component of a vector,
 * creating a new vector from the result of each function call.
 * @param v
 * @param func
 * @returns A new vector.
 */
export const mapVec = (v: Vec2, func: (xOrY: number) => number) =>
  newVec2(func(v.x), func(v.y))

/**
 * Performs a linear interpolation between two vectors by a time value.
 * @param v1 The start vector.
 * @param v2 The end vector.
 * @param time The time value to interpolate by (should be between 0 and 1).
 * @returns A new vector.
 */
export const lerp = (v1: Vec2, v2: Vec2, time: number) =>
  newVec2(lerpFunc(v1.x, v2.x, time), lerpFunc(v1.y, v2.y, time))

/**
 * Performs a bezier interpolation between two vectors by a time value.
 * @param v1 The start vector.
 * @param v2 The end vector.
 * @param p1 Control point 1.
 * @param p2 Control point 2.
 * @param time The time value to interpolate by (should be between 0 and 1).
 * @returns A new vector.
 */
export const bezier = (
  v1: Vec2,
  v2: Vec2,
  p1: Vec2,
  p2: Vec2,
  time: number
) => {
  // use bezierFunc
  return newVec2(
    bezierFunc(time, v1.x, p1.x, p2.x, v2.x),
    bezierFunc(time, v1.y, p1.y, p2.y, v2.y)
  )
}
