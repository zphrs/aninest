/**
 * Extension to add a cache to an animation.
 * @module Extensions/Cache
 */

import { Extension, Layer } from "."
import { broadcast, Listener, ListenerSet } from "../../Listeners"
import { getStateTree } from "../Animatable"
import { addRecursiveListener } from "../AnimatableEvents"
import {
  UnknownRecursiveAnimatable,
  Animation,
  unsubscribe,
} from "../AnimatableTypes"

/**
 * Layer used to create a cache of the current state of the animation.
 */
export type CacheLayer<Animating extends UnknownRecursiveAnimatable> = {
  /**
   * Stores the current state of the animation. Reuses the same object for caching.
   */
  readonly cache: Animating
  /**
   * Allows adding a subscription to the cache which will get called every time the
   * animation gets updated.
   * @param subscription The function which will be called when the cache updates.
   * @returns An unsubscribe function which will remove the subscription from the
   * layer.
   */
  subscribe: (subscription: Listener<Animating>) => unsubscribe
  /**
   * Removes all subscribers.
   */
  removeSubscribers: () => void
} & Layer<Animating>

export function getCacheLayer<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>
): CacheLayer<Animating> {
  const cache: Animating = {} as Animating
  const listeners: ListenerSet<Animating> = new Map()
  const onUpdateForCache = () => {
    if (!cache) throw new Error("Cache is not initialized")
    getStateTree(anim, cache)
    broadcast(listeners, cache)
  }
  return {
    cache: cache,
    subscribe: sub => {
      listeners.set(sub, undefined)
      return () => listeners.delete(sub)
    },
    removeSubscribers: () => {
      listeners.clear()
    },
    mount(anim) {
      onUpdateForCache()
      const unmount = addRecursiveListener(anim, "update", onUpdateForCache)

      return () => {
        unmount()
      }
    },
  }
}

export function getCacheExtension<Animating extends UnknownRecursiveAnimatable>(
  cacheLayer: CacheLayer<Animating>
): Extension<Animating> {
  return cacheLayer.mount
}
