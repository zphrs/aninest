import { distanceSquaredBetween } from "."
import {
  UnknownRecursiveAnimatable,
  Animation,
  Layer,
  LocalAnimatable,
  getLocalState,
  modifyTo,
  PartialRecursiveAnimatable,
  NO_INTERP,
  changeInterpFunction,
  Interp,
  addLocalListener,
  unsubscribe,
  getInterpFunction,
  getProgress,
  addRecursiveListener,
  INTERRUPT,
  BEFORE_END,
} from "aninest"
/**
 * @internal
 */
class RingQueue<T extends UnknownRecursiveAnimatable> {
  [k: number]: T
  private queue: T[]
  private size: number
  private head: number
  private tail: number
  length = 0
  constructor(size: number) {
    this.queue = new Array(size)
    this.size = size
    this.length = 0
    this.head = 0
    this.tail = 0
    return new Proxy(this, {
      get(target, p, _receiver) {
        const n = Number.parseInt(p.toString())
        if (!Number.isNaN(n) && !(p in target)) {
          return target.getFromQueue(n)
        }
        return Reflect.get(target, p)
      },
      set(target, p, newValue, _receiver) {
        const n = Number.parseInt(p.toString())
        if (!Number.isNaN(n) && !(p in target)) {
          if (n > target.size) {
            return false
          }
          target.queue[(target.head + n) % target.size] = newValue
        }
        return Reflect.set(target, p, newValue)
      },
    })
  }
  /**
   *
   * @param value
   * @returns whether the buffer is full after insertion
   */
  push(value: T): boolean {
    this.queue[this.head] = value
    this.head = (this.head + 1) % this.size
    if (this.head === this.tail) {
      // console.warn('RingQueue is full')
      this.tail = (this.tail + 1) % this.size
      return true
    }
    this.length++
    return false
  }
  getFromQueue(index: number) {
    return this.queue[(this.tail + index) % this.size]
  }
  getNextHead() {
    return this.queue[this.head % this.size]
  }
  clear() {
    this.head = 0
    this.tail = 0
    this.length = 0
  }
}
const PIXELS_PER_INCH = 96
const PIXELS_PER_CM = PIXELS_PER_INCH / 2.54
const CM_PER_METER = 100
const GRAVITY = 9.81
// TODO: add pixelsPerUnit as a config option and allow it to be modified with
// the returned object
export function localMomentumLayer<
  Animating extends UnknownRecursiveAnimatable
