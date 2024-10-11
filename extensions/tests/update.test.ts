import {
  createAnimation,
  getLinearInterp,
  getLocalState,
  modifyTo,
} from "aninest"
import { getUpdateLayer, milliseconds } from "../src"

describe("update nested", () => {
  let time = 0
  const requestUpdate = (callback: (time: number) => void) => {
    time += 500
    callback(time)
  }
  const updateLayer = getUpdateLayer(requestUpdate)
  test("one layer", finish => {
    const layerOne = getUpdateLayer(requestUpdate)
    layerOne.setParent(updateLayer)
    const anim1 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    layerOne.mount(anim1)
    let updateCount = 0
    const unsub1 = layerOne.subscribe("updateWithDeltaTime", _dt => {
      updateCount++
    })
    let parentUpdateCount = 0
    const unsub2 = updateLayer.subscribe("updateWithDeltaTime", _dt => {
      parentUpdateCount++
    })
    const unsub3 = layerOne.subscribe("end", () => {
      expect(updateCount).toBe(3)
      expect(parentUpdateCount).toBe(3)
      unsub1()
      unsub2()
      unsub3()
      finish()
    })
    modifyTo(anim1, { x: 1, y: 1 })
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

describe("update with many children", () => {
  let time = 0
  const requestUpdate = (callback: (time: number) => void) => {
    time += 500
    callback(time)
  }
  const mainLayer = getUpdateLayer(requestUpdate)
  const l1 = getUpdateLayer(requestUpdate)
  l1.setParent(mainLayer)
  const l2 = getUpdateLayer(requestUpdate)
  l2.setParent(mainLayer)
  // const l3 = getUpdateLayer(requestUpdate)
  // l3.setParent(mainLayer)
  test("l1", done => {
    const anim1 = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    const unsub2 = l1.mount(anim1)
    mainLayer.subscribe("childEnd", () => {
      expect(getLocalState(anim1)).toEqual({ x: 1, y: 1 })
      unsub2()
      done()
    })
    modifyTo(anim1, { x: 1, y: 1 })
  })
})

describe("update with subchild", () => {
  let time = 0
  const requestUpdate = (callback: (time: milliseconds) => void) => {
    time += 500
    callback(time)
  }
  const mainLayer = getUpdateLayer(requestUpdate)
  const child = getUpdateLayer(requestUpdate)
  child.setParent(mainLayer)
  const subchild = getUpdateLayer(requestUpdate)
  subchild.setParent(child)
  test("update subchild", done => {
    const anim = createAnimation({ x: 0 }, getLinearInterp(1))
    subchild.mount(anim)
    subchild.subscribe("end", () => {
      expect(getLocalState(anim)).toEqual({ x: 1 })
      done()
    })
    subchild.subscribe("start", () => console.log("started"))
    modifyTo(anim, { x: 1 })
  })
})

describe("update with sub subchild", () => {
  let time = 0
  const requestUpdate = (callback: (time: milliseconds) => void) => {
    time += 500
    callback(time)
  }
  const mainLayer = getUpdateLayer(requestUpdate)
  const child = getUpdateLayer(requestUpdate)
  child.setParent(mainLayer)
  const subchild = getUpdateLayer(requestUpdate)
  subchild.setParent(child)
  const subSubchild = getUpdateLayer(requestUpdate)
  subSubchild.setParent(subchild)
  test("update sub subchild", done => {
    const anim = createAnimation({ x: 0 }, getLinearInterp(1))
    subSubchild.mount(anim)
    subSubchild.subscribe("end", () => {
      expect(getLocalState(anim)).toEqual({ x: 1 })
      done()
    })
    subSubchild.subscribe("start", () => console.log("started"))
    modifyTo(anim, { x: 1 })
  })
})
