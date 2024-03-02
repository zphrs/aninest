/**
 * @returns true if listener should be removed
 */
export type Listener<T> = (newValue: T) => boolean | void

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
