import {
  NO_INTERP,
  addRecursiveListener,
  changeInterpFunction,
  createAnimation,
  getInterpingToTree,
  getLinearInterp,
  getStateTree,
  modifyTo,
  newVec2,
  removeRecursiveListener,
  updateAnimation,
  addLocalListener,
  getLocalState,
  Vec2,
  Animation,
} from "../src"

describe("edge cases of modifyTo", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  test("modifyTo with incorrect parameters", () => {
    modifyTo(anim, { a: newVec2(1, 1), b: newVec2(0, 0) } as any)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
})

describe("string as a key", () => {
  const anim = createAnimation({ hex: "#fff" }, getLinearInterp(1))
  test("modifyTo with string as a key", () => {
    modifyTo(anim, { hex: "#000" })
    expect(getStateTree(anim)).toStrictEqual({ hex: "#fff" })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ hex: "#000" })
  })
})

describe("add recursive start listener", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  test("add recursive start listener", done => {
    let ct = 0
    let timeout: NodeJS.Timeout
    const listener = () => {
      ct++
      if (ct === 2) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          done()
          removeRecursiveListener(anim, "start", listener)
        }, 100)
      }
    }
    addRecursiveListener(anim, "start", listener)
    modifyTo(anim.children.a, newVec2(1, 1))
    modifyTo(anim, { a: newVec2(1, 1) })
  })
})

describe("remove recursive start listener", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  test("modify after removal", done => {
    let ct = 0
    let timeout: NodeJS.Timeout
    const listener = () => {
      ct++
      if (ct === 2) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          removeRecursiveListener(anim, "start", listener)
          done()
        }, 100)
      } else if (ct === 3) {
        clearTimeout(timeout)
        // report error
        throw new Error("Recursive listener was not removed properly")
      }
    }
    addRecursiveListener(anim, "start", listener)
    modifyTo(anim.children.a, newVec2(1, 1))
    modifyTo(anim, { a: newVec2(1, 1) })
    removeRecursiveListener(anim, "start", listener)
    modifyTo(anim, { a: newVec2(1, 1) })
  })
})

describe("get interping to", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, getLinearInterp(1))
  test("get interping to", () => {
    modifyTo(anim, { a: newVec2(1, 1) })
    expect(getInterpingToTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 0.5 } })
    expect(getInterpingToTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
    })
  })
})

describe("get state", () => {
  test("get tree with uneven levels", () => {
    const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
    modifyTo(anim, { a: newVec2(1, 1), b: 2 })
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 1 },
      b: 2,
    })
  })
  test("get local state with uneven levels", () => {
    const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
    expect(getLocalState(anim)).toStrictEqual({
      b: 1,
    })
  })
})

test("destructuring", () => {
  const anim = createAnimation(
    { a: { x: { value: 0 }, y: { value: 0 } }, b: { x: 0, y: 0 } },
    getLinearInterp(1)
  )
  const {
    x: { value: x },
    y: { value: y },
  } = getStateTree(anim.children.a)
  expect(x).toBe(0)
  expect(y).toBe(0)
})

test("verbose mask", () => {
  const anim = createAnimation(
    { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } },
    getLinearInterp(1)
  )
  changeInterpFunction(anim, getLinearInterp(2), {
    a: false,
    b: true,
  })
  modifyTo(anim, { a: { x: 1, y: 1 }, b: { x: 1, y: 1 } })
  updateAnimation(anim, 1)
  expect(getStateTree(anim)).toStrictEqual({
    a: { x: 1, y: 1 },
    b: { x: 0.5, y: 0.5 },
  })
})

test("end event of parent", done => {
  let anim = createAnimation({ a: newVec2(2, 2) }, getLinearInterp(1))
  modifyTo(anim, { a: { x: 1 } })
  addLocalListener(anim.children.a as Animation<Vec2>, "end", () => {
    done()
  })
  updateAnimation(anim, 1)
}, 200)

test("big nested interp", () => {
  const anim = createAnimation(
    {
      pos: { x: 0, y: 0 },
      b: { x: 0, y: 0 },
      styles: { colors: { background: { r: 0, g: 0, b: 0 } } },
    },
    NO_INTERP
  )
  changeInterpFunction(anim.children.styles, getLinearInterp(2))
  modifyTo(anim, {
    pos: { x: 1, y: 1 },
    b: { x: 1, y: 1 },
    styles: { colors: { background: { r: 255, g: 255, b: 255 } } },
  })
  updateAnimation(anim, 1)
  expect(getStateTree(anim)).toStrictEqual({
    pos: { x: 1, y: 1 },
    b: { x: 1, y: 1 },
    styles: { colors: { background: { r: 127.5, g: 127.5, b: 127.5 } } },
  })
})
