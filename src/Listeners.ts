/**
 * Generic utility functions and types for listeners to non-cascading events.
 * @module Listeners
 */

/**
 * A listener function that is called when an event is broadcast.
 * @description The listener can return `true` to remove itself from the listener set, `false` to keep itself in the listener set, or `void` to keep itself in the listener set.
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
 */
export type ListenerSet<T> = Set<Listener<T>>

/**
 * @internal
 */
export type Listeners<Events extends string, T> = {
  [key in `${Events}Listeners`]: ListenerSet<T>
}

/**
 * @internal
 */
export function broadcast<T>(
  listeners: Set<Listener<T>>,
  value: T,
  onRemove?: (listener: Listener<T>) => void
) {
  for (const listener of listeners) {
    if (listener(value) === true) {
      listeners.delete(listener)
      if (onRemove) {
        onRemove(listener)
      }
    }
  }
}
