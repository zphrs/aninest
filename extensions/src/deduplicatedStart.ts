/**
 * Minimizes the number of start events triggered.
 * @module DeduplicatedStart
 * @deprecated
 */

import {
  UnknownAnimatable,
  Layer,
  Listener,
  unsubscribe,
  broadcast,
  addRecursiveListener,
} from "aninest"

/**
 * Enables mounting to an animation and subscribing to the deduplicated start
 * events.
 * @deprecated
 */
export type DeduplicatedStartLayer<Animating extends UnknownAnimatable> =
  Layer<Animating> & {
    subscribe: (sub: Listener<undefined>) => unsubscribe
  }

/**
 * Creates a DeduplicatedStartLayer which broadcasts deduplicated start events.
 * @deprecated
 */
export function getDeduplicatedStartLayer<
  Animating extends UnknownAnimatable
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
