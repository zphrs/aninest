/**
 * Makes the animation speed dynamic based on the distance between the start and end points.
 * @module Extensions/DynamicSpeed
 */

import { Extension, unmount } from "."
import { changeInterpFunction } from "../Animatable"
import { addLocalListener } from "../AnimatableEvents"
import {
  UnknownRecursiveAnimatable,
  Animation,
  unsubscribe,
} from "../AnimatableTypes"
import { Interp, NO_INTERP } from "../Interp"
import { distanceSquaredBetween } from "./snap"

export type InterpWithSpeed = (duration: number, ...params: unknown[]) => Interp

/**
 * Extension to make the animation speed dynamic based on
 * the distance between the start and end points.
 * @param interp The interpolation function to use.
 * @param speed The speed in units per second.
 * @param params The additional parameters to pass to the interpolation
 * function (after `duration`).
 * @returns
 */
export function dynamicSpeedExtension<
  Animating extends UnknownRecursiveAnimatable
>(
  interp: InterpWithSpeed,
  speed: number, // speed in units per second
  ...params: unknown[]
): Extension<Animating> {
  return (anim: Animation<Animating>) =>
    setRecursiveDynamicSpeed(anim, interp, speed, ...params)
}

/**
 * Sets the speed of an animation to be dynamic based on the distance between
 * the start and end points.
 * @param anim
 * @param interp The interpolation function to use.
 * @param speed The speed in units per second.
 * @param params The additional parameters to pass to the interpolation
 * function (after `duration`).
 * @returns
 */
export function setRecursiveDynamicSpeed<
  Animating extends UnknownRecursiveAnimatable
>(
  anim: Animation<Animating>,
  interp: InterpWithSpeed,
  speed: number, // speed in units per second
  ...params: unknown[]
): unmount {
  const unsubscribers: unmount[] = []
  for (const childInfo of Object.values(
    anim.children as {
      [s: string]: Animation<UnknownRecursiveAnimatable>
    }
  )) {
    unsubscribers.push(
      setRecursiveDynamicSpeed(childInfo, interp, speed, ...params)
    )
  }
  const localUnsub = setLocalDynamicSpeed(anim, interp, speed, ...params)
  unsubscribers.push(localUnsub)
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}

function setLocalDynamicSpeed<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  interp: InterpWithSpeed,
  speed: number, // speed in units per second
  ...params: unknown[]
): unsubscribe {
  const initialInterp = anim._timingFunction
  const revertInterp = () => {
    changeInterpFunction(anim, initialInterp)
  }
  if (speed === 0) {
    changeInterpFunction(anim, NO_INTERP)
    return () => {
      revertInterp()
    }
  }
  const unsub = addLocalListener(anim, "start", to => {
    const dist = Math.sqrt(distanceSquaredBetween(to, anim._from))
    const dur = dist / speed
    changeInterpFunction(anim, interp(dur, ...params))
  })
  return () => {
    unsub()
    revertInterp()
  }
}
