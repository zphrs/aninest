import {
  addLocalListener,
  clamp,
  Extension,
  LocalAnimatable,
  modifyTo,
  PartialRecursiveAnimatable,
  UnknownRecursiveAnimatable,
} from "aninest"
import { Bounds } from "./bound"
import { getInterpingToProxy } from "./proxy"

export function restrictFromBoundsExtension<
  Animating extends UnknownRecursiveAnimatable
>(bounds: Bounds<LocalAnimatable<Animating>>): Extension<Animating> {
  const keys = new Set(
    Object.keys(bounds.lower || {}).concat(
      Object.keys(bounds.upper || {})
    ) as (keyof Animating)[]
  )
  const restrictExtension = restrictFromFunctionExtension<Animating>(local => {
    const local1 = local as { x: number; y: number }
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

export function restrictFromFunctionExtension<
  Animating extends UnknownRecursiveAnimatable
>(
  restriction: (state: LocalAnimatable<Animating>) => void
): Extension<Animating> {
  const restrictExtension: Extension<Animating> = anim => {
    const local = getInterpingToProxy(anim, true) as LocalAnimatable<Animating>
    const unsub = addLocalListener(anim, "start", () => {
      restriction(local)
    })
    return unsub
  }
  return restrictExtension
}
