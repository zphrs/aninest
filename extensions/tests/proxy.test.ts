import {
  createAnimation,
  getLinearInterp,
  modifyTo,
  newVec2,
  NO_INTERP,
  updateAnimation,
} from "aninest"
import { getLocalStateProxy, getStateTreeProxy } from "../src"
describe("proxy", () => {
  test("local proxy", () => {
    const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1))
    const { proxy } = getLocalStateProxy(anim)
    expect(proxy.a).toBe(0)
    expect(proxy.b).toBe(0)
    proxy.a = 1
    expect(proxy.a).toBe(0)
    updateAnimation(anim, 0.5)
    expect(proxy.a).toBe(0.5)
    expect(proxy.a).toBe(0.5)
    expect(proxy.b).toBe(0)
    updateAnimation(anim, 0.5)
    expect(proxy.a).toBe(1)
    expect(proxy.a).toBe(1)
    expect(proxy.b).toBe(0)
    try {
      proxy.a = "oops" as any
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })

  test("recursive proxy", () => {
    const anim = createAnimation(
      { a: { x: 0, y: 0 }, b: 0 },
      getLinearInterp(1)
    )
    const { proxy } = getStateTreeProxy(anim)
    expect(Object.keys(proxy).sort()).toEqual(["a", "b"].sort())
    expect(Object.keys(proxy.a)).toEqual(["x", "y"])
    expect(proxy.a.x).toBe(0)
    expect(proxy.a.y).toBe(0)
    expect(proxy.b).toBe(0)
    proxy.a.x = 1
    expect(proxy.a.x).toBe(0)
    updateAnimation(anim, 0.5)
    expect(proxy.a.x).toBe(0.5)
    expect(proxy.a.y).toBe(0)
    expect(proxy.b).toBe(0)
    updateAnimation(anim, 0.5)
    expect(proxy.a.x).toBe(1)
    expect(proxy.a.y).toBe(0)
    expect(proxy.b).toBe(0)
    expect(proxy.a).toEqual({ x: 1, y: 0 })
    proxy.a = { x: 0, y: 1 }
    expect(proxy.a).toEqual({ x: 1, y: 0 })
    updateAnimation(anim, 0.5)
    expect(proxy.a).toEqual({ x: 0.5, y: 0.5 })
    updateAnimation(anim, 0.5)
    expect(proxy.a).toEqual({ x: 0, y: 1 })
  })

  test("deep proxy", () => {
    const anim = createAnimation(
      {
        pos: newVec2(0, 0),
        size: { radius: 0, width: 0, height: 0 },
        styles: {
          colors: {
            backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
            borderColor: { r: 0, g: 0, b: 0, a: 0 },
          },
          borderWidth: 1,
        },
      },
      getLinearInterp(1)
    )
    const { proxy } = getStateTreeProxy(anim)
    expect(proxy.pos).toEqual({ x: 0, y: 0 })
    expect(proxy.size).toEqual({ radius: 0, width: 0, height: 0 })
    expect(proxy.styles).toEqual({
      colors: {
        backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
        borderColor: { r: 0, g: 0, b: 0, a: 0 },
      },
      borderWidth: 1,
    })
    modifyTo(anim, {
      pos: newVec2(1, 1),
    })
    expect(proxy.pos).toEqual({ x: 0, y: 0 })
    updateAnimation(anim, 0.5)
    expect(proxy.pos).toEqual({ x: 0.5, y: 0.5 })
  })

  test("edge case", () => {
    type ScalarAnim = {
      value: number
    }

    const anim = createAnimation<ScalarAnim>({ value: 1.0 }, NO_INTERP)

    const { proxy } = getStateTreeProxy(anim)

    expect(proxy.value).toBe(1.0)
    modifyTo(anim, { value: 0.0 })
    const { value } = proxy
    expect(proxy.value).toBe(0.0)
    console.log(value)
  })
})
