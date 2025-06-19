/** Allows creating dependencies between properties of an animation
 * so that when one property changes, another property will be updated as well,
 * based on that one property's value.
 * @module Reactor
 */
import {
  UnknownAnimatable,
  PartialRecursiveAnimatable,
  Mask,
  Animation,
  unsubscribe,
  modifyTo,
  unmount,
  addLocalListener,
  BEFORE_START,
  perMaskedChild,
  HasChildren,
  UnknownAnimation,
  isEmpty,
} from "aninest"
import { getDeduplicatedStartLayer } from "./deduplicatedStart"
import { getInterpingToProxy } from "./proxy"

/**
 */
type Transform<Animating extends UnknownAnimatable> = (
  interpingTo: Animating
) => PartialRecursiveAnimatable<Animating>

/**
 * Creates a dependency link between sets of properties.
 * For example you could change the color of an object based on its position:
@example
const anim = createAnimation({pos: ZERO_VEC2, color: {r: 0, g: 0, b: 0}}, getLinearInterp(1))
addReactor(anim, ({pos}) => {
    r = (pos.x - 127) % 255
    g = (pos.y - 127) % 255
    return {color: {r, g}}
  }, 
  {color: false} // makes sure the reactor doesn't trigger when color is modified.
  // otherwise would create an endless loop of reactor calls.
)
 * @param anim
 * @param reactor
 * @param mask Prevents running the reactor unnecessarily. Lets you specify which
 * properties you don't want to react to.
 * @returns
 */
export function addReactor<Animating extends UnknownAnimatable>(
  anim: Animation<Animating>,
  reactor: Transform<Animating>,
  mask: Mask<PartialRecursiveAnimatable<Animating>>
): unmount {
  const unsubs: unsubscribe[] = []
  // const { proxy, unsubscribe } = getStateTreeProxy(anim)
  // unsubs.push(unsubscribe)
  let needUpdate = false
  // using deduped start layer to run the reactor as little as possible
  const dedupedStartLayer = getDeduplicatedStartLayer<Animating>()
  const unmount = dedupedStartLayer.mount(anim)
  const interpingToProxy = getInterpingToProxy(anim)
  unsubs.push(unmount)
  let unsub = dedupedStartLayer.subscribe(() => {
    if (needUpdate) {
      needUpdate = false
      // modifyTo must be second because the above line prevents an infinite loop
      // as the `modifyTo()` call below emits a `start` event on `anim`
      modifyTo(anim, reactor(interpingToProxy))
    }
  })
  unsubs.push(unsub)

  unsub = addLocalListener(anim, BEFORE_START, local => {
    // no need to do further checks as reactor is already getting called
    if (needUpdate) return

    // makes sure that at least one value getting modified isn't masked out
    let shouldUpdate = false
    for (const key in local) {
      if (!(key in mask)) {
        shouldUpdate = true
        break
      }
    }

    if (shouldUpdate) needUpdate = true
  })
  unsubs.push(unsub)

  perMaskedChild(
    anim as HasChildren<number, Animating>,
    mask as Mask<Animating>,
    c => {
      const child = c as UnknownAnimation
      // uses beforeStart because otherwise the dedupedStartLayer
      // might run before the below checks are ran
      const unsub = addLocalListener(child, BEFORE_START, local => {
        if (needUpdate) return // no need to do further checks
        if (!isEmpty(local)) needUpdate = true
      })
      unsubs.push(unsub)
    }
  )
  return () => unsubs.forEach(u => u())
}
