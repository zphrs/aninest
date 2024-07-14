/**
 * A collection of extensions used for animations.
 * @module Extensions
 */

import {
  type Animation,
  unsubscribe,
  UnknownRecursiveAnimatable,
} from "../AnimatableTypes"

export * from "./loop"
export * from "./snap"
export * from "./bound"
export * from "./cache"
export * from "./dynamicSpeed"

/**
 * A function that unmounts the extension from the animation.
 */
export type unmount = unsubscribe

/**
 * A function that mounts the extension to the animation.
 */
export type Mount<Animating extends UnknownRecursiveAnimatable> = (
  anim: Animation<Animating>
) => unmount

/**
 * An extension that can be mounted to an animation.
 */
export type Extension<Animating extends UnknownRecursiveAnimatable> =
  Mount<Animating>

/**
 * A function that mounts the extension to the animation.
 * @param extension
 * @param anim
 * @returns A function that unmounts the extension from the animation.
 */
export function mountExtension<Animating extends UnknownRecursiveAnimatable>(
  extension: Extension<Animating>,
  anim: Animation<Animating>
): unmount {
  return extension(anim)
}

/**
 * A layer that can be mounted to an animation via a `mount` function.
 */
export type Layer<Animating extends UnknownRecursiveAnimatable> = {
  /**
   * Mounts the layer to a specific Animation.
   */
  mount: Mount<Animating>
}
