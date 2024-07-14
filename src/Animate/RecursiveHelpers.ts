/** @internal */

import { UnknownRecursiveAnimatable } from "./AnimatableTypes"
type ChildrenOfRecursive<Base, T> = {
  [P in keyof T]: T[P] extends Recursive<Base, unknown> ? T[P] : undefined
}

export function separateChildren<Base, T extends Recursive<Base, unknown>>(
  obj: T
): [Local<Base, T>, ChildrenOfRecursive<Base, T>] {
  const anim = {} as Local<Base, T>
  const children = {} as ChildrenOfRecursive<Base, T>
  for (const key in obj) {
    const value = obj[key]
    if (typeof value !== "object") {
      anim[key] = value as Local<Base, T>[keyof T]
    } else {
      children[key] = value as unknown as ChildrenOfRecursive<Base, T>[Extract<
        keyof T,
        string
      >]
    }
  }
  return [anim, children]
}

export type Recursive<Base, Shape> = {
  [P in keyof Shape]: Shape[P] extends Base ? Base : Recursive<Base, Shape[P]>
}

type UnknownRecursive = Recursive<unknown, unknown>

export type PartialRecursive<Base, Shape> = {
  [P in keyof Shape]?: Shape[P] extends Base
    ? Base
    : PartialRecursive<Base, Shape[P]>
}

export type Local<Base, Shape extends Recursive<Base, unknown>> = {
  [P in keyof Shape]: Shape[P] extends Base ? Base : undefined
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
      ? undefined
      : HasChildren<Base, Shape[P]>
  }
}

export function perMaskedChild<Base, Shape extends UnknownRecursive>(
  anim: HasChildren<Base, Shape>,
  mask: Partial<Mask<Shape>>,
  fn: (child: HasChildren<Base, UnknownRecursive>) => void
) {
  const filteredChildren = Object.keys(anim.children).filter(
    key => mask[key as keyof typeof mask] !== false
  )
  for (const key of filteredChildren) {
    const child = anim.children[key as keyof Shape]
    if (child) {
      fn(child as HasChildren<Base, UnknownRecursive>)
    }
    perMaskedChild(
      child as HasChildren<Base, UnknownRecursive>,
      mask[key as keyof typeof mask] as Partial<
        Mask<UnknownRecursiveAnimatable>
      >,
      fn
    )
  }
}
