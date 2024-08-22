/**
 * Updates the animation every screen refresh, providing a subscribe function which allows
 * listening to:
 * - **start** - when the animation starts to be updated,
 * - **stop** - when the animation finishes animating everything
 * - **update** - each update frame
 * It will only update the animation when necessary, i.e. when the animation has
 * been started and there are still things to animate.
 * @module Update
 */

import {
  Extension,
  Layer,
  Listener,
  broadcast,
  updateAnimation,
  addRecursiveListener,
  START,
  Animation,
  UnknownRecursiveAnimatable,
  unsubscribe,
} from "aninest"
import {} from "../../core/lib"

/**
 * An update layer that can be mounted to an animation.
 * Allows listening to:
 * - **start** - when the animation starts to be updated,
 * - **stop** - when the animation finishes animating everything
 * - **update** - each update frame
 */
export type UpdateLayer<Animating extends UnknownRecursiveAnimatable> =
  Layer<Animating> & {
    subscribe: (
      type: "start" | "end" | "update",
      sub: Listener<Animation<Animating>>
    ) => unsubscribe
  }

/**
 * Updates the animation every frame, providing a subscribe function which allows
 * listening to:
 * - **start** - when the animation starts to be updated,
 * - **stop** - when the animation finishes animating everything
 * - **update** - each update frame
 */
export function getUpdateLayer<
  Animating extends UnknownRecursiveAnimatable
>(): UpdateLayer<Animating> {
  const listeners = { start: new Map(), end: new Map(), update: new Map() }
  const onMount = (anim: Animation<Animating>) => {
    let lastTime: number | undefined = undefined
    function update(time: number) {
      if (unmounted) return
      const dt = lastTime ? time - lastTime : 0
      const needsUpdate = updateAnimation(anim, dt / 1000)
      broadcast(listeners.update, anim)
      lastTime = time
      if (needsUpdate) requestAnimationFrame(update)
      else {
        lastTime = undefined
        broadcast(listeners.end, anim)
      }
    }
    let unmounted = false
    const unsub = addRecursiveListener(anim, START, () => {
      if (lastTime !== undefined) return
      broadcast(listeners.start, anim)
      requestAnimationFrame(update)
    })
    return () => {
      unsub()
      unmounted = true
    }
  }
  return {
    mount: onMount,
    subscribe(type, sub) {
      const listener = listeners[type]
      listener.set(sub, undefined)
      return () => listener.delete(sub)
    },
  }
}

export const UpdateExtension: Extension<UnknownRecursiveAnimatable> =
  getUpdateLayer().mount
