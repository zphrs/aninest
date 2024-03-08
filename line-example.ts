import {
  createAnimation,
  getLinearInterp,
  modifyTo,
  updateAnimation,
  addRecursiveStartListener,
  getStateTree,
  Listener,
  Vec2,
  getSlerp,
} from "./src"

// Vec2 = { x: number, y: number }
type Line = {
  p1: Vec2
  p2: Vec2
}

export default function createLine(p1: Vec2, p2: Vec2) {
  const anim = createAnimation<Line>({ p1, p2 }, getSlerp(1))
  return {
    setP1(p1: Vec2) {
      // either way is acceptable
      modifyTo(anim.children.p1, p1)
    },
    setP2(p2: Vec2) {
      // either way is acceptable
      modifyTo(anim, { p2 })
      // technically this one is slightly slower because
      // it introduces one extra recursive call
      // but this path is run about 1/30th of the time
      // so just use the one that you prefer
    },
    update(dt) {
      return updateAnimation(anim, dt)
    },
    addResumeListener(listener: Listener<undefined>) {
      addRecursiveStartListener(anim, listener)
    },
    draw(ctx: CanvasRenderingContext2D) {
      const { p1, p2 } = getStateTree(anim)
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    },
  }
}
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")!
document.body.appendChild(canvas)
const line = createLine({ x: 0, y: 0 }, { x: 100, y: 100 })
let lastTime: number | undefined = undefined
function draw(time: number) {
  const dt = lastTime ? time - lastTime : 0
  const needsUpdate = line.update(dt / 1000)
  lastTime = time
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  line.draw(ctx)
  if (needsUpdate) requestAnimationFrame(draw)
  else lastTime = undefined
}
line.addResumeListener(() => {
  requestAnimationFrame(draw)
})

// randomize line every 2 seconds
function randomize() {
  const getRandomPos = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  })
  line.setP1(getRandomPos())
  line.setP2(getRandomPos())
  setTimeout(randomize, Math.random() * 2000)
}
randomize()
