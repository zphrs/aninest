# Aninest

Aninest is a zero dependency library for creating nested animatable properties. It is designed to be used with any rendering library or framework. So long as you have an update/draw loop, you can use Aninest to animate your properties.

It is designed primarily for interactive animations, where often animations are interrupted or need to be updated on a variable frame rate. It is also designed to create efficient animations by having one function responsible for calculating the "in betweens", or the values in between the start and the end values. This means
that the browser JS engine will prioritize optimizing this single function, which is called many times per frame, rather than optimizing many different functions, which are called only once per frame.

Lastly, it is designed to be optionally lazy per frame to make the in betweens fast and to store the final value of the property along with whether the animation is finished.

```ts
const animationInfo = createAnimationInfo({ x: 0, y: 0 }, getLinearInterp(1))
const { x, y } = getCurrentStateWithChildren(animInfo.children.x)
```

Here is the project I built Aninest for: [
How Viral Spikes Shape Digital Movements
](https://zphrs.github.io/humn-55-final/)

Here is a simple example on how to create an animated 2D line:

```ts
import {
  Vec2,
  createAnimationInfo,
  getCurrentState,
  getLinearInterp,
  modifyTo,
  updateAnimationInfo,
} from "aninest"

type Line = {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
}

export default function createLine(p1: Vec2, p2: Vec2) {
  const animInfo = createAnimationInfo<Line>({ p1, p2 }, getLinearInterp(0.5))
  return {
    getP1() {
      return getCurrentState(animInfo.children.p1)
    },
    getP2() {
      return getCurrentState(animInfo.children.p2)
    },
    setP1(p1: Vec2) {
      modifyTo(animInfo, { p1 })
    },
    setP2(p2: Vec2) {
      modifyTo(animInfo, { p2 })
    },
    update(dt) {
      updateAnimationInfo(animInfo, dt)
    },
    draw(ctx: CanvasRenderingContext2D) {
      const { p1, p2 } = getCurrentState(animInfo)
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    },
  }
}
```

Typically creating a non-jerky animation is hard. Aninest solves this issue by
only storing the current value of the property when the animation is started and the target property value (set by `modifyTo()`). Then it only computes the current value of the property when `getCurrentState()` or `getCurrentStateWithChildren()` is called.

When an animation is interrupted (by calling `modifyTo()` while the animation is running), the animation will store the current value of the property as the new start value and the new modifyTo value as the end value. This means that the animation will continue from the current value to the new value. While this will
create a sudden change in velocity, the actual property value will remain continuous.

The nice thing about recursive animations is that you can group related properties and subproperties together. This means that you can choose to only calculate certain subproperties on certain frames as needed. You can even make one property animate with a different interpolation function than another. This is useful for creating complex animations with ease.

Here's a slightly more complex example with color, drawing the line to a 2D Canvas Context:

```ts
import {
  Vec2,
  addListener,
  addRecursiveStartListener,
  changeInterpFunction,
  createAnimationInfo,
  getCurrentState,
  getCurrentStateWithChildren,
  getLinearInterp,
  getSlerp,
  modifyTo,
  newVec2,
  removeRecursiveStartListener,
  updateAnimationInfo,
} from "./index"

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
  changeInterpFunction(animInfo.children.color, getLinearInterp(0.5))
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const { p1, p2, color } = getCurrentStateWithChildren(animInfo, {
      color: false,
    })
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
```
