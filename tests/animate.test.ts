import {
  Animation,
  addLocalListener,
  createAnimation,
  getLocalState,
  getStateTree,
  getLinearInterp,
  modifyTo,
  newVec2,
  removeLocalListener,
  updateAnimation,
  loopAnimation,
  ZERO_VEC2,
  initializeAnimationCache,
  divScalar,
  getInterpingToTree,
} from "../src"
describe("non-interrupted animation", () => {
  let animationInfo: Animation<{ a: number; b: number }>
  test("creates animation info", () => {
    animationInfo = createAnimation({ a: 2, b: 1 }, getLinearInterp(1))
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
    let needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1.5,
      b: 1.5,
    })
    expect(animationInfo._time).toBe(0.5)
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1,
      b: 2,
    })
    expect(needUpdate).toBe(false)
    needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 1,
      b: 2,
    })
    expect(needUpdate).toBe(false)
  })
})
describe("interrupted animation", () => {
  let animationInfo = createAnimation({ a: 2, b: 1 }, getLinearInterp(1))
  test("updates animation info", () => {
    modifyTo(animationInfo, {
      a: 4,
      b: 3,
    })
    let needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 2,
    })
    expect(animationInfo._time).toBe(0.5)
    expect(needUpdate).toBe(true)
  })
  test("interrupts animation", () => {
    modifyTo(animationInfo, {
      a: 3,
      b: 4,
    })
    let needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 3,
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 4,
    })
    expect(needUpdate).toBe(false)
  })
})
describe("interrupted animation events", () => {
  let animationInfo = createAnimation({ a: 2, b: 1 }, getLinearInterp(1))
  test("updates animation info", () => {
    modifyTo(animationInfo, {
      a: 4,
      b: 3,
    })
    let needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 2,
    })
    expect(animationInfo._time).toBe(0.5)
    expect(needUpdate).toBe(true)
  })
  test("interrupts animation events", done => {
    let onInterrupt = (e: { a?: number; b?: number }) => {
      expect(e).toStrictEqual({ a: 3, b: 4 })
      removeLocalListener(animationInfo, "interrupt", onInterrupt)
      done()
    }
    addLocalListener(animationInfo, "interrupt", onInterrupt)
    modifyTo(animationInfo, {
      a: 3,
      b: 4,
    })
    let needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 3,
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimation(animationInfo, 0.5)
    expect(getLocalState(animationInfo)).toStrictEqual({
      a: 3,
      b: 4,
    })
    expect(needUpdate).toBe(false)
  })
})

describe("nested animation", () => {
  const anim = createAnimation(
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
    let needUpdate = updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 0.5 },
      b: { x: 0.5, y: 0.5 },
    })
    expect(needUpdate).toBe(true)
    needUpdate = updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
      b: { x: 0, y: 0 },
    })
    expect(needUpdate).toBe(false)
  })
})

describe("bounds", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, getLinearInterp(1), {
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

test("loop animation", () => {
  const anim = createAnimation(
    { a: ZERO_VEC2, b: ZERO_VEC2 },
    getLinearInterp(1)
  )
  loopAnimation(anim)
  const oneVec2 = newVec2(1, 1)
  const halfVec2 = divScalar(oneVec2, 2)
  const almostOneVec2 = newVec2(0.99, 0.99)
  modifyTo(anim, { a: oneVec2, b: oneVec2 })
  updateAnimation(anim, 0.5)
  expect(getStateTree(anim)).toStrictEqual({ a: halfVec2, b: halfVec2 }) // {a: 0.5, b: 0.5}
  updateAnimation(anim, 0.49)
  expect(getStateTree(anim)).toStrictEqual({
    a: almostOneVec2,
    b: almostOneVec2,
  }) // {a: ~1, b: ~1}
  updateAnimation(anim, 0.01) // will trigger the loop
  expect(getStateTree(anim)).toStrictEqual({ a: ZERO_VEC2, b: ZERO_VEC2 }) // {a: 0, b: 0}
  updateAnimation(anim, 0.5)
  expect(getInterpingToTree(anim)).toStrictEqual({ a: oneVec2, b: oneVec2 }) // {a: 1, b: 1}
  expect(getStateTree(anim)).toStrictEqual({ a: halfVec2, b: halfVec2 }) // {a: 0.5, b: 0.5}
})

test("simplified loop issue", () => {
  const anim = createAnimation(
    { a: newVec2(0, 0), b: newVec2(0, 0) },
    getLinearInterp(1)
  )
  const oneVec2 = newVec2(1, 1)
  modifyTo(anim, { a: oneVec2, b: oneVec2 })
  updateAnimation(anim, 0.99)
  updateAnimation(anim, 0.01)
  expect(getStateTree(anim)).toStrictEqual({ a: oneVec2, b: oneVec2 })
})

test("cache", () => {
  const anim = createAnimation(
    { a: ZERO_VEC2, b: ZERO_VEC2 },
    getLinearInterp(1)
  )
  initializeAnimationCache(anim)
  modifyTo(anim, { a: newVec2(1, 1), b: newVec2(1, 1) })
  updateAnimation(anim, 0.5)
  expect(getStateTree(anim)).toStrictEqual({
    a: { x: 0.5, y: 0.5 },
    b: { x: 0.5, y: 0.5 },
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
})
