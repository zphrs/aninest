**@plexigraph/aninest** • Readme \| [API](globals.md)

***

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
only storing the current value of the property when the animation is started and the new target value (set by `modifyTo(animationInfo, targetValue)`). Then it only computes the current value of the property when `getCurrentState()` or `getCurrentStateWithChildren()` is called.

When an animation is interrupted (by calling `modifyTo()` while the animation is running), the animation will store the current value of the property as the new start value and the new modifyTo value as the end value. This means that the animation will continue from the current value to the new value. While this will
create a sudden change in velocity, the actual property value will remain continuous.

The nice thing about recursive animations is that you can group related properties and subproperties together. This means that you can choose to only calculate certain subproperties on certain frames as needed. You can even make one property animate with a different interpolation function than another. This is useful for creating complex animations with ease.

Here's a slightly more complex example with color, drawing the line to a 2D Canvas Context:
