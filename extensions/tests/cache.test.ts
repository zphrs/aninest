import {
  createAnimation,
  ZERO_VEC2,
  getLinearInterp,
  modifyTo,
  newVec2,
  updateAnimation,
} from "aninest"
import { getCacheLayer } from "../src"

test("cache", () => {
  const anim = createAnimation(
    { a: ZERO_VEC2, b: ZERO_VEC2 },
    getLinearInterp(1)
  )
  const cl = getCacheLayer()
  cl.mount(anim)
  let count = 0
  cl.subscribe(() => {
    count++
  })
  modifyTo(anim, { a: newVec2(1, 1), b: newVec2(1, 1) })
  updateAnimation(anim, 0.5)
  expect(cl.cache).toStrictEqual({
    a: newVec2(0.5, 0.5),
    b: newVec2(0.5, 0.5),
  })
  updateAnimation(anim, 0.5)
  expect(cl.cache).toStrictEqual({
    a: { x: 1, y: 1 },
    b: { x: 1, y: 1 },
  })
  updateAnimation(anim, 0.5)
  expect(cl.cache).toStrictEqual({
    a: { x: 1, y: 1 },
    b: { x: 1, y: 1 },
  })
  modifyTo(anim, { a: newVec2(0, 0), b: newVec2(0, 0) })
  updateAnimation(anim, 0.5)
  expect(cl.cache).toStrictEqual({
    a: { x: 0.5, y: 0.5 },
    b: { x: 0.5, y: 0.5 },
  })
  updateAnimation(anim, 0.5)
  expect(cl.cache).toStrictEqual({
    a: { x: 0, y: 0 },
    b: { x: 0, y: 0 },
  })
  // 4 updates to both the `a` and `b` vectors which actually
  // updated the state of the animation.
  expect(count).toBe(8)
})
