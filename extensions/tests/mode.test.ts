import {
  addExtensionToStack,
  createAnimation,
  createExtensionStack,
  createMode,
  getLinearInterp,
  getLocalState,
  modifyTo,
  newVec2,
  updateAnimation,
  Vec2,
} from "aninest"
import { distanceLessThan, snapGridExtension, snapPointExtension } from "../src"
test("modes", () => {
  const anim = createAnimation(newVec2(0, 0), getLinearInterp(1))
  const snaps = createExtensionStack<Vec2>()
  addExtensionToStack(snaps, snapGridExtension<Vec2>(newVec2(0.05, 0.05)))
  addExtensionToStack(
    snaps,
    snapPointExtension(newVec2(0, 0), distanceLessThan(0.1))
  )
  const snapMode = createMode(anim, snaps)
  snapMode.on()
  snapMode.toggle(true) // shouldn't do anything

  modifyTo(anim, newVec2(1.01, 1.01))
  updateAnimation(anim, 1)
  expect(getLocalState(anim)).toEqual({ x: 1.01, y: 1.01 })
  updateAnimation(anim, 1)
  expect(getLocalState(anim)).toEqual(newVec2(1, 1))

  snapMode.toggle()

  modifyTo(anim, newVec2(1.01, 1.01))
  const needsUpdate = updateAnimation(anim, 1)
  expect(needsUpdate).toBe(false)
  expect(getLocalState(anim)).toEqual({ x: 1.01, y: 1.01 })
})
