import {
  newVec2,
  createAnimation,
  getLinearInterp,
  getStateTree,
  modifyTo,
  updateAnimation,
} from "aninest"
import { setupBoundsLayer } from "../src"

describe("bounds", () => {
  const bounds = {
    lower: {
      a: newVec2(-1, -1),
    },
    upper: {
      a: newVec2(1, 1),
    },
  }
  const anim = createAnimation({ a: newVec2(0, 0) }, getLinearInterp(1))
  const { mount } = setupBoundsLayer(anim, bounds)
  mount(anim)
  test("creates animation info", () => {
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0, y: 0 },
    })
  })
  test("overextends", () => {
    modifyTo(anim, {
      a: newVec2(2, 2),
    })
    let needUpdate = updateAnimation(anim, 1)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 2, y: 2 },
    })
    expect(needUpdate).toBe(true)
  })
  test("bounces", () => {
    let needUpdate = updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1.5, y: 1.5 },
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
    expect(needUpdate).toBe(false)
  })
})
