/**
 * Defines the types and functions related to the most bare-bones
 * extension.
 * @module Extension
 */

import {
  unsubscribe,
  UnknownRecursiveAnimatable,
  Animation,
} from "./AnimatableTypes"

/**
 * A function that unmounts an extension from the animation.
 */
export type unmount = unsubscribe

/**
 * A function that mounts an extension to the animation.
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
 * A function that mounts an extension to the animation.
 * @param extension
 * @param anim
 * @returns A function that unmounts an extension from the animation.
 */
export function mountExtension<Animating extends UnknownRecursiveAnimatable>(
  extension: Extension<Animating>,
  anim: Animation<Animating>
): unmount {
  return extension(anim)
}

/**
 * A layer that can be mounted to an animation via its `mount` function.
 */
export type Layer<Animating extends UnknownRecursiveAnimatable> = {
  /**
   * Mounts a layer to a specific Animation.
   */
  mount: Mount<Animating>
}
