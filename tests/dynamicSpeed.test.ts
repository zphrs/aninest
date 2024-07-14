import {
  createAnimation,
  getLinearInterp,
  modifyTo,
  newVec2,
  NO_INTERP,
  setRecursiveDynamicSpeed,
  updateAnimation,
} from "../src"

test("dynamic speed", () => {
  const anim = createAnimation(newVec2(2, 2), NO_INTERP)
  const remove = setRecursiveDynamicSpeed(anim, undefined, getLinearInterp, 1)
  modifyTo(anim, { x: 0, y: 2 })
  let needsUpdate = updateAnimation(anim, 1)
  expect(needsUpdate).toBe(true)
  needsUpdate = updateAnimation(anim, 1)
  expect(needsUpdate).toBe(false)
  remove()
  modifyTo(anim, { x: 2, y: 2 })
  needsUpdate = updateAnimation(anim, 0)
  expect(needsUpdate).toBe(false)
})
