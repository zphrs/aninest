/**
 * @returns true if listener should be removed
 * @example
 * () => true // remove listener
 * () => false // keep listener
 * () => {} // keep listener
 * @example
 * ({a, b}) => console.log(a, b)
 */
export type Listener<T> = (currentLocalState: T) => boolean | void

type ListenerSet<T> = Set<Listener<T>>

export type Listeners<Events extends string, T> = {
  [key in `${Events}Listeners`]: ListenerSet<T>
}

export function broadcast<T>(listeners: Set<Listener<T>>, value: T) {
  for (const listener of listeners) {
    if (listener(value)) {
      listeners.delete(listener)
    }
  }
}
