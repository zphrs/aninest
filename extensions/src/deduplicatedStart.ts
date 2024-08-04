/**
 * Minimizes the number of start events triggered.
 * @module DeduplicatedStart
 */

import {
  UnknownRecursiveAnimatable,
  Layer,
  Listener,
  unsubscribe,
  broadcast,
  addRecursiveListener,
} from "aninest"

/**
 * Enables mounting to an animation and subscribing to the deduplicated start
 * events.
 */
export type DeduplicatedStartLayer<
  Animating extends UnknownRecursiveAnimatable
> = Layer<Animating> & {
  subscribe: (sub: Listener<undefined>) => unsubscribe
}

/**
 * Creates a DeduplicatedStartLayer which broadcasts deduplicated start events.
 */
export function getDeduplicatedStartLayer<
  Animating extends UnknownRecursiveAnimatable
>(): DeduplicatedStartLayer<Animating> {
  const listeners = new Map()
  return {
    mount(anim) {
      let scopeNum = 0

      const onBeforeStart = () => {
        scopeNum++
      }

      const onStart = () => {
        scopeNum--
        if (scopeNum != 0) return
        broadcast(listeners, undefined)
      }

      const unsub1 = addRecursiveListener(anim, "beforeStart", onBeforeStart)
      const unsub2 = addRecursiveListener(anim, "start", onStart)

      const unsubs = [unsub1, unsub2]

      return () => unsubs.forEach(u => u())
    },
    subscribe(sub) {
      listeners.set(sub, undefined)
      return () => listeners.delete(sub)
    },
  }
}
