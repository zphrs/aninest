/**
 * Adds bounds to an animation to ensure an animation
 * will end within the given bounds.
 * @module Extensions/Bound
 */

import { Layer } from "."
import { clamp } from "../../Utils"
import { applyDictTo, modifyTo, getLocalState } from "../Animatable"
import { addLocalListener, BEFORE_END } from "../AnimatableEvents"
import {
  UnknownRecursiveAnimatable,
  PartialRecursiveAnimatable,
  LocalAnimatable,
  Animation,
  unsubscribe,
  RecursiveAnimatable,
} from "../AnimatableTypes"
import { separateChildren } from "../RecursiveHelpers"

/**
   * The bounds of the animation. The animation will be loosely clamped to these bounds.
   * @group Bounds
   * @example
  // Assuming the animation is of type {a: Vec2, b: Vec2}:
  const bounds = {
    lower: { a: {x: 0, y: 0}, b: {x: 0} },
    upper: { a: {x: 1, y: 1} }
  } // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
   */
export type Bounds<T> = {
  lower: Partial<T>
  upper: Partial<T>
}

/**
     * The partial bounds of the animation, making the lower and upper bounds optional.
     * @group Bounds
     * @see {@link Bounds} for the full bounds type and for further explanation of the bounds.
     * @example
    // Assuming the animation is of type {a: Vec2, b: Vec2}:
    const bounds = {
      lower: { a: {x: 0, y: 0}, b: {x: 0} },
    } // Note that there are no upper bounds
     */
export type PartialBounds<T> = Partial<Bounds<T>>
type PartialRecursiveBounds<Animating extends UnknownRecursiveAnimatable> =
  PartialBounds<PartialRecursiveAnimatable<Animating>>

/**
 *  
 * @param anim 
 * @param bounds 
 * @returns 
 * @example
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
const bounds = {
    lower: { a: 0, b: 0 },
    upper: { a: 1, b: 1 }
}
const {unsub, updateBounds} = initializeBounds(anim, bounds)
updateBounds({lower: {a: 0.5}})
 */
export function setupBoundsLayer<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  bounds: PartialRecursiveBounds<Animating>
): BoundsLayer<Animating> {
  const splitBounds = (bounds: PartialRecursiveBounds<Animating>) => {
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
  const localBounds: Bounds<LocalAnimatable<Animating>> = {
    upper: {},
    lower: {},
  }
  applyDictTo(localBounds.lower, lowerBoundsAnim)
  applyDictTo(localBounds.upper, upperBoundsAnim)
  const childMap: {
    [key in keyof Animating]?: BoundsLayer<RecursiveAnimatable<Animating[key]>>
  } = {}
  for (const [k, c] of Object.entries(anim.children)) {
    const key: keyof Animating = k as keyof Animating
    const childBounds = {
      upper: upperBoundsChildren[key],
      lower: lowerBoundsChildren[key],
    } as PartialBounds<PartialRecursiveAnimatable<unknown>>
    if (!childBounds.upper && !childBounds.lower) continue
    const child = c as Animation<RecursiveAnimatable<Animating[typeof key]>>
    childMap[key] = setupBoundsLayer<
      RecursiveAnimatable<Animating[typeof key]>
    >(child, childBounds)
  }
  const checkLocalBounds = (localTo: Partial<LocalAnimatable<Animating>>) => {
    const modified: typeof localTo = {}
    for (const key in localTo) {
      const localKey = key as keyof Animating
      const localVal = localTo[localKey] as number
      const lowerBound = localBounds.lower[localKey]
      const upperBound = localBounds.upper[localKey]

      const newVal = clamp(
        lowerBound,
        localVal,
        upperBound
      ) as LocalAnimatable<Animating>[keyof Animating]
      if (newVal != localVal) {
        modified[localKey] = newVal
      }
    }
    modifyTo(anim, modified as PartialRecursiveAnimatable<Animating>)
  }
  checkLocalBounds(getLocalState(anim))
  let unsubs = new Set<unsubscribe>()
  return {
    mount: anim => {
      const localUnsub = addLocalListener(anim, BEFORE_END, checkLocalBounds)
      unsubs.add(localUnsub)

      for (const [k, c] of Object.entries(childMap)) {
        const key = k as keyof Animating
        const child = c as BoundsLayer<
          RecursiveAnimatable<Animating[typeof key]>
        >
        const animChild = anim.children[key] as Animation<
          RecursiveAnimatable<Animating[typeof key]>
        >
        const childUnsub = child.mount(animChild)
        unsubs.add(childUnsub)
      }

      return () => {
        unsubs.forEach(unsub => unsub())
        unsubs.clear()
      }
    },
    update: (bounds: PartialBounds<PartialRecursiveAnimatable<Animating>>) => {
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
        const child = c as Animation<RecursiveAnimatable<Animating[typeof key]>>
        const childBounds = {
          upper: upperBoundsChildren[key],
          lower: lowerBoundsChildren[key],
        } as PartialBounds<PartialRecursiveAnimatable<unknown>>
        if (!childMap[key]) {
          const { mount } = (childMap[key] = setupBoundsLayer<
            RecursiveAnimatable<Animating[typeof key]>
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
 * A layer used to enforce min and max bounds on an animation.
 * @see {@link setupBoundsLayer} for how to create a BoundsLayer.
 */
export type BoundsLayer<Animating extends UnknownRecursiveAnimatable> = {
  // The function to remove the bounds layer, undefined if the layer is not mounted
  update: (
    bounds: PartialBounds<PartialRecursiveAnimatable<Animating>>
  ) => void | undefined
} & Layer<Animating>
