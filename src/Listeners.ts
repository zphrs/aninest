/**
 * Generic utility functions and types for listeners to non-cascading events.
 * @module Listeners
 */

/**
 * A listener function that is called when an event is broadcast.
 * @example
() => true // remove listener
() => false // keep listener
() => {} // keep listener
 * @example ({a, b}) => console.log(a, b)
 */
export type Listener<T> = (currentLocalState: T) => boolean | void

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
export function broadcast<T>(listeners: Set<Listener<T>>, value: T) {
  for (const listener of listeners) {
    if (listener(value)) {
      listeners.delete(listener)
    }
  }
}
