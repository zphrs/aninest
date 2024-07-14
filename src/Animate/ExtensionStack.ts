/**
 * A stack of extensions that can be mounted to an animation.
 * @module ExtensionStack
 */

import { Extension, Layer, mountExtension } from "./Extensions"
import { UnknownRecursiveAnimatable, Animation } from "./AnimatableTypes"

export type ExtensionStack<Animating extends UnknownRecursiveAnimatable> =
  Extension<Animating>[]

/**
 * Creates an empty stack of extensions.
 * @returns
 */
export function createExtensionStack<
  Animating extends UnknownRecursiveAnimatable
>(): ExtensionStack<Animating> {
  return []
}

/**
 * Adds an extension to the stack.
 * @param stack
 * @param extension
 * @group Extensions
 */
export function addExtensionToStack<
  Animating extends UnknownRecursiveAnimatable
>(stack: ExtensionStack<Animating>, extension: Extension<Animating>) {
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
  Animating extends UnknownRecursiveAnimatable,
  L extends Layer<Animating>
>(stack: ExtensionStack<Animating>, layer: L): L {
  const mount = layer.mount
  addExtensionToStack(stack, mount)
  return layer
}

/**
 * Mounts the stack of extensions to the animation.
 * @param stack
 * @param anim
 * @returns A function that unmounts all the extensions in the stack.
 */
export function mountStack<Animating extends UnknownRecursiveAnimatable>(
  stack: ExtensionStack<Animating>,
  anim: Animation<Animating>
) {
  const unmounts = stack.map(ext => mountExtension(ext, anim))
  return () => {
    unmounts.forEach(unmount => unmount())
  }
}
