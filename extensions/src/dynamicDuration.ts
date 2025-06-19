/**
 * Makes the animation speed dynamic based on the distance between the start and end points.
 * @module DynamicDuration
 */

import {
  Extension,
  unmount,
  changeInterpFunction,
  getInterpFunction,
  getLocalState,
  addLocalListener,
  UnknownAnimatable,
  Animation,
  unsubscribe,
  UnknownAnimation,
  Interp,
  NO_INTERP,
  HasChildren,
  Mask,
  perMaskedChild,
} from "aninest"
import { distanceSquaredBetween } from "./snap"

/**
 * The most generic interpolation function that can be used with dynamic speed.
 * It only requires a duration parameter as the first argument to the construction
 * function of the interpolation.
 */
export type InterpWithDuration = (
  duration: number,
  ...params: unknown[]
) => Interp

/**
 * Extension to make the animation duration dynamic based on
 * the distance between the start and end points.
 * @param interp The interpolation function to use.
 * @param speed The speed in units per second.
 * @param params The additional parameters to pass to the interpolation
 * function (after `duration`).
 * @returns
 */
export function dynamicDurationExtension<Animating extends UnknownAnimatable>(
  mask: Partial<Mask<Animating>> = {},
  interp: InterpWithDuration,
  speed: number, // speed in units per second,
  ...params: unknown[]
): Extension<Animating> {
  return (anim: Animation<Animating>) =>
    setRecursiveDynamicDuration(anim, mask, interp, speed, ...params)
}

/**
 * Sets the duration of an animation to be dynamic based on the distance between
 * the start and end points.
 * @param anim
 * @param mask
 * @param interp The interpolation function to use.
 * @param speed The speed in units per second.
 * @param params The additional parameters to pass to the interpolation
 * function (after `duration`).
 * @returns
 */
export function setRecursiveDynamicDuration<
  Animating extends UnknownAnimatable
>(
  anim: Animation<Animating>,
  mask: Partial<Mask<Animating>> = {},
  interp: InterpWithDuration,
  speed: number, // speed in units per second
  ...params: unknown[]
): unmount {
  const unsubscribers: unmount[] = []
  perMaskedChild(anim as HasChildren<number, Animating>, mask, child => {
    unsubscribers.push(
      setLocalDynamicDuration(
        child as UnknownAnimation,
        interp,
        speed,
        ...params
      )
    )
  })
  const localUnsub = setLocalDynamicDuration(anim, interp, speed, ...params)
  unsubscribers.push(localUnsub)
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}

function setLocalDynamicDuration<Animating extends UnknownAnimatable>(
  anim: Animation<Animating>,
  interp: InterpWithDuration,
  speed: number, // speed in units per second
  ...params: unknown[]
): unsubscribe {
  const initialInterp = getInterpFunction(anim)
  const revertInterp = () => {
    changeInterpFunction(anim, initialInterp)
  }
  if (speed === 0) {
    changeInterpFunction(anim, NO_INTERP)
    return () => {
      revertInterp()
    }
  }
  const unsub = addLocalListener(anim, "beforeStart", to => {
    const dist = Math.sqrt(distanceSquaredBetween(to, getLocalState(anim)))
    const dur = dist / speed
    changeInterpFunction(anim, interp(dur, ...params))
  })
  return () => {
    unsub()
    revertInterp()
  }
}
