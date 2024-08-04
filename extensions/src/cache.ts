/**
 * Extension to add a cache to an animation.
 * @internal
 * @deprecated
 * @module Extensions/Cache
 */

import {
  Layer,
  broadcast,
  Listener,
  ListenerSet,
  getStateTree,
  addRecursiveListener,
  UnknownRecursiveAnimatable,
  Animation,
  unsubscribe,
} from "aninest"

import { getStateTreeProxy } from "./proxy"
/**
 * Layer used to create a cache of the current state of the animation.
 * @internal
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

/**
 * Makes a cache layer which allows listening to cache events and getting
 * the current cached values of the properties within the animation.
 * @deprecated use {@link getStateTreeProxy} instead for better caching performance
 * with less redundancy.
 * @internal
 * @returns A cache layer which allows the reading and listening of changes to the
 * current animation state.
 */
export function getCacheLayer<
  Animating extends UnknownRecursiveAnimatable
>(): CacheLayer<Animating> {
  const cache: Animating = {} as Animating
  const listeners: ListenerSet<Animating> = new Map()
  const onUpdateForCache = (anim: Animation<Animating>) => {
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
      onUpdateForCache(anim)
      const unmount = addRecursiveListener(
        anim,
        "update",
        onUpdateForCache.bind(this, anim)
      )

      return () => {
        unmount()
      }
    },
  }
}