>(
  friction: number,
  pixelsPerUnit: number
): Layer<Animating> & {
  startGlide: () => boolean
  changePixelsPerUnit: (newPixelsPerUnit: number) => void
  /**
   *
   * @returns velocity in units/second
   */
  getVelocity: () => number
} {
  let frictionForce: number
  const updateFriction = () => {
    frictionForce =
      (friction * GRAVITY * PIXELS_PER_CM * CM_PER_METER) / pixelsPerUnit
  }
  updateFriction()
  type StampedState = { state: LocalAnimatable<Animating>; time: number }
  let prevStates: RingQueue<StampedState> = new RingQueue(100)

  const onUpdate = (anim: Animation<Animating>, time: number) => {
    if (inMomentumState) {
      return
    }
    time /= 1000
    const nextTail = prevStates.getNextHead()
    const head = prevStates[prevStates.length - 1]
    if (head && Math.abs(time - head.time) < 0.0001) {
      // prevent duplicate states
      return
    }
    if (!nextTail) {
      prevStates.push({ state: getLocalState(anim), time })
      // console.log('pushing', getLocalState(anim), prevStates.length, time)
      return
    }
    getLocalState(anim, nextTail.state)
    nextTail.time = time
    prevStates.push(nextTail)
  }
  let inMomentumState = false
  let oldInterp: Interp = NO_INTERP // NO_INTERP is a placeholder
  const resetOriginalInterp = (anim: Animation<Animating>) => {
    currentVelocity = 0
    console.log("resetting original interp", prevStates.length)
    changeInterpFunction(anim, oldInterp)
    prevStates.clear()
    inMomentumState = false
  }
  let currentVelocity = 0
  // returns true if the animation is now gliding
  const beforeEnd = (anim: Animation<Animating>) => {
    if (prevStates.length < 2) {
      return false
    }
    let divisor = 0
    const avgVel: LocalAnimatable<unknown> = Object.keys(
      prevStates[0].state
    ).reduce((acc, key) => {
      acc[key] = 0
      return acc
    }, {} as LocalAnimatable<unknown>)
    let currTime = prevStates[prevStates.length - 1].time
    for (let i = prevStates.length - 2; i >= 0; i--) {
      let prev = prevStates[i]
      if (currTime - prev.time > 0.1) {
        if (i === prevStates.length - 2) {
          return false
        }
        break
      }
      let curr = prevStates[i + 1]
      const dt = curr.time - prev.time
      const weight = 10 / (i - prevStates.length)
      for (let key in curr.state) {
        avgVel[key] += ((curr.state[key] - prev.state[key]) / dt) * weight
      }
      divisor += weight
    }
    for (let key in avgVel) {
      avgVel[key] /= divisor
    }
    const zeroVec: LocalAnimatable<Animating> = new Proxy(
      {} as LocalAnimatable<Animating>,
      {
        get() {
          return 0
        },
        has() {
          return true
        },
      }
    )

    const distSquared = distanceSquaredBetween(
      avgVel as LocalAnimatable<Animating>,
      zeroVec
    )
    const vel0 = Math.sqrt(distanceSquaredBetween(avgVel, zeroVec))
    currentVelocity = vel0

    console.log("vel0", vel0, distSquared, avgVel, frictionForce)
    if (vel0 < Number.EPSILON) {
      return false
    }
    const duration = vel0 / (2 * frictionForce)
    console.log("duration", duration)
    // add the average to the current state
    const curr = prevStates.getFromQueue(prevStates.length - 1)!

    for (let key in curr.state) {
      ;(curr.state as LocalAnimatable<unknown>)[key] +=
        avgVel[key] * duration +
        Math.sign(avgVel[key]) * 0.5 * frictionForce * duration * duration
    }

    oldInterp = getInterpFunction(anim)
    const interpFunction = (t: number) => {
      if (t >= duration) {
        return undefined
      }
      const p = getProgress(t, duration)
      return 2 * (p - 0.5 * p * p)
    }
    inMomentumState = true
    changeInterpFunction(anim, interpFunction)
    modifyTo(anim, curr.state as PartialRecursiveAnimatable<Animating>)
    prevStates.clear()
    let unsubs: unsubscribe[] = []
    unsubs.push(
      addRecursiveListener(anim, BEFORE_END, () => {
        console.log("before end", prevStates.length)
        unsubs.forEach(unsub => unsub())
        if (inMomentumState) {
          inMomentumState = false
          resetOriginalInterp(anim)
        }
        return true
      })
    )
    unsubs.push(
      addRecursiveListener(anim, INTERRUPT, () => {
        console.log("interrupted", prevStates.length)
        unsubs.forEach(unsub => unsub())
        if (inMomentumState) {
          inMomentumState = false
          resetOriginalInterp(anim)
        }
        return true
      })
    )

    setTimeout(() => {}, 0)
    return true
  }
  let animation: Animation<Animating> | null = null
  return {
    mount: (anim: Animation<Animating>) => {
      animation = anim
      const unsubs: unsubscribe[] = []
      unsubs.push(
        addLocalListener(anim, "update", () => {
          onUpdate(anim, performance.now())
        })
      )
      return () => {
        if (inMomentumState) {
          resetOriginalInterp(anim)
        }
        unsubs.forEach(unsub => unsub())
        animation = null
      }
    },
    // returns true if the animation is now gliding
    startGlide() {
      console.log("starting glide")
      if (!animation) {
        return false
      }
      return beforeEnd(animation)
    },
    changePixelsPerUnit(newPixelsPerUnit: number) {
      pixelsPerUnit = newPixelsPerUnit
      updateFriction()
    },
    getVelocity() {
      return currentVelocity
    },
  }
}
