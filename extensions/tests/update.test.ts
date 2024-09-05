import { createAnimation, getLinearInterp, modifyTo } from "aninest"
import { getUpdateLayer } from "../src"

describe("update unnested", () => {
  let time = 0
  const updateLayer = getUpdateLayer(callback => {
    time += 500
    callback(time)
  })
  test("one anim", () => {
    const anim = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    const unmount = updateLayer.mount(anim)
    let updateCount = 0
    const unsub1 = updateLayer.subscribe("update", _anim => {
      updateCount++
    })
    const unsub2 = updateLayer.subscribe("end", () => {
      expect(updateCount).toBe(2)
      unmount()
      unsub1()
      unsub2()
    })
    modifyTo(anim, { x: 1, y: 1 })
  })
  test("two anims", () => {
    const anims = [
      createAnimation({ a: 0, b: 0 }, getLinearInterp(1)),
      createAnimation({ c: 0, d: 0 }, getLinearInterp(1)),
    ] as const
    const unmounts = anims.map(anim => updateLayer.mount(anim))
    let count = 0
    const unsub1 = updateLayer.subscribe("end", () => {
      count++
      if (count === 2) {
        expect(updateCount).toBe(3)
        unmounts.forEach(unmount => unmount())
        unsub1()
        unsub2()
      }
    })
    let updateCount = 0
    const unsub2 = updateLayer.subscribe("update", _anim => {
      updateCount++
    })
    modifyTo(anims[0], { a: 1, b: 1 })
    modifyTo(anims[1], { c: 1, d: 1 })
  })
})

describe("update nested", () => {
  let time = 0
  const requestUpdate = (callback: (time: number) => void) => {
    time += 500
    callback(time)
  }
  const updateLayer = getUpdateLayer(requestUpdate)
  test("one layer", () => {
    const layerOne = getUpdateLayer(requestUpdate)
    layerOne.setParent(updateLayer)
    const anim1 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    layerOne.mount(anim1)
    modifyTo(anim1, { x: 1, y: 1 })
    let updateCount = 0
    const unsub1 = layerOne.subscribe("update", _anim => {
      updateCount++
    })
    let parentUpdateCount = 0
    const unsub2 = updateLayer.subscribe("update", _anim => {
      parentUpdateCount++
    })
    const unsub3 = layerOne.subscribe("end", () => {
      expect(updateCount).toBe(2)
      expect(parentUpdateCount).toBe(2)
      unsub1()
      unsub2()
      unsub3()
    })
  })
  test("two layers", () => {
    const layerOne = getUpdateLayer(requestUpdate)
    layerOne.setParent(updateLayer)
    const layerTwo = getUpdateLayer(requestUpdate)
    layerTwo.setParent(layerOne)
    const anim1 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    const anim2 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    layerOne.mount(anim1)
    layerTwo.mount(anim2)
    modifyTo(anim1, { x: 1, y: 1 })
    modifyTo(anim2, { x: 1, y: 1 })
    let updateCount = 0
    const unsub1 = layerOne.subscribe("update", _anim => {
      updateCount++
    })
    let parentUpdateCount = 0
    const unsub2 = updateLayer.subscribe("update", _anim => {
      parentUpdateCount++
    })
    const unsub3 = layerOne.subscribe("end", () => {
      expect(updateCount).toBe(2)
      expect(parentUpdateCount).toBe(2)
      unsub1()
      unsub2()
      unsub3()
    })
  })
  test("unsub from parent", () => {
    const layerOne = getUpdateLayer(requestUpdate)
    let orphan = layerOne.setParent(updateLayer)
    const anim1 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    layerOne.mount(anim1)
    modifyTo(anim1, { x: 1, y: 1 })
    let updateCount = 0
    const unsub1 = layerOne.subscribe("update", _anim => {
      updateCount++
      if (updateCount == 1) {
        orphan()
      }
    })
    const unsub2 = updateLayer.subscribe("end", () => {
      expect(updateCount).toBe(2)
      unsub1()
      unsub2()
    })
  })
})
