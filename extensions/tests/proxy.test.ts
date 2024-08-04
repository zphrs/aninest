import { createAnimation, getLinearInterp, updateAnimation } from "aninest"
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
})
