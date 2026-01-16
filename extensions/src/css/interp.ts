import {
  Interp,
  newVec2,
  Vec2,
  vecToIter,
  lerp,
  subVec,
  divVec,
  bezierFunc,
} from "aninest"

export type CubicBezier = Readonly<{
  c1: Vec2
  c2: Vec2
}>

export function getCubicBezier(c1: Vec2, c2: Vec2): CubicBezier {
  return {
    c1,
    c2,
  }
}

export function cubicBezierToInterp(
  duration: number,
  cubicBezier: CubicBezier
): Interp {
  return t =>
    t > duration
      ? undefined
      : bezierFunc(
          tFromX(cubicBezier, t / duration),
          0,
          cubicBezier.c1.y,
          cubicBezier.c2.y,
          1
        )
}

/**
 * Takes in a cubic bezier and returns a cubic bezier fit such that the starting
 * point is (0,0) and the ending point is (1,1).
 * @param cubic
 * @returns
 */
function scaleCubic(cubic: readonly [Vec2, Vec2, Vec2, Vec2]): {
  cubic: CubicBezier
  segmentDuration: number
} {
  type Cubic = typeof cubic
  const [a] = cubic
  // transform such that the curve starts at 0,0
  cubic = cubic.map(v => subVec(v, a)) as unknown as Cubic
  const d = cubic[3]
  const [_, c1, c2, _1] = cubic.map(v => divVec(v, d)) as unknown as Cubic
  return {
    cubic: { c1, c2 },
    segmentDuration: d.x,
  }
}

function tFromX(cubic: CubicBezier, x: number) {
  return binarySubdivide(x, 0, 1, cubic.c1.x, cubic.c2.x)
}

const subdivisionPrecision = 0.00001
const subdivisionMaxIterations = 12

function binarySubdivide(
  x: number,
  lowerBound: number,
  upperBound: number,
  c1: number,
  c2: number
) {
  let currX,
    currT: number = lowerBound
  for (let i = 0; i < subdivisionMaxIterations; i++) {
    currT = lowerBound + (upperBound - lowerBound) / 2.0
    currX = bezierFunc(currT, 0, c1, c2, 1) - x
    if (currX > 0) {
      upperBound = currT
    } else {
      lowerBound = currT
    }
    if (Math.abs(currX) < subdivisionPrecision) {
      return currT
    }
  }
  return currT
}

export function splitCubicBezier(
  bezier: CubicBezier,
  x: number
): [
  { cubic: CubicBezier; segmentDuration: number },
  { cubic: CubicBezier; segmentDuration: number }
] {
  const t = tFromX(bezier, x)
  const a = newVec2(0, 0)
  const b = bezier.c1
  const c = bezier.c2
  const d = newVec2(1, 1)
  const e = lerp(a, b, t)
  const f = lerp(b, c, t)
  const g = lerp(c, d, t)
  const h = lerp(e, f, t)
  const j = lerp(f, g, t)
  const k = lerp(h, j, t) // original curve split
  const cubic1 = [a, e, h, k] as const
  const cubic2 = [k, j, g, d] as const
  return [scaleCubic(cubic1), scaleCubic(cubic2)]
}

export function cubicBezierToEasingFunction(cubicBezier: CubicBezier) {
  const params = [...vecToIter(cubicBezier.c1), ...vecToIter(cubicBezier.c2)]
  return `cubic-bezier(${params.join(",")})`
}

export const Slerp: CubicBezier = {
  c1: newVec2((Math.PI - 2) / Math.PI, 0),
  c2: newVec2(1 - (Math.PI - 2) / Math.PI, 1),
}

export const Linear: CubicBezier = {
  c1: newVec2(0, 0),
  c2: newVec2(1, 1),
}

export const Ease: CubicBezier = {
  c1: newVec2(0.25, 0.1),
  c2: newVec2(0.25, 1),
}

export const EaseIn: CubicBezier = {
  c1: newVec2(0.42, 0),
  c2: newVec2(1, 1),
}

export const EaseOut: CubicBezier = {
  c1: newVec2(0, 0),
  c2: newVec2(0.58, 1),
}

export const EaseInOut = {
  c1: newVec2(0.42, 0),
  c2: newVec2(0.58, 1),
}
