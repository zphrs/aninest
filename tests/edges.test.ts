import {
  NO_INTERP,
  addRecursiveStartListener,
  changeInterpFunction,
  createAnimationInfo,
  getInterpingToWithChildren,
  getLinearInterp,
  getStateTree,
  modifyAnimationBounds,
  modifyTo,
  newVec2,
  removeRecursiveStartListener,
  updateAnimationInfo,
} from "../src"

describe("edge cases of modifyTo", () => {
  const anim = createAnimationInfo({ a: newVec2(0, 0) }, NO_INTERP)
  test("modifyTo with incorrect parameters", () => {
    modifyTo(anim, { a: newVec2(1, 1), b: newVec2(0, 0) } as any)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
})

describe("add recursive start listener", () => {
  const anim = createAnimationInfo({ a: newVec2(0, 0) }, NO_INTERP)
  test("add recursive start listener", done => {
    let ct = 0
    let timeout: NodeJS.Timeout
    const listener = () => {
      ct++
      if (ct === 2) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          done()
          removeRecursiveStartListener(anim, listener)
        }, 100)
      }
    }
    addRecursiveStartListener(anim, listener)
    modifyTo(anim.children.a, newVec2(1, 1))
    modifyTo(anim, { a: newVec2(1, 1) })
  })
})

describe("bound animation", () => {
  const anim = createAnimationInfo({ a: newVec2(0, 0) }, NO_INTERP)
  test("unbounded", () => {
    modifyTo(anim, { a: newVec2(1, 1) })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
  test("bounded", () => {
    modifyAnimationBounds(anim, {
      upper: {
        a: { x: 0.5 },
      },
    })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
  test("bounded", () => {
    modifyTo(anim, { a: { x: 0.2 } })
    modifyAnimationBounds(anim, {
      lower: {
        a: { x: 0.5 },
      },
    })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
  test("empty", () => {
    modifyAnimationBounds(anim, {})
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
  test("undefined", () => {
    modifyAnimationBounds(anim, undefined)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
})

describe("change interp function", () => {
  const anim = createAnimationInfo(
    { a: newVec2(0, 0), b: newVec2(1, 1) },
    NO_INTERP
  )
  test("change interp function", () => {
    modifyTo(anim, { a: newVec2(1, 0) })
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 0 },
      b: { x: 1, y: 1 },
    })
    modifyAnimationBounds(anim, {
      upper: {
        a: { x: 0.5 },
      },
    })
    modifyTo(anim, { b: { x: 0.5 } })
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 0 },
      b: { x: 0.5, y: 1 },
    })
    changeInterpFunction(anim, getLinearInterp(1), {
      a: false,
    })
    modifyTo(anim, { a: newVec2(0.5, 1), b: newVec2(0, 0) })
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 1 },
      b: { x: 0.5, y: 1 },
    })
    updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 1 },
      b: { x: 0.25, y: 0.5 },
    })
  })
})

describe("get interping to", () => {
  const anim = createAnimationInfo({ a: newVec2(0, 0) }, getLinearInterp(1))
  test("get interping to", () => {
    modifyTo(anim, { a: newVec2(1, 1) })
    expect(getInterpingToWithChildren(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
    updateAnimationInfo(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 0.5 } })
    expect(getInterpingToWithChildren(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
  })
})
