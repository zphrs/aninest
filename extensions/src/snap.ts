/**
 * Snaps the animation to predetermined points before ending.
 * @module Snap
 */

import {
  Extension,
  Mount,
  getLocalState,
  modifyTo,
  getStateTree,
  addLocalListener,
  addRecursiveListener,
  removeRecursiveListener,
  RecursiveAnimatable,
  PartialRecursiveAnimatable,
  unsubscribe,
  Animation,
  LocalAnimatable,
  UnknownRecursiveAnimatable,
  BEFORE_END,
  START,
  separateChildren,
} from "aninest"

export function snapGridExtension<Animating extends UnknownRecursiveAnimatable>(
  gridSize: PartialRecursiveAnimatable<Animating>
): Extension<Animating> {
  const mount: Mount<Animating> = anim => {
    return setSnapGrid(anim, gridSize)
  }
  return mount
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
    const snappedRestingPosition: Partial<
      LocalAnimatable<UnknownRecursiveAnimatable>
    > = {}
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
  for (const key in getLocalState(anim)) {
    toSnap.add(key)
  }
  beforeEnd()
  const unsub1 = addLocalListener(anim, BEFORE_END, beforeEnd)
  const unsub2 = addLocalListener(anim, START, onStart)
  return () => {
    unsub1()
    unsub2()
  }
}

/**
 * @group Snap
 */
export type ShouldSnap<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
> =
  /**
   * @param point The snap point.
   * @param currentState The current state of the animation.
   * @returns whether the animation should snap to the point.
   */
  (point: Point, currentState: Animating) => boolean

export function snapPointExtension<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
>(
  snapPoint: Point,
  shouldSnap: ShouldSnap<Animating, Point>
): Extension<Animating> {
  return anim => setSnapPoint(anim, snapPoint, shouldSnap)
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
  shouldSnap: ShouldSnap<Animating, Point>
): unsubscribe {
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
  beforeEnd()
  return () => removeRecursiveListener(anim, BEFORE_END, beforeEnd)
}

/**
 * Returns a function of whether the provided {@link distance} is smaller than the distance between the current state and an arbitrary point.
 * Mainly meant as a utility function for {@link setSnapPoint}.
 * @group Snap
 * @example
const dlt2 = distanceLessThan(2)
dlt2({x: 1, y: 1}, {x: 0, y: 0}) // true
 * @param distance The threshold euclidean distance.
 * @returns A function which returns whether the distance between the 
 current state and the point is less than {@link distance} provided.
 */
export function distanceLessThan<
  Animating extends RecursiveAnimatable<unknown>,
  Point extends PartialRecursiveAnimatable<Animating>
>(distance: number): ShouldSnap<Animating, Point> {
  const distanceSquared = distance * distance
  const out: ShouldSnap<Animating, Point> = (
    point: Point,
    currentState: Animating
  ) => {
    return distanceSquaredBetween(point, currentState) <= distanceSquared
  }
  return out
}
/**
     * Measures the squared euclidean distance between the {@link point} and the {@link currentState} across the features in the {@link point}.
     * @group Snap
     * @example
    const anim = createAnimation({x: 0, y: 0, z: 0}, getLinearInterp(1))
    const point = {x: 1, y: 1}
    const distSquared = distanceSquaredBetween(point, getStateTree(anim)) // 2
     * @param point An arbitrary point ex. if `Animating = {x: number, y: number, z: number}` then point could be `{x: number, y: number}`
     * @param currentState
     * @returns The squared euclidean distance between the {@link point} and the {@link currentState} across the features in the {@link point}.
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
