/**
 * Updates the animation every screen refresh, providing a subscribe function which allows
 * listening to:
 * - **start** - when the animation starts to be updated,
 * - **done** - when the animation finishes animating everything
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
  END,
  UPDATE,
  IMMUTABLE_START,
} from "aninest"
import { SignalOption, supportAbortSignalOption } from "./abortSignal"

export type seconds = number
export type milliseconds = number

const UPDATE_WITH_DELTA_TIME = "updateWithDeltaTime" as const
const CHILD_START = "childStart" as const
const CHILD_END = "childEnd" as const
const DONE = "done" as const
const CHILD_EVENTS = [CHILD_START, CHILD_END] as const
const AFTER_UPDATE = "afterUpdate" as const
const UPDATE_LAYER_EVENTS = [
  START,
  END,
  UPDATE,
  AFTER_UPDATE,
  DONE,
  UPDATE_WITH_DELTA_TIME,
  ...CHILD_EVENTS,
] as const
const STARTS = [START, CHILD_START] as const
type UpdateWithDeltaTime = typeof UPDATE_WITH_DELTA_TIME
type Done = typeof DONE
type ChildEvents = (typeof CHILD_EVENTS)[number]
type UpdateLayerEvents = (typeof UPDATE_LAYER_EVENTS)[number]

type UpdateLayerType<
  Event,
  Animating extends UnknownRecursiveAnimatable
> = Event extends UpdateWithDeltaTime
  ? seconds
  : Event extends ChildEvents
  ? InternalUpdateLayer<UnknownRecursiveAnimatable>
  : Event extends Done
  ? undefined
  : Animation<Animating>

type UpdateLayerSets<Animating extends UnknownRecursiveAnimatable> = {
  [Key in UpdateLayerEvents]: ListenerSet<UpdateLayerType<Key, Animating>>
}

/**
 * An update layer that can be mounted to an animation.
 * Allows listening to:
 * - **start** - when any child animation starts to be updated,
 * - **update** - when any child animation is updated
 * - **updateWithDeltaTime** - each update frame with the time since the last update
 * - **afterUpdate** - after each update frame
 * - **childStart** - when a child UpdateLayer starts to be updated
 * - **childEnd** - when a child UpdateLayer finishes animating everything, including its children
 * - **done** - when the animation finishes animating everything and pauses the updates
 */
export type UpdateLayer<Animating extends UnknownRecursiveAnimatable> =
  Layer<Animating> & {
    subscribe<Event extends UpdateLayerEvents>(
      type: Event,
      sub: Listener<UpdateLayerType<Event, Animating>>,
      options?: SignalOption
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
      parentLayer: UpdateLayer<UnknownRecursiveAnimatable>,
      options?: SignalOption
    ) => unsubscribe
  }

type InternalUpdateLayer<Animating extends UnknownRecursiveAnimatable> =
  UpdateLayer<Animating> & {
    _setChild: (
      child: InternalUpdateLayer<UnknownRecursiveAnimatable>,
      options?: SignalOption
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
 * - **done** - when the animation finishes animating everything
 * - **update** - each update frame
 */
export function getUpdateLayer<Animating extends UnknownRecursiveAnimatable>(
  queueNextUpdate: (
    callback: (time: milliseconds) => void
  ) => void = requestAnimationFrame
): UpdateLayer<Animating> {
  const listeners = UPDATE_LAYER_EVENTS.reduce((acc, key) => {
    acc[key] = new Map()
    return acc
  }, {} as UpdateLayerSets<Animating>)
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
  const setParent = (
    parentLayer: UpdateLayer<UnknownRecursiveAnimatable>
  ): unsubscribe => {
    parent = parentLayer as InternalUpdateLayer<UnknownRecursiveAnimatable>
    const controller = new AbortController()
    parent._setChild(
      out as unknown as InternalUpdateLayer<UnknownRecursiveAnimatable>,
      controller
    )
    const orphanMyself = () => {
      parent = undefined
      controller.abort()
    }
    return orphanMyself
  }
  const _setChild = (
    child: InternalUpdateLayer<UnknownRecursiveAnimatable>
  ) => {
    const controller = new AbortController()
    const onStart = () => {
      const shouldQueue = !needsUpdate()
      childrenNeedingUpdate.add(child)
      if (!parent && lastTime == undefined && shouldQueue)
        queueNextUpdate(update)
      else broadcast(listeners.childStart, child)
    }
    STARTS.forEach(event => child.subscribe(event, onStart, controller))
    children.add(child)
    return () => {
      children.delete(child)
      childrenNeedingUpdate.delete(child)
      controller.abort()
    }
  }
  let lastTime: number | undefined = undefined
  const updateWithDeltaTime = (dt: number) => {
    broadcast(listeners.updateWithDeltaTime, dt)
    for (const anim of animsNeedingUpdate) {
      broadcast(listeners.update, anim)
      const animNeedsUpdate = updateAnimation(anim, dt)
      broadcast(listeners.afterUpdate, anim)
      if (!animNeedsUpdate) {
        animsNeedingUpdate.delete(anim)
        broadcast(listeners.end, anim)
      }
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
    const dt = lastTime ? (time - lastTime) / 1000 : 0
    const shouldUpdate = updateWithDeltaTime(dt)
    lastTime = time
    if (!shouldUpdate) {
      lastTime = undefined
      broadcast(listeners.done, undefined)
    }
    if (!parent && shouldUpdate) queueNextUpdate(update)
  }
  const onMount = (anim: Animation<Animating>) => {
    const unsub = addRecursiveListener(anim, IMMUTABLE_START, () => {
      const shouldQueue = !needsUpdate()
      animsNeedingUpdate.add(anim)
      broadcast(listeners.start, anim)
      if (!parent && lastTime == undefined && shouldQueue)
        queueNextUpdate(update)
    })
    anims.add(anim)
    return () => {
      unsub()
      anims.delete(anim)
      animsNeedingUpdate.delete(anim)
    }
  }
  const subscribe: UpdateLayer<Animating>["subscribe"] = (type, sub) => {
    const listener = listeners[type]

    listener.set(sub as Listener<unknown>, undefined)
    return () => listener.delete(sub as Listener<unknown>)
  }
  const out = {
    mount: supportAbortSignalOption(onMount),
    setParent: supportAbortSignalOption(setParent),
    _setChild: supportAbortSignalOption(_setChild),
    subscribe: supportAbortSignalOption(subscribe),
    _updateWithDt: updateWithDeltaTime,
  } as InternalUpdateLayer<Animating>
  return out as UpdateLayer<Animating>
}

export const UpdateExtension: Extension<UnknownRecursiveAnimatable> =
  getUpdateLayer().mount
