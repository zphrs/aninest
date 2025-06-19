/**
 * A stack of extensions that can be mounted to an animation.
 * @module ExtensionStack
 */

import { Extension, Layer, mountExtension, unmount } from "./Extension"
import { UnknownAnimatable, Animation } from "./AnimatableTypes"

/**
 * A list of extensions which will be mounted to an animation in order.
 * @see {@link mountStack} to add an extension to the stack.
 * @group Extensions
 */
export type ExtensionStack<Animating extends UnknownAnimatable> =
  Extension<Animating>[]

/**
 * Creates an empty stack of extensions.
 * @returns
 */
export function createExtensionStack<
  Animating extends UnknownAnimatable
>(): ExtensionStack<Animating> {
  return []
}

/**
 * Adds an extension to the stack.
 * @param stack
 * @param extension
 * @group Extensions
 */
export function addExtensionToStack<Animating extends UnknownAnimatable>(
  stack: ExtensionStack<Animating>,
  extension: Extension<Animating>
) {
  stack.push(extension)
}

/**
 * A passthrough function that adds a layer to the stack and
 * returns the layer.
 * @param stack
 * @param layer
 * @returns the inputted {@link layer}
 */
export function addLayerToStack<
  Animating extends UnknownAnimatable,
  L extends Layer<Animating>
>(stack: ExtensionStack<Animating>, layer: L): L {
  const mount = layer.mount
  addExtensionToStack(stack, mount)
  return layer
}

/**
 * Mounts a stack of extensions to the animation. Returns a function that
 * unmounts all the extensions in the stack.
 * @param stack
 * @param anim
 * @returns A function that unmounts all the extensions in the stack.
 * @group Extensions
 */
export function mountStack<Animating extends UnknownAnimatable>(
  stack: ExtensionStack<Animating>,
  anim: Animation<Animating>
): unmount {
  const unmounts = stack.map(ext => mountExtension(ext, anim))
  return () => {
    unmounts.forEach(unmount => unmount())
  }
}
