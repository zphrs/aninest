/**
 * Supports creating modes which allow for the easy toggling of ExtensionStacks.
 * @module Mode
 */

import type { UnknownRecursiveAnimatable, Animation } from "./AnimatableTypes"
import { ExtensionStack, mountStack, unmount } from "."

/**
 * Provides on, off, and toggle functions to toggle an {@link ExtensionStack}
 */
export type Mode = {
  on: () => void
  off: () => void
  /**
   * Will toggle the mode on or off depending on the value of `to`.
   * If the mode is already set to match `to` then this function is a no-op.
   * @param to `true` to turn the mode on, `false` to turn the mode off,
   * and undefined to toggle.
   */
  toggle: (to?: boolean) => void
}

/**
 * Creates a mode which can be toggled on and off
 * @param anim
 * @param stack
 * @returns {@link Mode} to toggle the {@link ExtensionStack}
 */
export function createMode<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>,
  stack: ExtensionStack<Animating>
): Mode {
  let unmount: unmount | undefined = undefined
  const toggle = (to?: boolean) => {
    const active = unmount !== undefined
    if (to === active) return
    if (to == undefined) to = !active

    if (unmount === undefined) {
      unmount = mountStack(stack, anim)
    } else {
      unmount()
      unmount = undefined
    }
  }
  return {
    on() {
      toggle(true)
    },
    off() {
      toggle(false)
    },
    toggle,
  }
}
