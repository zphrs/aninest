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
  getInterpingToWithChildren,
  mag,
  addListener,
  subVec,
  AnimationInfo,
  getInterpingTo,
  sleep,
  addVec,
  normalize,
  mulScalar,
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
    const oldPt = getInterpingTo(animInfo)
    const newPt: Vec2 = getLocalState(animInfo)
    // subtract the vectors to get the difference
    const diff = Math.max(mag(subVec(newPt, oldPt)), 1)

    const screenMag = mag(newVec2(canvas.width, canvas.height))

    changeInterpFunction(animInfo, getSlerp((diff / screenMag) * 10))
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
  return Math.exp(-Math.random() / x) * x
}

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

type DrawableLine = ReturnType<typeof createLine>
const lines: ReturnType<typeof createLine>[] = []

const randColor = () => Math.floor(Math.random() * 200 + 50)

const randomizeLine = async (
  line: DrawableLine,
  center: Vec2 = newVec2(canvas.width / 2, canvas.height / 2)
) => {
  // wait for a random amount of time
  const canvasMag = mag(newVec2(canvas.width, canvas.height))
  // get random position within a 100px radius of p1
  const r1 = canvasMag * (2 / 3) * Math.exp(-Math.random() * (3 / 2))
  const theta1 = Math.random() * Math.PI * 2
  const x1 = Math.cos(theta1) * r1
  const y1 = Math.sin(theta1) * r1
  const offset = newVec2(x1, y1)
  const p1 = addVec(center, offset)
  const r = canvasMag * 0.1 * Math.exp(-Math.random() * 10)
  const toCenter = subVec(center, p1)
  const toCenterNorm = normalize(toCenter)
  // add a random amount of noise to toCenterNorm
  toCenterNorm.x += (Math.random() - 0.5) * 0.5
  toCenterNorm.y += (Math.random() - 0.5) * 0.5
  const xOff = toCenterNorm.x * r
  const yOff = toCenterNorm.y * r
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
  setTimeout(
    () => randomizeLine(line),
    increasinglySlower(10000 * Math.random())
  )
}

const randomizeLines = () => {
  for (let line of lines) {
    setTimeout(
      () => randomizeLine(line),
      increasinglySlower(10000 * Math.random())
    )
  }
}

const onUp = async e => {
  downCt = Math.max(0, downCt - 1)
  for (let line of lines) {
    const mouse = newVec2(e.clientX, e.clientY)
    const toScreen = mulScalar(mouse, devicePixelRatio)
    randomizeLine(line, toScreen)
  }
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
canvas.style.width = "100%"
canvas.style.height = "100%"
onResize()
window.addEventListener("resize", onResize)

canvas.addEventListener("pointerup", onUp)
canvas.addEventListener("pointerdown", onDown)
canvas.addEventListener("pointermove", onMove)
for (let i = 0; i < 10000; i++) {
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

for (let line of lines) {
  line.addStartListener(() => {
    if (running) return
    console.log("resuming")
    running = true
    lastTime = performance.now()
    requestAnimationFrame(animLoop)
  })
}
