import {
  AnimationInfo,
  addListener,
  createAnimationInfo,
  getLocalState,
  getStateTree,
  getLinearInterp,
  modifyTo,
  newVec2,
  removeListener,
  updateAnimationInfo,
} from "../src"
describe("non-interrupted animation", () => {
  let animationInfo: AnimationInfo<{ a: number; b: number }>
  test("creates animation info", () => {
    animationInfo = createAnimationInfo({ a: 2, b: 1 }, getLinearInterp(1))
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 2,
      b: 1,
    })
  })
  test("updates animation info", () => {
    modifyTo(animationInfo, {
      a: 1,
      b: 2,
    })
    let needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1.5,
      b: 1.5,
    })
    expect(animationInfo.time).toBe(0.5)
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1,
      b: 2,
    })
    expect(needUpdate).toBe(false)
    needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1,
      b: 2,
    })
    expect(needUpdate).toBe(false)
  })
})
describe("interrupted animation", () => {
  let animationInfo = createAnimationInfo({ a: 2, b: 1 }, getLinearInterp(1))
  test("updates animation info", () => {
    modifyTo(animationInfo, {
      a: 4,
      b: 3,
    })
    let needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 2,
    })
    expect(animationInfo.time).toBe(0.5)
    expect(needUpdate).toBe(true)
  })
  test("interrupts animation", () => {
    modifyTo(animationInfo, {
      a: 3,
      b: 4,
    })
    let needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 3,
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 4,
    })
    expect(needUpdate).toBe(false)
  })
})
describe("interrupted animation events", () => {
  let animationInfo = createAnimationInfo({ a: 2, b: 1 }, getLinearInterp(1))
  test("updates animation info", () => {
    modifyTo(animationInfo, {
      a: 4,
      b: 3,
    })
    let needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 2,
    })
    expect(animationInfo.time).toBe(0.5)
    expect(needUpdate).toBe(true)
  })
  test("interrupts animation events", done => {
    let onInterrupt = (e: { a?: number; b?: number }) => {
      expect(e).toStrictEqual({ a: 3, b: 4 })
      removeListener(animationInfo, "interrupt", onInterrupt)
      done()
    }
    addListener(animationInfo, "interrupt", onInterrupt)
    modifyTo(animationInfo, {
      a: 3,
      b: 4,
    })
    let needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 3,
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimationInfo(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 4,
    })
    expect(needUpdate).toBe(false)
  })
})

describe("nested animation", () => {
  const anim = createAnimationInfo(
    { a: newVec2(0, 0), b: newVec2(1, 1) },
    getLinearInterp(1)
  )
  test("creates animation info", () => {
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0, y: 0 },
      b: { x: 1, y: 1 },
    })
  })

  test("updates animation info", () => {
    modifyTo(anim, {
      a: newVec2(1, 1),
      b: newVec2(0, 0),
    })
    let needUpdate = updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 0.5 },
      b: { x: 0.5, y: 0.5 },
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
      b: { x: 0, y: 0 },
    })
    expect(needUpdate).toBe(false)
  })
})

describe("bounds", () => {
  const anim = createAnimationInfo({ a: newVec2(0, 0) }, getLinearInterp(1), {
    lower: {
      a: newVec2(-1, -1),
    },
    upper: {
      a: newVec2(1, 1),
    },
  })
  test("creates animation info", () => {
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0, y: 0 },
    })
  })
  test("overextends", () => {
    modifyTo(anim, {
      a: newVec2(2, 2),
    })
    let needUpdate = updateAnimationInfo(anim, 1)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 2, y: 2 },
    })
    expect(needUpdate).toBe(true)
  })
  test("bounces", () => {
    let needUpdate = updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1.5, y: 1.5 },
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
    expect(needUpdate).toBe(false)
  })
})
