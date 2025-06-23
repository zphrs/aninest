/**
 * Adds bounds to an animation to ensure an animation
 * will end within the given bounds.
 * @module Bound
 */

import {
  Layer,
  clamp,
  addLocalListener,
  BEFORE_END,
  UnknownAnimatable,
  PartialRecursiveAnimatable,
  SlicedAnimatable,
  Animation,
  unsubscribe,
  Animatable,
  UnknownAnimation,
  applyDictTo,
  modifyTo,
  getLocalState,
  Mask,
  separateChildren,
} from "aninest"
import { supportAbortSignalOption } from "./abortSignal"

/**
   * The bounds of the animation. The animation will be loosely clamped to these bounds.
   * @internal
   * @example
  // Assuming the animation is of type {a: Vec2, b: Vec2}:
  const bounds: Bounds<PartialRecursiveAnimatable<unknown>> = {
    lower: { a: {x: 0, y: 0}, b: {x: 0} },
    upper: { a: {x: 1, y: 1} }
  } // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
   */
export type FullBounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

/**
 * The partial bounds of the animation, making the upper and lower bound dictionaries optional.
 * Note that for {@link FullBounds} both the upper and lower objects are required to be within the 
 * Bounds object, although both can simply be an empty object.
 * @see {@link FullBounds} for the full bounds type and for further explanation of the bounds.
 * @internal
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
} // Note that there is no upper bounds object
 */
export type PartialFullBounds<T> = Partial<FullBounds<T>>
/**
 * The bounds of the animation, which means that all values within
 * the bounds are optional, including the the `upper` and `lower` objects.
 * The animation will be loosely clamped to these bounds.
 * @see {@link setupBoundsLayer} for how to apply bounds to an animation.
 * @example
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds: PartialRecursiveBounds<{a: Vec2, b: Vec2}> = {
  lower: { a: {x: 0, y: 0}, b: {x: 0} },
  upper: { a: {x: 1, y: 1} }
} // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
 */
export type Bounds<Animating extends UnknownAnimatable> = PartialFullBounds<
  PartialRecursiveAnimatable<Animating>
>

/**
 * Sets up a bounds layer for an animation.
 * Allows for the animation's bounds to be dynamically changed.
 * @example
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
const bounds = {
    lower: { a: 0, b: 0 },
    upper: { a: 1, b: 1 }
}
const {unsub, updateBounds} = initializeBounds(anim, bounds)
updateBounds({lower: {a: 0.5}})
 * @param anim 
 * @param bounds 
 * @returns 
 */
