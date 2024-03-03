import {
  Vec2,
  addRecursiveStartListener,
  changeInterpFunction,
  createAnimationInfo,
  getStateTree,
  getLinearInterp,
  getSlerp,
  modifyTo,
  newVec2,
  removeRecursiveStartListener,
  updateAnimationInfo,
} from "./src/index"

type Color = { r: number; g: number; b: number }

type Line = {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
  color: { r: number; g: number; b: number }
}

const BLACK: Color = { r: 0, g: 0, b: 0 }

export default function createLine(
  p1: Vec2,
  p2: Vec2,
  ctx: CanvasRenderingContext2D,
  color: Color = BLACK
) {
  // set global interp function to slerp(1s)
  const animInfo = createAnimationInfo<Line>({ p1, p2, color }, getSlerp(1))
  // set interp function of color to linearInterp(0.5)
  changeInterpFunction(animInfo, getLinearInterp(0.5), { p1: false, p2: false })
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const { p1, p2, color } = getStateTree(animInfo)
    ctx.save()
    ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
    ctx.restore()
  }
  let lastTime: number = performance.now()
  let playing = false
  const animLoop = (time: number) => {
    const dt = time - lastTime
    lastTime = time
    const updateAgain = updateAnimationInfo(animInfo, dt / 1000)
    draw(ctx)
    if (updateAgain) requestAnimationFrame(animLoop)
    else playing = false
  }
  const onStart = () => {
    if (playing) return
    playing = true
    lastTime = performance.now()
    console.log("restarting")
    requestAnimationFrame(animLoop)
  }
  addRecursiveStartListener(animInfo, onStart)
  return {
    setP1(p1: Vec2) {
      modifyTo(animInfo, { p1 })
    },
    setP2(p2: Vec2) {
      modifyTo(animInfo, { p2 })
    },
    setColor(color: Color) {
      return modifyTo(animInfo, { color })
    },
    destroy() {
      removeRecursiveStartListener(animInfo, onStart)
    },
  }
}

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const line = createLine(newVec2(0, 0), newVec2(100, 100), ctx)

const randPos = () =>
  newVec2(Math.random() * canvas.width, Math.random() * canvas.height)

const randColor = () => Math.floor(Math.random() * 255)

const randomizeLine = () => {
  line.setP1(randPos())
  line.setP2(randPos())
  line.setColor({
    r: randColor(),
    g: randColor(),
    b: randColor(),
  })
  setTimeout(randomizeLine, 2000 * Math.random())
}
// even though the interval in between each refresh is randomized
// the animation always moves smoothly regardless
setTimeout(randomizeLine, 2000 * Math.random())
