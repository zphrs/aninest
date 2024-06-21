import {
  removeRecursiveListener,
  changeInterpFunction,
  modifyTo,
  addRecursiveListener,
  getStateTree,
  getInterpingToTree,
  addLocalListener,
  getLocalState,
} from "./Animatable"
import {
  RecursiveAnimatable,
  PartialRecursiveAnimatable,
  type Animation,
  LocalAnimatable,
  unsubscribe,
  UnknownRecursiveAnimatable,
} from "./AnimatableTypes"
import { START, BEFORE_END } from "./AnimatableEvents"
import { NO_INTERP } from "./Interp"
import { separateChildren } from "./RecursiveHelpers"

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
) {
  // only one init/towards at a time
  let init: PartialRecursiveAnimatable<Animating> | null = null
  let towards: PartialRecursiveAnimatable<Animating> | null = null
  const onEnd = () => {
    if (init === null || towards === null) return
    removeRecursiveListener(anim, START, onStart) // must remove to prevent infinite recursion
    removeRecursiveListener(anim, BEFORE_END, onEnd)
    const currInterpFunction = anim._timingFunction
    changeInterpFunction(anim, NO_INTERP)
    modifyTo(anim, init) // will apply immediately because of NO_INTERP
    changeInterpFunction(anim, currInterpFunction)
    modifyTo(anim, towards)
    addRecursiveListener(anim, START, onStart)
    return true
  }
  const onStart = () => {
    init = getStateTree(anim, init || {})
    towards = getInterpingToTree(anim, towards || {})
    addRecursiveListener(anim, BEFORE_END, onEnd)
  }
  addRecursiveListener(anim, START, onStart)
  return () => {
    removeRecursiveListener(anim, START, onStart)
    removeRecursiveListener(anim, BEFORE_END, onEnd)
  }
}

/**
 * Adds a grid to snap to.
 * @group Snap
 * @example
 setSnapGrid(anim, {x: 1, y: 1}) // will snap to integer values before ending
 * @param anim 
 * @param gridSize A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`
 * @returns a function to remove the snap grid
 */
export function setSnapGrid<Animating extends RecursiveAnimatable<unknown>>(
  anim: Animation<Animating>,
  gridSize: PartialRecursiveAnimatable<Animating>
): unsubscribe {
  const [localSnapPoints, children] = separateChildren(gridSize)
  const unsubscribers: unsubscribe[] = []
  // call setSnapGrid recursively on children
  for (const [key, childValue] of Object.entries(children)) {
    const childInfo = anim.children[key as keyof Animating]
    if (!childInfo) continue
    unsubscribers.push(
      setSnapGrid(childInfo, childValue as PartialRecursiveAnimatable<unknown>)
    )
  }
  // setup the snap grid for the current animation
  const localUnsub = setLocalSnapGrid(
    anim,
    localSnapPoints as Partial<LocalAnimatable<Animating>>
  )
  unsubscribers.push(localUnsub)
  return () => {
    unsubscribers.forEach(unsub => unsub())
  }
}

/**
 * Sets a snap grid only for the top level of the animation.
 * @group Snap
 * @param anim
 * @param gridSize A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`
 * @returns a function to remove the snap grid
 */
export function setLocalSnapGrid<
  Animating extends RecursiveAnimatable<unknown>
>(
  anim: Animation<Animating>,
  gridSize: Partial<LocalAnimatable<Animating>>
): unsubscribe {
  const toSnap: Set<string> = new Set()
  const onStart = (interpingTo: Partial<LocalAnimatable<Animating>>) => {
    for (const key in interpingTo) {
      if (gridSize[key] === undefined) continue
      toSnap.add(key)
    }
  }
  const beforeEnd = () => {
    const localState = getLocalState(anim) // final resting state
    const snappedRestingPosition: Partial<LocalAnimatable<unknown>> = {}
    for (const key of toSnap) {
      let gridValue = gridSize[key] as number
      let multiplier = localState[key] / gridValue
      if (Math.abs(Math.round(multiplier) - multiplier) < Number.EPSILON)
        continue
      snappedRestingPosition[key] =
        Math.round(localState[key] / gridValue) * gridValue
    }
    if (Object.keys(snappedRestingPosition).length === 0) return
    toSnap.clear()
    modifyTo(
      anim,
      snappedRestingPosition as PartialRecursiveAnimatable<Animating>
    )
  }
  const unsub1 = addLocalListener(anim, BEFORE_END, beforeEnd)
  const unsub2 = addLocalListener(anim, START, onStart)
  return () => {
    unsub1()
    unsub2()
  }
}

