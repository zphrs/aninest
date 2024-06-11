# Aninest

Aninest is a zero dependency library for creating nested animatable properties. It is designed to be used with any rendering library or framework. So long as you have an update/draw loop, you can use Aninest to animate your properties.

## Made for Interactivity

It is designed primarily for interactive animations, where often animations are interrupted or need to be updated with a variable frame rate due to sudden compute spikes triggered by input events.

## Speed

It is generally quite fast by having one set of functions (`updateAnimation()` and `getStateTree()`) responsible for calculating the "in betweens", or the values in between the start and the destination values. This means that the JS engine will prioritize optimizing this single function.

## Destructuring

New ES6 destructuring syntax creates a great developer experience when using Aninest. For example, you can destructure the current state of an animation like this:

```ts
const anim = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
const { x, y } = getStateTree(anim)
```

## Why I made Aninest

Here is the project I built up alongside Aninest: [How Viral Spikes Shape Digital Movements](https://zphrs.github.io/humn-55-final/)

I generally couldn't find a library that had the flexibility and simplicity I wanted for letting me dynamically run the update/draw loop only when necessary and which made it easy to change the position of objects without too much thought.

### Flexibility

Often animation libraries take care of the update and draw loop for you which is annoying when trying to ensure the animation only rerenders when necessary.

### Simplicity

I wanted to be able to animate any level of nested properties just by passing in a nested JS Object filled with numbers and nested JS Objects (such as `{size: 10, pos: {x: 0, y: 0}}`). Lastly, I wanted all animations to be smoothly interruptible to make the animations feel natural and responsive (no jittering around by default).

## Line Example

Here is a simple example on how to create an animated 2D line and draw it to a canvas. This example uses the `CanvasRenderingContext2D` API, but Aninest can be used with any rendering library or framework. I personally have only used it so far with THREE.js and the 2D canvas, but I designed it with strong interoperability in mind, knowing that once WebGPU reaches widespread support I will want to move some of my projects to it.

```ts
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
    },
    update(dt) {
      return updateAnimation(anim, dt)
    },
    addResumeListener(listener: Listener<undefined>) {
      addRecursiveListener(anim, "start", listener)
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
// draw loop
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
```

# Internal Design

Typically creating a non-jerky animation is hard. Aninest solves this issue by only asking for the new target position, not allowing the user to set the start position. It stores the current value of the property when a new animation is triggered by `modifyTo(animationInfo, targetValue)`. Then it only fully computes the current value of the property when `getLocalState()` or `getStateTree()` is called.

When an animation is interrupted (by calling `modifyTo()` while the animation is running), the animation will save the current state as the start state. This means that the animation will continue from the current value to the value set by the `modifyTo()` call. While this might create a sudden change in velocity, all property values will remain continuous.
