export const lerpFunc = (a: number, b: number, t: number) => a + (b - a) * t
export const bezierFunc = (t: number, start: number, c1: number, c2: number, end: number) => {
  // use lerp func
  const ab = lerpFunc(start, c1, t)
  const bc = lerpFunc(c1, c2, t)
  const cd = lerpFunc(c2, end, t)
  const abbc = lerpFunc(ab, bc, t)
  const bccd = lerpFunc(bc, cd, t)
  return lerpFunc(abbc, bccd, t)
}

export type Vec2 = { readonly x: number; readonly y: number }

export const zeroVec2 = { x: 0, y: 0 }

export const clamp = (min: number | undefined, n: number, max: number | undefined) => {
  let out = n
  if (min != undefined) {
    out = Math.max(min, out)
  }
  if (max != undefined) {
    out = Math.min(max, out)
  }
  return out
}

export const newVec2 = (x: number, y: number) => ({ x, y })

export const addVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x + v2.x, v1.y + v2.y)

export const subVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x - v2.x, v1.y - v2.y)

export const mulVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x * v2.x, v1.y * v2.y)

export const mulScalar = (v: Vec2, s: number) => newVec2(v.x * s, v.y * s)

export const divVec = (v1: Vec2, v2: Vec2) => newVec2(v1.x / v2.x, v1.y / v2.y)

export const mag = (v: Vec2) => Math.sqrt(magSquared(v))

export const vecToIter = (v: Vec2) => [v.x, v.y] as const

export const magSquared = (v: Vec2) => v.x * v.x + v.y * v.y

export const normalize = (v: Vec2) => divScalar(v, mag(v))

export const divScalar = (v: Vec2, s: number) => newVec2(v.x / s, v.y / s)

export const dot = (v1: Vec2, v2: Vec2) => v1.x * v2.x + v1.y * v2.y

export const cross = (v1: Vec2, v2: Vec2) => v1.x * v2.y - v1.y * v2.x

export const rotate = (v: Vec2, angle: number) => {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return newVec2(v.x * c - v.y * s, v.x * s + v.y * c)
}

export const rotateAround = (v: Vec2, pivot: Vec2, angle: number) => {
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  const x = v.x - pivot.x
  const y = v.y - pivot.y
  return newVec2(x * c - y * s + pivot.x, x * s + y * c + pivot.y)
}

export const copy = (v: Vec2) => newVec2(v.x, v.y)

export const distanceTo = (v1: Vec2, v2: Vec2) => Math.sqrt(distanceTo2(v1, v2))

export const distanceTo2 = (v1: Vec2, v2: Vec2) =>
  Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2)

export const mapVec = (v: Vec2, func: (xOrY: number) => number) => newVec2(func(v.x), func(v.y))

export const lerp = (v1: Vec2, v2: Vec2, time: number) =>
  newVec2(lerpFunc(v1.x, v2.x, time), lerpFunc(v1.y, v2.y, time))

export const bezier = (v1: Vec2, v2: Vec2, p1: Vec2, p2: Vec2, time: number) => {
  // use bezierFunc
  return newVec2(bezierFunc(time, v1.x, p1.x, p2.x, v2.x), bezierFunc(time, v1.y, p1.y, p2.y, v2.y))
}
