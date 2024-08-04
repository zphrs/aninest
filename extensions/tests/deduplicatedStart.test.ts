import {
  createAnimation,
  getLinearInterp,
  modifyTo,
  newVec2,
  updateAnimation,
  ZERO_VEC2,
} from "aninest"
import { getDeduplicatedStartLayer } from "../src"

describe("deduplicated start", () => {
  test("two children", () => {
    const anim = createAnimation(
      { a: ZERO_VEC2, b: ZERO_VEC2, c: 0 },
      getLinearInterp(1)
    )
    let count = 0
    const { subscribe: startSub, mount } = getDeduplicatedStartLayer()
    mount(anim)
    startSub(() => {
      count++
    })
    modifyTo(anim, { a: newVec2(1, 1), b: newVec2(1, 1), c: 1 })
    updateAnimation(anim, 1)
    updateAnimation(anim, 0.5)
    modifyTo(anim, { a: newVec2(0, 0), b: newVec2(0, 0), c: 0 })
    updateAnimation(anim, 0.5)
    updateAnimation(anim, 0.5)
    expect(count).toStrictEqual(2)
  })
})
