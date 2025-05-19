/**
 * Extension to loop an animation in a saw-like wave: `/|/|`
 * @module Loop
 */

import {
  changeInterpFunction,
  modifyTo,
  getStateTree,
  getInterpingToTree,
  getInterpFunction,
  addRecursiveListener,
  removeRecursiveListener,
  START,
  BEFORE_END,
  UnknownRecursiveAnimatable,
  RecursiveAnimatable,
  unsubscribe,
  Animation,
  PartialRecursiveAnimatable,
  NO_INTERP,
  Extension,
} from "aninest"

export function loopExtension<
  Animating extends UnknownRecursiveAnimatable
>(): Extension<Animating> {
  return anim => {
    return loopAnimation(anim)
  }
}

/**
   * Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state.
   * @group Helpers
   * @example
  const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
  loopAnimation(anim)
  anim.modifyTo({a: 1, b: 1})
  anim.updateAnimation(0.5)
  anim.getStateTree() // {a: 0.5, b: 0.5}
  anim.updateAnimation(0.49)
  anim.getStateTree() // {a: ~1, b: ~1}
  anim.updateAnimation(0.01) // will trigger the loop
  anim.getStateTree() // {a: 0, b: 0}
   * @param anim
   * @returns A function that will stop the loop when called
   */
export function loopAnimation<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>
): unsubscribe {
  // only one init/towards at a time
  let init: PartialRecursiveAnimatable<Animating> = {}
  let towards: PartialRecursiveAnimatable<Animating> = {}
  const onEnd = () => {
    if (init === null || towards === null) return
    removeRecursiveListener(anim, START, onStart) // must remove to prevent infinite recursion
    removeRecursiveListener(anim, BEFORE_END, onEnd)
    const currInterpFunction = getInterpFunction(anim)
    changeInterpFunction(anim, NO_INTERP)
    modifyTo(anim, init) // will apply immediately because of NO_INTERP
    changeInterpFunction(anim, currInterpFunction)
    modifyTo(anim, towards)
    addRecursiveListener(anim, START, onStart)
    return true
  }
  const onStart = () => {
    init = getStateTree(anim, init as Animating)
    towards = getInterpingToTree(anim, towards as Animating)
    addRecursiveListener(anim, BEFORE_END, onEnd)
  }
  addRecursiveListener(anim, START, onStart)
  return () => {
    removeRecursiveListener(anim, START, onStart)
    removeRecursiveListener(anim, BEFORE_END, onEnd)
  }
}
