import { getInterpingToTree, modifyTo } from "../Animatable"
import { addLocalListener, BEFORE_START } from "../AnimatableEvents"
import {
  PartialRecursiveAnimatable,
  UnknownRecursiveAnimatable,
  Animation,
  unsubscribe,
} from "../AnimatableTypes"
import { unmount } from "../Extension"
import { HasChildren, Mask, perMaskedChild } from "../RecursiveHelpers"
import { getDeduplicatedStartLayer } from "./deduplicatedStart"
// import { getStateTreeProxy } from "./proxy"
import { isEmpty } from "../../Utils"

/**
 */
type Transform<
  Animating extends UnknownRecursiveAnimatable,
  Base extends PartialRecursiveAnimatable<Animating>
> = (base: Base) => PartialRecursiveAnimatable<Animating>

export function addReactor<
  Animating extends UnknownRecursiveAnimatable,
  Base extends PartialRecursiveAnimatable<Animating>
>(
  anim: Animation<Animating>,
  reactor: Transform<Animating, Base>,
  mask: Mask<Base>
): unmount {
  const unsubs: unsubscribe[] = []
  // const { proxy, unsubscribe } = getStateTreeProxy(anim)
  // unsubs.push(unsubscribe)
  let needUpdate = false
  const dedupedStartLayer = getDeduplicatedStartLayer()
  const unmount = dedupedStartLayer.mount(
    anim as Animation<UnknownRecursiveAnimatable>
  )
  unsubs.push(unmount)
  const unsub = dedupedStartLayer.subscribe(() => {
    console.log("AAAAA")
    if (needUpdate) {
      needUpdate = false
      modifyTo(anim, reactor(getInterpingToTree(anim) as unknown as Base))
    }
  })
  unsubs.push(unsub)
  perMaskedChild(
    anim as HasChildren<number, Animating>,
    mask as Mask<Animating>,
    c => {
      const child = c as Animation<UnknownRecursiveAnimatable>
      const unsub = addLocalListener(child, BEFORE_START, local => {
        console.log(local)
        if (!isEmpty(local) && !needUpdate) needUpdate = true
      })
      unsubs.push(unsub)
    }
  )
  return () => unsubs.forEach(u => u())
}
