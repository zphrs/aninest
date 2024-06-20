import {
  createAnimation,
  newVec2,
  getLinearInterp,
  setLocalSnapGrid,
  modifyTo,
  updateAnimation,
  getStateTree,
  setSnapPoint,
  distanceLessThan,
  NO_INTERP,
  changeInterpFunction,
} from "../src"

describe("snap", () => {
  test("snap grid", () => {
    const anim = createAnimation({ a: newVec2(0, 0) }, getLinearInterp(1))
    setLocalSnapGrid(anim.children.a, { x: 0.5, y: 0.5 })
    modifyTo(anim, { a: newVec2(0.9, 0.9) })
    let needsUpdate = updateAnimation(anim, 0.6) // should snap now
    expect(needsUpdate).toBe(true)
    needsUpdate = updateAnimation(anim, 0.6) // should snap now
    expect(needsUpdate).toBe(true)
    updateAnimation(anim, 0.6)
    needsUpdate = updateAnimation(anim, 0.6)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
    expect(needsUpdate).toBe(false)
  })
  test("snap grid with no_interp", () => {
    const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
    setLocalSnapGrid(anim.children.a, { x: 0.5, y: 0.5 })
    modifyTo(anim, { a: newVec2(0.9, 0.9) })
    let needsUpdate = updateAnimation(anim, 1) // should snap now
    expect(needsUpdate).toBe(false)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
  test("snap grid with change interp", () => {
    const anim = createAnimation({ a: newVec2(0, 0) }, NO_INTERP)
    setLocalSnapGrid(anim.children.a, { x: 0.5, y: 0.5 })
    modifyTo(anim, { a: newVec2(0.9, 0.9) })
    let needsUpdate = updateAnimation(anim, 0) // should snap now
    expect(needsUpdate).toBe(false)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
    changeInterpFunction(anim.children.a, getLinearInterp(1))
    needsUpdate = updateAnimation(anim, 1)
    expect(needsUpdate).toBe(false)
    expect(getStateTree(anim)).toStrictEqual({ a: { x: 1, y: 1 } })
  })
  test("snap grid with decimal grid", () => {
    const anim = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
    setLocalSnapGrid(anim, { x: 0.1, y: 0.1 })
    modifyTo(anim, newVec2(0.92, 0.92))
    let needsUpdate = updateAnimation(anim, 0.6)
    expect(needsUpdate).toBe(true)
    needsUpdate = updateAnimation(anim, 0.6)
    expect(needsUpdate).toBe(true)
    updateAnimation(anim, 0.6)
    needsUpdate = updateAnimation(anim, 0.6)
    expect(getStateTree(anim)).toStrictEqual({ x: 0.9, y: 0.9 })
    expect(needsUpdate).toBe(false)
  })
  test("snap point", () => {
    const starting = {
      pos: newVec2(0, 0),
      color: { r: 0, g: 0, b: 0 },
    }
    const anim = createAnimation(starting, getLinearInterp(1))
    const dlt = distanceLessThan(0.2)
    const posDlt = (point: typeof starting, s: typeof starting) =>
      dlt(point.pos, s.pos)
    setSnapPoint(
      anim,
      { pos: { x: 0.5, y: 0.5 }, color: { r: 0, g: 1, b: 0 } },
      posDlt
    )

    modifyTo(anim, { pos: newVec2(0.9, 0.9) })
    const update8times = () => {
      for (let i = 0; i < 8; i++) {
        updateAnimation(anim, 0.125)
        console.log(getStateTree(anim))
      }
    }
    update8times()
    expect(getStateTree(anim)).toStrictEqual({
      pos: { x: 0.9, y: 0.9 },
      color: { r: 0, g: 0, b: 0 },
    })
    update8times()
    expect(getStateTree(anim)).toStrictEqual({
      pos: { x: 0.9, y: 0.9 },
      color: { r: 0, g: 0, b: 0 },
    })
    modifyTo(anim, { pos: newVec2(0.6, 0.6) })
    update8times()
    expect(getStateTree(anim)).toStrictEqual({
      pos: { x: 0.6, y: 0.6 },
      color: { r: 0, g: 0, b: 0 },
    })
    // updateAnimation(anim, 0)
    update8times()
    expect(getStateTree(anim)).toStrictEqual({
      pos: { x: 0.5, y: 0.5 },
      color: { r: 0, g: 1, b: 0 },
    })
  })
})
