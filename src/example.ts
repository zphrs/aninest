import {
  Vec2,
  createAnimation,
  getLocalState,
  getLinearInterp,
  modifyTo,
  updateAnimation,
} from "./index"

type Line = {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
}

export default function createLine(p1: Vec2, p2: Vec2) {
  const animInfo = createAnimation<Line>({ p1, p2 }, getLinearInterp(0.5))
  return {
    getP1(): Vec2 {
      return getLocalState(animInfo.children.p1)
    },
    getP2(): Vec2 {
      return getLocalState(animInfo.children.p2)
    },
    setP1(p1: Vec2) {
      modifyTo(animInfo, { p1 })
    },
    setP2(p2: Vec2) {
      modifyTo(animInfo, { p2 })
    },
    update(dt: number) {
      updateAnimation(animInfo, dt)
    },
  }
}
