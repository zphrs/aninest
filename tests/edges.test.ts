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
  setupBoundsLayer,
  Vec2,
  Animation,
} from "../src"
import { UPDATE } from "../src/Animate/AnimatableEvents"

describe("edge cases of modifyTo", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  test("modifyTo with incorrect parameters", () => {
    modifyTo(anim, { a: newVec2(1, 1), b: newVec2(0, 0) } as any)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
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

describe("instant bound animation", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  const { mount, update: updateBounds } = setupBoundsLayer(anim, {})
  mount(anim)
  test("unbounded", () => {
    modifyTo(anim, { a: newVec2(1, 1) })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
  test("bounded upper", () => {
    updateBounds({
      upper: {
        a: { x: 0.5 },
      },
    })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
  test("bounded lower", () => {
    modifyTo(anim, { a: { x: 0.2 } })
    updateBounds({
      lower: {
        a: { x: 0.5 },
      },
    })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
    updateAnimation(anim, 0.5)
  })
  test("empty", () => {
    updateBounds({})
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
})

describe("continuous bound animation", () => {
  const anim = createAnimation({ a: newVec2(1, 0) }, getLinearInterp(1))
  const { mount, update: updateBounds } = setupBoundsLayer(anim, {})
  mount(anim)
  test("bounded without current interp", () => {
    updateBounds({
      upper: {
        a: { x: 0.5 },
      },
    })
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 0 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.75, y: 0 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 0 } })
  })
  test("bounded with current interp", () => {
    updateBounds({
      upper: {
        a: { x: Infinity }, // no upper bound
      },
    })
    modifyTo(anim, { a: newVec2(1, 1) })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.75, y: 0.5 } })
    updateBounds({
      upper: {
        a: { x: 0.5 },
      },
    }) // will interrupt the current interp and start a new interp to the bound
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.75, y: 0.5 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.625, y: 0.75 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
  test("bounded and then bounced", () => {
    updateBounds({
      upper: {
        a: { x: 0.5 },
      },
    })
    modifyTo(anim, { a: newVec2(0, 0) })
    updateAnimation(anim, 1) // finish the current interp
    modifyTo(anim, { a: newVec2(1, 1) })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 0.5 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.75, y: 1 } })
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 0.5, y: 1 } })
  })
})

describe("updating event counts", () => {
  const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
  test("update triggers correct number of times", () => {
    let count = 0
    addRecursiveListener(anim, UPDATE, () => {
      count++
    })
    modifyTo(anim, { a: newVec2(1, 0) })
    updateAnimation(anim, 1) // shouldn't update anything
    expect(count).toEqual(1)
  })
})

describe("change interp function", () => {
  const anim = createAnimation(
    { a: newVec2(0, 0), b: newVec2(1, 1) },
    NO_INTERP
  )
  const { mount, update: updateBounds } = setupBoundsLayer(anim, {})
  mount(anim)
  test("change interp function", () => {
    modifyTo(anim, { a: newVec2(1, 0) })
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 1, y: 0 },
      b: { x: 1, y: 1 },
    })
    updateBounds({
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
    updateAnimation(anim, 0.5)
    expect(getStateTree(anim)).toStrictEqual({
      a: { x: 0.5, y: 1 },
      b: { x: 0.25, y: 0.5 },
    })
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
