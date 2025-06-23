/**
 * Provides a momentum glide layer.
 * @module Momentum
 */

import { distanceSquaredBetween } from "."
import {
  UnknownAnimatable,
  Animation,
  Layer,
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
  IMMUTABLE_START,
  SlicedAnimatable,
} from "aninest"
/**
 * @internal
 */
export class RingQueue<T extends UnknownAnimatable> {
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
export function localMomentumLayer<Animating extends UnknownAnimatable>(
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
  /**
   * useful for clearing the recorded states to prevent weird interpolation
   * based on manually setting the state rather than setting it based on a user
   * gesture
   * @returns
   */
  clearRecordedStates: () => void
} {
  let frictionForce: number
  const updateFriction = () => {
    frictionForce =
      (friction * GRAVITY * PIXELS_PER_CM * CM_PER_METER) / pixelsPerUnit
  }
  updateFriction()
  type StampedState = { state: SlicedAnimatable<Animating>; time: number }
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
    changeInterpFunction(anim, oldInterp)
    prevStates.clear()
    inMomentumState = false
  }
  let currentVelocity = 0
  // returns true if the animation is now gliding
  const beforeEnd = (anim: Animation<Animating>): boolean => {
    if (prevStates.length < 2) {
      return false
    }
    let divisor = 0
    const avgVel: { [key: string]: number } = Object.keys(
      prevStates[0].state
    ).reduce((acc, key) => {
      acc[key] = 0
      return acc
    }, {} as { [key: string]: number })
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
      for (const key in curr.state) {
        const currState = curr.state[key]
        const prevState = prev.state[key]
        if (typeof currState !== "number" && typeof prevState !== "number")
          continue
        avgVel[key] +=
          (((currState as number) - (prevState as number)) / dt) * weight
      }
      divisor += weight
    }
    for (let key in avgVel) {
      avgVel[key] /= divisor
    }
    const zeroVec: SlicedAnimatable<Animating> = new Proxy(
      {} as SlicedAnimatable<Animating>,
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
      avgVel as SlicedAnimatable<Animating>,
      zeroVec
    )
    const vel0 = Math.sqrt(distanceSquaredBetween(avgVel, zeroVec))
    currentVelocity = vel0

    console.log("vel0", vel0, distSquared, avgVel, frictionForce)
    if (vel0 < Number.EPSILON) {
      return false
    }
    const duration = vel0 / (2 * frictionForce)
    // add the average to the current state
    const curr = prevStates.getFromQueue(prevStates.length - 1)!

    for (let key in curr.state) {
      if (typeof curr.state[key] !== "number") continue
      ;(curr.state as { [key: string]: number })[key] +=
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
        addLocalListener(anim, IMMUTABLE_START, () => {
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
    clearRecordedStates() {
      prevStates.clear()
    },
  }
}
