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
  ListenerSet,
} from "aninest"
import {} from "../../core/lib"

export type seconds = number
export type milliseconds = number

type UpdateWithDeltaTime = "updateWithDeltaTime"
type ChildStart = "childStart"
type ChildEnd = "childEnd"
type ChildEvents = ChildStart | ChildEnd
type UpdateLayerEvents =
  | "start"
  | "end"
  | "update"
  | "afterUpdate"
  | UpdateWithDeltaTime
  | ChildEvents

/**
 * An update layer that can be mounted to an animation.
 * Allows listening to:
 * - **start** - when the animation starts to be updated,
 * - **stop** - when the animation finishes animating everything
 * - **update** - each update frame
 * - **updateWithDeltaTime** - each update frame with the time since the last update
 * - **afterUpdate** - after each update frame
 * - **childStart** - when a child UpdateLayer starts to be updated
 * - **childEnd** - when a child UpdateLayer finishes animating everything, including its children
 */
export type UpdateLayer<Animating extends UnknownRecursiveAnimatable> =
  Layer<Animating> & {
    subscribe<Event extends UpdateLayerEvents>(
      type: Event,
      sub: Event extends UpdateWithDeltaTime
        ? Listener<seconds>
        : Event extends ChildEvents
        ? Listener<InternalUpdateLayer<UnknownRecursiveAnimatable>>
        : Listener<Animation<Animating>>
    ): unsubscribe
    /**
     * Will mount the current update layer onto another update layer so that
     * the other layer will drive the updates to this layer rather than those
     * updates being driven by triggerNextUpdate.
     * This layer will only drive its "start" and "end" events. The other layer
     * will listen to the "start" event of this layer.
     * @param parentLayer
     * @returns
     */
    setParent: (
      parentLayer: UpdateLayer<UnknownRecursiveAnimatable>
    ) => unsubscribe
  }

type InternalUpdateLayer<Animating extends UnknownRecursiveAnimatable> =
  UpdateLayer<Animating> & {
    _setChild: (
      child: InternalUpdateLayer<UnknownRecursiveAnimatable>
    ) => unsubscribe
    /**
     *
     * @param dt
     * @returns whether the child needs to be updated again
     */
    _updateWithDt: (dt: number) => boolean
  }

if (!globalThis.requestAnimationFrame)
  globalThis.requestAnimationFrame = callback => {
    globalThis.setImmediate(() => {
      callback(performance.now())
    })
    return 0
  }
/**
 * Updates the animation every frame, providing a subscribe function which allows
 * listening to:
 * - **start** - when the animation starts to be updated,
 * - **stop** - when the animation finishes animating everything
 * - **update** - each update frame
 */
export function getUpdateLayer<Animating extends UnknownRecursiveAnimatable>(
  queueNextUpdate: (
    callback: (time: milliseconds) => void
  ) => void = requestAnimationFrame
): UpdateLayer<Animating> {
  const listeners = {
    start: new Map() as ListenerSet<Animation<Animating>>,
    childStart: new Map() as ListenerSet<
      InternalUpdateLayer<UnknownRecursiveAnimatable>
    >,
    childEnd: new Map() as ListenerSet<
      InternalUpdateLayer<UnknownRecursiveAnimatable>
    >,
    end: new Map() as ListenerSet<Animation<Animating>>,
    update: new Map() as ListenerSet<Animation<Animating>>,
    updateWithDeltaTime: new Map() as ListenerSet<seconds>,
    afterUpdate: new Map() as ListenerSet<Animation<Animating>>,
  }
  const anims = new Set<Animation<Animating>>()
  const animsNeedingUpdate = new Set<Animation<Animating>>()
  const children = new Set<InternalUpdateLayer<UnknownRecursiveAnimatable>>()
  const childrenNeedingUpdate = new Set<
    InternalUpdateLayer<UnknownRecursiveAnimatable>
  >()
  // by default it drives itself until mounted onto another update layer
  let parent: InternalUpdateLayer<UnknownRecursiveAnimatable> | undefined
  // has no children so it doesn't have anything to update yet
  let needsUpdate = () =>
    animsNeedingUpdate.size > 0 || childrenNeedingUpdate.size > 0
  /** very sad function name :( */
  let orphanMyself: unsubscribe | undefined = undefined
  const setParent = (
    parentLayer: UpdateLayer<UnknownRecursiveAnimatable>
  ): unsubscribe => {
    parent = parentLayer as InternalUpdateLayer<UnknownRecursiveAnimatable>
    const haveParentUnsubscribe = parent._setChild(out)
    orphanMyself = () => {
      parent = undefined
      haveParentUnsubscribe()
    }
    return orphanMyself
  }
  const _setChild = (
    child: InternalUpdateLayer<UnknownRecursiveAnimatable>
  ) => {
    const unsubStart = child.subscribe("start", () => {
      childrenNeedingUpdate.add(child)
      if (!parent) queueNextUpdate(update)
      else broadcast(listeners.childStart, child)
    })
    return () => {
      children.delete(child)
      childrenNeedingUpdate.delete(child)
      unsubStart()
    }
  }
  let lastTime: number | undefined = undefined
  const isUnmounted = () => {
    return anims.size === 0
  }
  const updateWithDeltaTime = (dt: number): boolean => {
    for (const anim of animsNeedingUpdate) {
      const animNeedsUpdate = updateAnimation(anim, dt)
      if (!animNeedsUpdate) {
        animsNeedingUpdate.delete(anim)
        broadcast(listeners.end, anim)
      }
      broadcast(listeners.update, anim)
      broadcast(listeners.updateWithDeltaTime, dt)
      broadcast(listeners.afterUpdate, anim)
    }
    for (const child of childrenNeedingUpdate) {
      const childNeedsUpdate = child._updateWithDt(dt)
      if (!childNeedsUpdate) {
        childrenNeedingUpdate.delete(child)
        broadcast(listeners.childEnd, child)
      }
    }
    const out = needsUpdate()
    return out
  }
  const update = (time: milliseconds) => {
    if (isUnmounted()) return
    const dt = lastTime ? (time - lastTime) / 1000 : 0
    updateWithDeltaTime(dt)
    lastTime = time
    if (needsUpdate() && !parent) queueNextUpdate(update)
  }
  const onMount = (anim: Animation<Animating>) => {
    const unsub = addRecursiveListener(anim, START, () => {
      broadcast(listeners.start, anim)
      animsNeedingUpdate.add(anim)
      if (!parent) queueNextUpdate(update)
    })
    anims.add(anim)
    return () => {
      unsub()
      anims.delete(anim)
      animsNeedingUpdate.delete(anim)
    }
  }
  const subscribe: UpdateLayer<Animating>["subscribe"] = (type, sub) => {
    const listener: (typeof listeners)[typeof type] = listeners[type]

    listener.set(sub as Listener<unknown>, undefined)
    return () => listener.delete(sub as Listener<unknown>)
  }
  const out = {
    mount: onMount,
    setParent,
    _setChild,
    subscribe,
    _updateWithDt: updateWithDeltaTime,
  } as InternalUpdateLayer<UnknownRecursiveAnimatable>
  return out as UpdateLayer<Animating>
}

export const UpdateExtension: Extension<UnknownRecursiveAnimatable> =
  getUpdateLayer().mount
