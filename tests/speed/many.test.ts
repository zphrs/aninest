import {
  createAnimationInfo,
  newVec2,
  getLinearInterp,
  getStateTree,
  modifyTo,
  updateAnimationInfo,
  getLocalState,
} from "../../src"

describe("speed of updating 1,000 objects", () => {
  const anims = Array.from({ length: 1_000 }, () =>
    createAnimationInfo(
      { p1: newVec2(0, 0), p2: newVec2(1, 1) },
      getLinearInterp(10)
    )
  )
  test("creates animation info", () => {
    for (let anim of anims) {
      expect(getStateTree(anim)).toStrictEqual({
        p1: { x: 0, y: 0 },
        p2: { x: 1, y: 1 },
      })
    }
  })
  test("updates animation info", () => {
    for (let anim of anims) {
      modifyTo(anim, {
        p1: newVec2(1, 1),
        p2: newVec2(0, 0),
      })
    }
    let updateSpeed = 1 / 120 // simulate 240 fps

    function updateFrame(dt: number) {
      for (let anim of anims) {
        updateAnimationInfo(anim, dt)
        const p1 = getLocalState(anim.children.p1)
        if (p1.x < 0 || p1.x > 1 || p1.y < 0 || p1.y > 1) console.log("p1", p1)
      }
    }

    // prewarm with ~10000 frames
    for (let i = 0; i < 10 * 120; i++) {
      updateFrame(0)
    }

    // time it
    const start = performance.now()
    let total_diff = 0
    for (let i = 0; i < 10; i++) {
      // check how much time it takes to update 120 frames
      const start = performance.now()
      for (let j = 0; j < 120; j++) {
        updateFrame(updateSpeed)
      }
      const end = performance.now()
      const diff = end - start
      total_diff += diff
      expect(end - start).toBeLessThan(500) // make sure that updating and getting the state is less than 1/2 of each frame
    }
    // average time per frame
    const avg = total_diff / 10
    expect(avg).toBeLessThan(250) // make sure that on aveerage less than 1/4 of each frame is used to update and get the state
    const end = performance.now()
    expect(end - start).toBeLessThan(20000) // make sure that the total time is less than 3 seconds
    for (let anim of anims) {
      expect(getStateTree(anim)).toStrictEqual({
        p1: { x: 1, y: 1 },
        p2: { x: 0, y: 0 },
      })
    }
  })
})
