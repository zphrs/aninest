import {
  createAnimation,
  newVec2,
  NO_INTERP,
  modifyTo,
  getStateTree,
  updateAnimation,
  getLinearInterp,
  addRecursiveListener,
  UPDATE,
  changeInterpFunction,
} from "aninest"
import { setupBoundsLayer } from "../src"

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
