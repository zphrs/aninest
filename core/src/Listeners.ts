/**
 * Generic utility functions and types for listeners to non-cascading events.
 * @module Listeners
 */

/**
 * A listener function that is called when an event is broadcast.
 * 
 * The listener can return `true` to remove itself from the listener set, `false` to keep itself in the listener set, or `void` to keep itself in the listener set.
 * @example
() => true // remove listener
() => false // keep listener
() => {} // keep listener
 * @example ({a, b}) => console.log(a, b)
 */
export type Listener<T> = (
  currentLocalState: T
) => boolean | void | Promise<void>

/**
 * @internal
 * Uses a Map instead of a Set because a Map preserves insertion order
 * when iterating through items.
 */
export type ListenerSet<T> = Map<Listener<T>, undefined>

/**
 * @internal
 */
export type Listeners<Events extends string, T> = {
  [key in `${Events}Listeners`]: ListenerSet<T>
}

/**
 * @internal
 * Will call listeners in the order which they were added.
 */
export function broadcast<T>(
  listeners: Map<Listener<T>, undefined>,
  value: T,
  onRemove?: (listener: Listener<T>) => void
) {
  for (const listener of listeners.keys()) {
    if (listener(value) === true) {
      listeners.delete(listener)
      if (onRemove) {
        listeners.delete(listener)
        onRemove(listener)
      }
    }
  }
}
