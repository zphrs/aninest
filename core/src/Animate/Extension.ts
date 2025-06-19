/**
 * Defines the types and functions related to the most bare-bones
 * extension.
 * @module Extension
 */

import { unsubscribe, UnknownAnimatable, Animation } from "./AnimatableTypes"

/**
 * A function that unmounts an extension from the animation.
 */
export type unmount = unsubscribe

/**
 * A function that mounts an extension to the animation.
 */
export type Mount<Animating extends UnknownAnimatable> = (
  anim: Animation<Animating>,
  options?: { signal?: AbortSignal }
) => unmount

/**
 * An extension that can be mounted to an animation.
 */
export type Extension<Animating extends UnknownAnimatable> = Mount<Animating>

/**
 * A function that mounts an extension to the animation.
 * @param extension
 * @param anim
 * @returns A function that unmounts an extension from the animation.
 */
export function mountExtension<Animating extends UnknownAnimatable>(
  extension: Extension<Animating>,
  anim: Animation<Animating>
): unmount {
  return extension(anim)
}

/**
 * A layer that can be mounted to an animation via its `mount` function.
 */
export type Layer<Animating extends UnknownAnimatable> = {
  /**
   * Mounts a layer to a specific Animation.
   */
  mount: Mount<Animating>
}
