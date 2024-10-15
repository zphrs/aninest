/** Wraps any extension with an `addAbortSignal` function to allow to remove the extension
 * from the animation with an AbortController.
 * @module AbortSignal
 */

import { unsubscribe } from "aninest"

/**
 * Adds the option to add an AbortSignal to any function which returns a function to
 * undo its effects.
 * @param func The function to wrap
 * @param signal The AbortSignal to use to remove the effect of the function.
@example
const anim = createAnimation({ x: 0, y: 0 }, getLinearInterp(1))
const someExtension = (anim: Animation<UnknownRecursiveAnimatable>) => {
  // initialize the extension
  return () => {
    // cleanup
  }
}
const controller = new AbortController()
const extension = addAbortSignal(someExtension, controller.signal)
const unsub = extension(anim)
controller.abort() // will remove the extension `someExtension`
unsub() // unsub is now a no-op after the controller is aborted

 * @returns A function with the same parameters as `func` but returns a function that
 * will remove the effect of `func` and remove the listener from the AbortSignal.
 */
export function addAbortSignal<F extends (...args: any[]) => unsubscribe>(
  func: F,
  signal: AbortSignal
): (...args: Parameters<F>) => unsubscribe {
  return (...args: Parameters<F>) => {
    const unsub = func(...args)
    signal.addEventListener("abort", unsub, { once: true })
    return () => {
      unsub()
      signal.removeEventListener("abort", unsub)
    }
  }
}
/**
 * An object that contains an `AbortSignal` option within the `signal` field.
 */
export type SignalOption = { signal?: AbortSignal }
/**
 * Handles the case where the last parameter of the function is an object with a field
 * and the function already returns a function to undo its effects.
 * @param func Note that the last parameter of the function must be an object
 * that contains a field `signal` of type `AbortSignal`.
 * @returns A function with the same shape as `func` but properly handles
 * the `AbortSignal` option.
 * @internal
@example
const _subscribe = (anim: Animation, eventType: string, options?: {signal?: AbortSignal}) => {
  // do whatever to subscribe
  return () => {
    // cleanup
  }
}
// now subscribe will handle the signal option
const subscribe = supportAbortSignalOption(_subscribe)
 */
export function supportAbortSignalOption<
  F extends (...args: any[]) => unsubscribe
>(func: F): (...args: Parameters<F>) => unsubscribe {
  return (...args: Parameters<F>) => {
    const unsub = func(...args)
    const signal = args[args.length - 1]?.signal
    if (!signal || !(signal instanceof AbortSignal)) {
      return unsub
    }
    signal.addEventListener("abort", unsub, { once: true })
    return () => {
      unsub()
      signal.removeEventListener("abort", unsub)
    }
  }
}
