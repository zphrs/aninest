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
  getLocalState,
  getLocalInterpingTo,
  mag,
  addListener,
  subVec,
  AnimationInfo,
  sleep,
} from "./src/index"

type Color = { r: number; g: number; b: number }

type Line = {
  shape: {
    p1: { x: number; y: number }
    p2: { x: number; y: number }
  }
  color: Color
}

const WHITE: Color = { r: 255, g: 255, b: 255 }

export default function createLine(p1: Vec2, p2: Vec2, color: Color = WHITE) {
  // set global interp function to slerp(1s)
  const animInfo = createAnimationInfo<Line>(
    { shape: { p1, p2 }, color },
    getSlerp(1)
  )
  // set interp function of color to linearInterp(0.5)
  changeInterpFunction(animInfo, getLinearInterp(0.5), { shape: false })
  const setColor = (ctx: CanvasRenderingContext2D) => {
    const color = getLocalState(animInfo.children.color)
    ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`
  }
  const drawLine = (ctx: CanvasRenderingContext2D) => {
    const { p1, p2 } = getStateTree(animInfo.children.shape)
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }
  const draw = (ctx: CanvasRenderingContext2D) => {
    setColor(ctx)
    drawLine(ctx)
  }
  const animLoop = (dt: number) => {
    return updateAnimationInfo(animInfo, dt)
  }
  const onPointChange = (animInfo: AnimationInfo<Vec2>) => {
    const oldPt = getLocalInterpingTo(animInfo)
    const newPt: Vec2 = getLocalState(animInfo)
    // subtract the vectors to get the difference
    const diff = Math.max(mag(subVec(newPt, oldPt)), 1)

    const screenMag = mag(newVec2(canvas.width, canvas.height))

    const sinceLastClick = Math.log(
      (performance.now() - lastClicked) / 1000 + 1
    )

    changeInterpFunction(
      animInfo,
      getSlerp(
        Math.min(
          (diff / screenMag) *
            (Math.random() + 0.2) *
            10 *
            Math.max(sinceLastClick, 0.5),
          10
        )
      )
    )
  }
  addListener(animInfo.children.shape.children.p1, "start", () =>
    onPointChange(animInfo.children.shape.children.p1)
  )
  addListener(animInfo.children.shape.children.p2, "start", () =>
    onPointChange(animInfo.children.shape.children.p2)
  )

  return {
    setP1(p1: Vec2) {
      modifyTo(animInfo.children.shape, { p1 })
    },
    setP2(p2: Vec2) {
      modifyTo(animInfo.children.shape, { p2 })
    },
    setColor(color: Color) {
      return modifyTo(animInfo, { color })
    },
    update: animLoop,
    draw: draw,
    addStartListener(listener: () => void) {
      addRecursiveStartListener(animInfo, listener)
    },
    removeStartListener(listener: () => void) {
      removeRecursiveStartListener(animInfo, listener)
    },
  }
}

const increasinglySlower = (x: number) => {
  return Math.min(x, 100_000_000_000)
}

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

type DrawableLine = ReturnType<typeof createLine>
const lines: ReturnType<typeof createLine>[] = []

const randColor = () => {
  const sinceLastClick = (performance.now() - lastClicked) / 1000
  const inv = 1 / (sinceLastClick + 1)
  const brightness = inv * 155
  const randomness = ((1 - inv) * 155 + 100) * Math.random()
  return Math.floor(brightness + randomness)
}

const randomizeLine = async (line: DrawableLine, withTimeout = true) => {
  // wait for a random amount of time
  const canvasMag = mag(newVec2(canvas.width, canvas.height))
  const p1 = newVec2(
    canvas.width * Math.random(),
    canvas.height * Math.random()
  )
  const r = Math.max(canvasMag * 0.1 * Math.exp(-Math.random() * 10), 50)
  // randomize the line
  // toCenterNorm.x += Math.random() * 0.5 - 0.25
  // toCenterNorm.y += Math.random() * 0.5 - 0.25
  // const xOff = toCenterNorm.x * r
  // const yOff = toCenterNorm.y * r
  const theta = Math.random() < 0.5 ? Math.PI / 2 : 0
  const xOff = Math.cos(theta) * r
  const yOff = Math.sin(theta) * r
  line.setP1(p1)
  line.setP2({
    x: p1.x + xOff,
    y: p1.y + yOff,
  })
  line.setColor({
    r: randColor(),
    g: randColor(),
    b: randColor(),
  })
  if (!withTimeout) return
  const sinceLastClick = (performance.now() - lastClicked) / 1000
  setTimeout(
    () => randomizeLine(line),
    increasinglySlower(1000 * Math.random() + 1000) * sinceLastClick +
      1000 * Math.random()
  )
}

const randomizeLines = (withTimeout = true) => {
  const sinceLastClick = (performance.now() - lastClicked) / 1000
  for (let line of lines) {
    setTimeout(
      () => randomizeLine(line, withTimeout),
      increasinglySlower(
        10000 * Math.random() * sinceLastClick + 1000 * sinceLastClick
      )
    )
  }
}

let lastClicked = performance.now()

const onUp = async (e: PointerEvent) => {
  if (downCt != 0) randomizeLines(false)
  downCt = Math.max(0, downCt - 1)
}

let downCt = 0

const onMove = (e: PointerEvent) => {
  if (downCt === 0) return
  const x = e.clientX * devicePixelRatio
  const y = e.clientY * devicePixelRatio
  const p = newVec2(x, y)
  lines.forEach(line => {
    line.setP1(p)
    line.setP2(p)
  })
  lastClicked = performance.now()
}

const onDown = (e: PointerEvent) => {
  downCt++
  onMove(e)
}

const onResize = () => {
  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
  lines.forEach(line => {
    line.draw(ctx)
  })
}
canvas.style.position = "fixed"
canvas.style.top = "0"
canvas.style.left = "0"
canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"
canvas.style.overflow = "hidden"
canvas.style.touchAction = "none"
onResize()
window.addEventListener("resize", onResize)
// also call when the device is rotated or the pixel ratio changes
window.addEventListener("orientationchange", onResize)
window.addEventListener("devicePixelRatio", onResize)

canvas.addEventListener("pointerup", onUp)
canvas.addEventListener("pointerleave", onUp)
canvas.addEventListener("pointerdown", onDown)
canvas.addEventListener("pointermove", onMove)
// get the canvas magnitudes
const canvasMag = mag(newVec2(canvas.width, canvas.height))
for (let i = 0; i < canvasMag * 2; i++) {
  const canvasCenter = newVec2(canvas.width / 2, canvas.height / 2)
  lines.push(createLine(canvasCenter, canvasCenter))
}

// even though the interval in between each refresh is randomized
// the animation always moves smoothly regardless
randomizeLines()

let lastTime: number | undefined = undefined
let running = false
const animLoop = (time: number) => {
  const dt = lastTime ? (time - lastTime) / 1000 : 0
  lastTime = time
  let updateAgain = lines.reduce((needsUpdate, line) => {
    return line.update(dt) || needsUpdate
  }, false)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  lines.forEach(line => line.draw(ctx))
  if (updateAgain) requestAnimationFrame(animLoop)
  else {
    lastTime = undefined
    running = false
  }
}

animLoop(0)

for (let line of lines) {
  line.addStartListener(() => {
    if (running) return
    console.log("resuming")
    running = true
    lastTime = performance.now()
    requestAnimationFrame(animLoop)
  })
}
