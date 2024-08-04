import {
  createAnimation,
  ZERO_VEC2,
  getLinearInterp,
  newVec2,
  divScalar,
  modifyTo,
  updateAnimation,
  getStateTree,
  getInterpingToTree,
} from "aninest"
import { loopAnimation } from "../src"

test("loop animation", () => {
  const anim = createAnimation(
    { a: ZERO_VEC2, b: ZERO_VEC2 },
    getLinearInterp(1)
  )
  loopAnimation(anim)
  const oneVec2 = newVec2(1, 1)
  const halfVec2 = divScalar(oneVec2, 2)
  const almostOneVec2 = newVec2(0.99, 0.99)
  modifyTo(anim, { a: oneVec2, b: oneVec2 })
  updateAnimation(anim, 0.5)
  expect(getStateTree(anim)).toStrictEqual({ a: halfVec2, b: halfVec2 }) // {a: 0.5, b: 0.5}
  updateAnimation(anim, 0.49)
  expect(getStateTree(anim)).toStrictEqual({
    a: almostOneVec2,
    b: almostOneVec2,
  }) // {a: ~1, b: ~1}
  updateAnimation(anim, 0.01) // will trigger the loop
  expect(getStateTree(anim)).toStrictEqual({ a: ZERO_VEC2, b: ZERO_VEC2 }) // {a: 0, b: 0}
  updateAnimation(anim, 0.5)
  expect(getInterpingToTree(anim)).toStrictEqual({ a: oneVec2, b: oneVec2 }) // {a: 1, b: 1}
  expect(getStateTree(anim)).toStrictEqual({ a: halfVec2, b: halfVec2 }) // {a: 0.5, b: 0.5}
})
