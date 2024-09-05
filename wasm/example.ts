//@ts-nocheck

import {
  createAnimation,
  getLinearInterp,
  modifyTo,
  updateAnimation,
} from "aninest"

const anim = createAnimation(
  {
    pos: { x: 0, y: 0 },
    radius: 10,
    color: { r: 255, g: 0, b: 0 },
  },
  getLinearInterp(1)
)

modifyTo(anim, {
  pos: { x: 100, y: 100 },
})

const updateLayer = getUpdateLayer()

updateLayer.mount(anim)

updateLayer.subscribe("update", (anim, _time) => {
  const { pos, radius, color } = anim.proxy
  // draw with the above values
})
