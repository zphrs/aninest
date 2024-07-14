import {
  createAnimation,
  createParentAnimation,
  getLinearInterp,
  getStateTree,
  modifyTo,
  newVec2,
  NO_INTERP,
  updateAnimation,
  Vec2,
} from "../src"

describe("creating a parent animation", () => {
  const a1 = createAnimation(newVec2(0, 0), getLinearInterp(1))
  const a2 = createAnimation(newVec2(1, 0), getLinearInterp(1))
  test("parenting two animations", () => {
    const parent = createParentAnimation<{ a: Vec2; b: Vec2; c: number }>(
      { a: a1, b: a2, c: 0 },
      NO_INTERP
    )
    expect(getStateTree(parent)).toEqual({
      a: newVec2(0, 0),
      b: newVec2(1, 0),
      c: 0,
    })
    modifyTo(parent, { a: newVec2(1, 1), b: newVec2(1, 1), c: 1 })
    expect(getStateTree(parent)).toEqual({
      a: newVec2(0, 0),
      b: newVec2(1, 0),
      c: 1,
    })
    updateAnimation(parent, 0.5)
    expect(getStateTree(parent)).toEqual({
      a: newVec2(0.5, 0.5),
      b: newVec2(1, 0.5),
      c: 1,
    })
    updateAnimation(parent, 0.5)
    expect(getStateTree(parent)).toEqual({
      a: newVec2(1, 1),
      b: newVec2(1, 1),
      c: 1,
    })
  })
})
