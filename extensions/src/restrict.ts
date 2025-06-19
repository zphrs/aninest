/**
 * Restricts the animation to predetermined states. Similar to `snap` but
 * it restricts the animation before it starts animating rather than after it's
 * done animating.
 * @module Restrict
 */

import {
  addLocalListener,
  clamp,
  Extension,
  SlicedAnimatable,
  UnknownAnimatable,
} from "aninest"
import { Bounds } from "./bound"
import { getLocalInterpingToProxy } from "./proxy"

export function restrictFromBoundsExtension<
  Animating extends UnknownAnimatable
>(bounds: Bounds<SlicedAnimatable<Animating>>): Extension<Animating> {
  const keys = new Set(
    Object.keys(bounds.lower || {}).concat(
      Object.keys(bounds.upper || {})
    ) as (keyof Animating)[]
  )
  const restrictExtension = restrictFromFunctionExtension<Animating>(local => {
    for (const k in keys) {
      const key = k as keyof Animating
      const value = local[key] as number
      const left = bounds.lower?.[key] as number | undefined
      const right = bounds.upper?.[key] as number | undefined
      local[key] = clamp(left, value, right) as (typeof local)[typeof key]
    }
  })
  return restrictExtension
}

/**
 *
 * @param restriction A function which takes in a proxy to the local animation state
 * which you can directly set to in order to collapse the allowed state of the
 * animation.
 * @example
function restrictToWholeNumbersExtension() {
  return restrictFromFunctionExtension(local => {
    for (const key in local) local[key] = Math.round(local[key])
  })
}
  * @returns an extension which calls the restriction function 
 */
export function restrictFromFunctionExtension<
  Animating extends UnknownAnimatable
>(
  restriction: (state: SlicedAnimatable<Animating>) => void
): Extension<Animating> {
  const restrictExtension: Extension<Animating> = anim => {
    const local = getLocalInterpingToProxy(
      anim,
      true
    ) as SlicedAnimatable<Animating>
    const unsub = addLocalListener(anim, "start", () => {
      restriction(local)
    })
    return unsub
  }
  return restrictExtension
}
