import {
  createAnimation,
  distanceLessThan,
  getLinearInterp,
  getLocalState,
  modifyTo,
  snapGridExtension,
  snapPointExtension,
  updateAnimation,
  createExtensionStack,
  addExtensionToStack,
  mountStack,
  Vec2,
  newVec2,
  ZERO_VEC2,
  dynamicSpeedExtension,
  NO_INTERP,
} from "../src"

describe("extension stack", () => {
  test("snaps", () => {
    const stack = createExtensionStack<Vec2>()
    addExtensionToStack(stack, snapGridExtension<Vec2>(newVec2(0.05, 0.05)))
    addExtensionToStack(
      stack,
      snapPointExtension(ZERO_VEC2, distanceLessThan(0.1))
    )
    const anim = createAnimation(newVec2(0.06, 0.06), getLinearInterp(1))
    const unmountStack = mountStack(stack, anim)
    expect(getLocalState(anim)).toStrictEqual(newVec2(0.06, 0.06))
    updateAnimation(anim, 1)
    expect(getLocalState(anim)).toStrictEqual(ZERO_VEC2)
    modifyTo(anim, newVec2(0.11, 0.11))
    updateAnimation(anim, 1)
    expect(getLocalState(anim)).toStrictEqual(newVec2(0.11, 0.11))
    updateAnimation(anim, 1)
    expect(getLocalState(anim)).toStrictEqual(newVec2(0.1, 0.1))
    unmountStack()
    expect(getLocalState(anim)).toStrictEqual(newVec2(0.1, 0.1))
    modifyTo(anim, newVec2(0.11, 0.11))
    const needsUpdate = updateAnimation(anim, 1)
    expect(getLocalState(anim)).toStrictEqual(newVec2(0.11, 0.11))
    expect(needsUpdate).toBe(false)
  })
  test("dynamic speed", () => {
    const stack = createExtensionStack<Vec2>()
    const anim = createAnimation(newVec2(2, 2), NO_INTERP)
    addExtensionToStack(stack, dynamicSpeedExtension(getLinearInterp, 1))
    const unmountStack = mountStack(stack, anim)
    modifyTo(anim, newVec2(0, 2))
    let needsUpdate = updateAnimation(anim, 1)
    expect(needsUpdate).toBe(true)
    needsUpdate = updateAnimation(anim, 1)
    expect(needsUpdate).toBe(false)
    unmountStack()
    modifyTo(anim, newVec2(2, 2))
    needsUpdate = updateAnimation(anim, 0)
    expect(needsUpdate).toBe(false)
  })
})
