import {
  createAnimation,
  newVec2,
  getLinearInterp,
  getStateTree,
  modifyTo,
  updateAnimation,
} from "../../src"

describe("speed of updating one object", () => {
  const anim = createAnimation(
    { p1: newVec2(0, 0), p2: newVec2(1, 1) },
    getLinearInterp(1_000)
  )
  test("creates animation info", () => {
    expect(getStateTree(anim)).toStrictEqual({
      p1: { x: 0, y: 0 },
      p2: { x: 1, y: 1 },
    })
  })
  test("updates animation info", () => {
    modifyTo(anim, {
      p1: newVec2(1, 1),
      p2: newVec2(0, 0),
    })
    let updateSpeed = 1 / 240 // simulate 240 fps
    // time it
    const start = performance.now()
    let total_diff = 0
    for (let i = 0; i < 1000; i++) {
      // check how much time it takes to update 240 frames
      const start = performance.now()
      for (let j = 0; j < 240; j++) {
        updateAnimation(anim, updateSpeed)
        const state = getStateTree(anim)
        if (
          state.p1.x < 0 ||
          state.p1.x > 1 ||
          state.p1.y < 0 ||
          state.p1.y > 1
        )
          console.log("p1", state.p1)
      }
      const end = performance.now()
      const diff = end - start
      total_diff += diff
      expect(end - start).toBeLessThan(30) // make sure that only 1/50th of each frame is used in worst case
    }
    // average time per frame
    const avg = total_diff / 1000
    const end = performance.now()
    // make sure that on average updating and getting the state is less than 1/1000th of each frame
    expect(avg).toBeLessThan(1)
    expect(end - start).toBeLessThan(5000)
    expect(getStateTree(anim)).toStrictEqual({
      p1: { x: 1, y: 1 },
      p2: { x: 0, y: 0 },
    })
  })
})
