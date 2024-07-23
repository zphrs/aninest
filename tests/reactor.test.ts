import {
  addReactor,
  createAnimation,
  distanceTo,
  getLinearInterp,
  getStateTree,
  modifyTo,
  updateAnimation,
  Vec2,
  ZERO_VEC2,
} from "../src"

describe("reactor", () => {
  test("size dep", () => {
    type Dot = {
      pos: Vec2
      size: number
      color: { r: number; g: number; b: number }
    }
    const anim = createAnimation<Dot>(
      {
        pos: ZERO_VEC2,
        size: 0,
        color: { r: 255, g: 0, b: 0 },
      },
      getLinearInterp(1)
    )
    let reactorCt = 0
    addReactor(
      anim,
      ({ pos }) => {
        reactorCt++
        const size = distanceTo(pos as Vec2, ZERO_VEC2)
        return { size }
      },
      { color: false, size: false } // only reacting to pos
    )

    modifyTo(anim, { pos: { x: 1 } })
    updateAnimation(anim, 1)
    expect(getStateTree(anim)).toEqual({
      pos: { x: 1, y: 0 },
      size: 1,
      color: { r: 255, g: 0, b: 0 },
    })
    modifyTo(anim, { size: 2 }) // shouldn't trigger the reactor
    expect(reactorCt).toBe(1) // only first modifyTo should trigger the reactor
  })
})