/**
 * Adds a point to snap to, across any number of features.
 * @group Snap
 * @example
// initialize the animation
const anim = createAnimation({x: 0, y: 0}, getLinearInterp(1))
setSnapPoint(anim, {x: 1, y: 1}, distanceLessThan(1))
const s = getStateTree(anim) // {x: 0, y: 0}
// start an interp to (1.5, 1.5) which will get snapped to (1, 1)
modifyTo(anim, {x: 1.5, y: 1.5})

// start of interp to (1.5, 1.5)
const s2 = getStateTree(anim) // {x: 0, y: 0}
updateAnimation(anim, 0.5) // true
const s3 = getStateTree(anim) // {x: 0.75, y: 0.75}
updateAnimation(anim, 0.5) // true
const s4 = getStateTree(anim) // {x: 1.5, y: 1.5}

// start of snap to (1, 1)
updateAnimation(anim, 0.5) // true
const s5 = getStateTree(anim) // {x: 1.25, y: 1.25}
updateAnimation(anim, 0.5) // false
const s6 = getStateTree(anim) // {x: 1, y: 1}
 * @param anim
 * @param snapPoint A point to snap to. Ex: `{x: 0.5, y: 0.5}`
 * @param shouldSnap A function which returns whether to snap to the snap point based on the snapPoint and the current state tree. See {@link distanceLessThan} for a helper function to create the shouldSnap function for snapping within a certain distance.
 * @returns a function to remove the snap point
 */
export function setSnapPoint<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
>(
  anim: Animation<Animating>,
  snapPoint: Point,
  shouldSnap: (point: Point, currentState: Animating) => boolean // the maximum distance from the snap point to snap
) {
  const beforeEnd = () => {
    const state = getStateTree(anim)
    if (
      shouldSnap(snapPoint, state) &&
      distanceSquaredBetween(snapPoint, state) > Number.EPSILON
    ) {
      modifyTo(anim, snapPoint)
    }
  }
  addRecursiveListener(anim, BEFORE_END, beforeEnd)
  return () => removeRecursiveListener(anim, BEFORE_END, beforeEnd)
}

/**
 * Returns a function of whether the distance across the features of the point is closer than the given distance to the current state.
 * Mainly meant as a utility function for {@link setSnapPoint}.
 * @group Snap
 * @example
const dlt2 = distanceLessThan(2)
dlt2({x: 1, y: 1}, {x: 0, y: 0}) // true
 * @param distance
 * @returns
 */
export function distanceLessThan<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
>(distance: number) {
  const distanceSquared = distance * distance
  return (point: Point, currentState: RecursiveAnimatable<Animating>) => {
    return distanceSquaredBetween(point, currentState) <= distanceSquared
  }
}
/**
 * Measures the squared euclidean distance between the point and the current state only on the subset of features of the point.
 * @group Snap
 * @example
const anim = createAnimation({x: 0, y: 0, z: 0}, getLinearInterp(1))
const point = {x: 1, y: 1}
const distSquared = distanceSquaredBetween(point, getStateTree(anim)) // 2
 * @param point An arbitrary point ex. if `Animating = {x: number, y: number, z: number}` then point could be `{x: number, y: number}`
 * @param currentState
 * @returns
 */
export function distanceSquaredBetween<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
>(point: Point, currentState: RecursiveAnimatable<Animating>) {
  let sum = 0
  const [local, children] = separateChildren(point)
  for (const key in local) {
    const k = key as keyof typeof local
    const v = local[k] as number
    const csv = currentState[k] as number
    const diff = v - csv
    sum += diff * diff
  }
  for (const key in children) {
    const k = key as keyof typeof children
    const v = children[k] as UnknownRecursiveAnimatable
    const csv = currentState[k] as UnknownRecursiveAnimatable
    sum += distanceSquaredBetween(v, csv)
  }
  return sum
}

type CacheLayer<Animating extends UnknownRecursiveAnimatable> = {
  // Returns the current state of the animation
  cache: Animating
  subscribe: (subscription: (value: Animating) => void) => unsubscribe
  set: (value: any) => void
  deleteCache: unsubscribe
}

export function getCacheLayer<Animating extends UnknownRecursiveAnimatable>(
  anim: Animation<Animating>
): CacheLayer<Animating> {
  const cache = {} as Animating
  const listeners: Set<(value: Animating) => void> = new Set()
  const onUpdateForCache = () => {
    getStateTree(anim, cache)
    listeners.forEach(listener => listener(cache))
  }
  onUpdateForCache()
  const deleteCache = addRecursiveListener(anim, "update", onUpdateForCache)
  return {
    cache: cache,
    subscribe: sub => {
      listeners.add(sub)
      return () => listeners.delete(sub)
    },
    set: value => {
      modifyTo(anim, value)
    },
    deleteCache,
  }
}
