import {
  createAnimation,
  getDeduplicatedStartLayer,
  getLinearInterp,
  getStateTree,
  modifyTo,
  newVec2,
  updateAnimation,
  ZERO_VEC2,
} from "../src"

describe("deduplicated start", () => {
  test("two children", () => {
    const anim = createAnimation(
      { a: ZERO_VEC2, b: ZERO_VEC2 },
      getLinearInterp(1)
    )
    let count = 0
    const { subscribe: startSub, mount } = getDeduplicatedStartLayer()
    mount(anim)
    startSub(() => {
      count++
    })
    modifyTo(anim, { a: newVec2(1, 1), b: newVec2(1, 1) })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: newVec2(0.5, 0.5),
      b: newVec2(0.5, 0.5),
    })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
      b: { x: 1, y: 1 },
    })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
      b: { x: 1, y: 1 },
    })
    modifyTo(anim, { a: newVec2(0, 0), b: newVec2(0, 0) })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 0.5 },
      b: { x: 0.5, y: 0.5 },
    })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0, y: 0 },
      b: { x: 0, y: 0 },
    })
    expect(count).toStrictEqual(4)
  })
})
