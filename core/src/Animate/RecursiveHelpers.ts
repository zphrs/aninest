/**
 * Provides general helper functions for working with recursive objects.
 * Especially useful for allowing extensions to mask out (not affect) certain
 * children of an object.
 * @module RecursiveHelpers
 */

import { UnknownRecursiveAnimatable } from "./AnimatableTypes"
type ChildrenOfRecursive<Base, T> = {
  [P in keyof T]: T[P] extends Recursive<Base, unknown> ? T[P] : never
}

export function separateChildren<Base, T extends Recursive<Base, unknown>>(
  obj: T
): [Local<Base, T>, ChildrenOfRecursive<Base, T>] {
  const local = {} as Local<Base, T>
  const children = {} as ChildrenOfRecursive<Base, T>
  for (const k in obj) {
    const key = k as keyof T
    const value = obj[key]
    if (typeof value !== "object") {
      local[key] = value as T[keyof T] extends Base ? T[keyof T] : never
    } else {
      children[key] = value as unknown as ChildrenOfRecursive<Base, T>[Extract<
        keyof T,
        string
      >]
    }
  }
  return [local, children]
}

export function copyObject<T>(obj: T, into: T = {} as T): T {
  const out = into as T
  for (const key in obj) {
    out[key] = obj[key]
  }
  return out
}

export function recursivelyCopyObject<T>(obj: T): T {
  const out = {} as T
  for (const key in obj) {
    const value = obj[key]
    if (typeof value !== "object") {
      out[key] = value
    } else {
      out[key] = recursivelyCopyObject(value)
    }
  }
  return out
}

/**
 * Generic type which allows for the recursive definition of an object
 * which either has a value of type `Base` or a subtree of the same type.
 */
export type Recursive<Base, Shape> = {
  [P in keyof Shape]: Shape[P] extends Base ? Base : Recursive<Base, Shape[P]>
}

type UnknownRecursive = Recursive<unknown, unknown>

/**
 * Contains the same structure as the original object, but with all keys
 * being optional.
 */
export type PartialRecursive<Base, Shape> = {
  [P in keyof Shape]?: Shape[P] extends Base
    ? Shape[P]
    : PartialRecursive<Base, Shape[P]>
}

export type Local<Base, Shape extends Recursive<Base, unknown>> = {
  [P in keyof Shape]: Shape[P] extends Base ? Shape[P] : never
}
/**
 * Mask over animation. Set any key to `false` in order to mask out
 * that key and that key's subtree.
 * @example
const init = {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
// will only include {b: {x: number}} after the mask is applied
const mask: Mask<typeof init> = {a: false, b: {x: false}}
 */
export type Mask<T> = {
  [P in keyof T]: T[P] | boolean
}

export type HasChildren<Base, Shape> = {
  readonly children: {
    [P in keyof Shape]: Shape[P] extends Base
      ? never
      : HasChildren<Base, Shape[P]>
  }
}

export function perMaskedChild<Base, Shape extends UnknownRecursive>(
  anim: HasChildren<Base, Shape>,
  mask: Partial<Mask<Shape>>,
  fn: (child: HasChildren<Base, UnknownRecursive>) => void
) {
  const filteredChildren = Object.keys(anim.children).filter(
    key => mask == undefined || mask[key as keyof typeof mask] !== false
  )
  for (const key of filteredChildren) {
    const child = anim.children[key as keyof Shape]
    if (child) {
      fn(child as HasChildren<Base, UnknownRecursive>)
    }
    perMaskedChild(
      child as HasChildren<Base, UnknownRecursive>,
      (mask?.[key as keyof typeof mask] as Partial<
        Mask<UnknownRecursiveAnimatable>
      >) ?? undefined,
      fn
    )
  }
}