export function setupBoundsLayer<Animating extends UnknownAnimatable>(
  anim: Animation<Animating>,
  bounds: Bounds<Animating>,
  mask: Partial<Mask<Animating>> = {}
): BoundsLayer<Animating> {
  const splitBounds = (bounds: Bounds<Animating>) => {
    const { upper: upperBounds, lower: lowerBounds } = bounds
    return [
      ...separateChildren(
        upperBounds || ({} as PartialRecursiveAnimatable<Animating>)
      ),
      ...separateChildren(
        lowerBounds || ({} as PartialRecursiveAnimatable<Animating>)
      ),
    ]
  }
  const [
    upperBoundsAnim,
    upperBoundsChildren,
    lowerBoundsAnim,
    lowerBoundsChildren,
  ] = splitBounds(bounds)
  const localBounds: FullBounds<SlicedAnimatable<Animating>> = {
    upper: {},
    lower: {},
  }
  applyDictTo(localBounds.lower, lowerBoundsAnim)
  applyDictTo(localBounds.upper, upperBoundsAnim)
  const childMap: {
    [key in keyof Animating]?: BoundsLayer<Animatable<Animating[key]>>
  } = {}
  for (const [k, c] of Object.entries(anim.children)) {
    if (mask[k as keyof Animating] === false) continue
    const key: keyof Animating = k as keyof Animating
    const childBounds = {
      upper: upperBoundsChildren[key],
      lower: lowerBoundsChildren[key],
    } as PartialFullBounds<PartialRecursiveAnimatable<unknown>>
    if (!childBounds.upper && !childBounds.lower) continue
    const child = c as UnknownAnimation
    const maskKey = mask[key] !== true && mask[key] ? mask[key] : {}
    childMap[key] = setupBoundsLayer<UnknownAnimatable>(
      child,
      childBounds,
      maskKey as Partial<Mask<UnknownAnimatable>>
    ) as BoundsLayer<Animatable<Animating[keyof Animating]>>
  }
  const checkLocalBounds = (localTo: Partial<SlicedAnimatable<Animating>>) => {
    const modified: typeof localTo = {}
    for (const key in localTo) {
      const localKey = key as keyof Animating
      const localVal = localTo[localKey] as number
      const lowerBound = localBounds.lower[localKey]
      const upperBound = localBounds.upper[localKey]
      if (typeof lowerBound != "number" || typeof upperBound != "number") return

      const newVal = clamp(
        lowerBound,
        localVal,
        upperBound
      ) as SlicedAnimatable<Animating>[keyof Animating]
      if (newVal != localVal) {
        modified[localKey] = newVal
      }
    }
    modifyTo(anim, modified as PartialRecursiveAnimatable<Animating>)
  }
  let unsubs = new Set<unsubscribe>()
  const mount = (anim: Animation<Animating>) => {
    const localUnsub = addLocalListener(anim, BEFORE_END, checkLocalBounds)
    unsubs.add(localUnsub)
    checkLocalBounds(getLocalState(anim))

    for (const [k, c] of Object.entries(childMap)) {
      const key = k as keyof Animating
      const child = c as BoundsLayer<Animatable<Animating[typeof key]>>
      const animChild = anim.children[key] as Animation<
        Animatable<Animating[typeof key]>
      >
      const childUnsub = child.mount(animChild)
      unsubs.add(childUnsub)
    }

    return () => {
      unsubs.forEach(unsub => unsub())
      unsubs.clear()
    }
  }
  return {
    mount: supportAbortSignalOption(mount),
    update: (
      bounds: PartialFullBounds<PartialRecursiveAnimatable<Animating>>
    ) => {
      const [
        upperBoundsAnim,
        upperBoundsChildren,
        lowerBoundsAnim,
        lowerBoundsChildren,
      ] = splitBounds(bounds)
      applyDictTo(localBounds.lower, lowerBoundsAnim)
      applyDictTo(localBounds.upper, upperBoundsAnim)
      checkLocalBounds(getLocalState(anim))
      for (const [k, c] of Object.entries(anim.children)) {
        const key = k as keyof Animating
        const child = c as Animation<Animatable<Animating[typeof key]>>
        const childBounds = {
          upper: upperBoundsChildren[key],
          lower: lowerBoundsChildren[key],
        } as PartialFullBounds<PartialRecursiveAnimatable<unknown>>
        if (!childMap[key]) {
          const { mount } = (childMap[key] = setupBoundsLayer<
            Animatable<Animating[typeof key]>
          >(child, childBounds))
          const unsub = mount(child)
          unsubs.add(unsub)
        }
        const { update } = childMap[key]!
        update(childBounds)
      }
    },
  }
}

/**
 * A layer used to enforce minimum and maximum bounds on an animation.
 * @see {@link setupBoundsLayer} for how to create a BoundsLayer.
 */
export type BoundsLayer<Animating extends UnknownAnimatable> = {
  /**
   * Updates and overrides the previously set bounds, similar to how `modifyTo` works.
   * A bound updated with this function will apply immediately rather than waiting for
   * the animation to end before snapping the state to be within the bound.
   * @param bounds
   * @returns
   */
  update: (
    bounds: PartialFullBounds<PartialRecursiveAnimatable<Animating>>
  ) => void | undefined
} & Layer<Animating>
