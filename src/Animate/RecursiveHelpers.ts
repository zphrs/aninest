import { Mask, UnknownRecursiveAnimatable } from "./AnimatableTypes"
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

export type HasChildren<Base, Shape, Rest> = Rest & {
  readonly children: {
    [P in keyof Shape]: Shape[P] extends Base
      ? undefined
      : HasChildren<Base, Shape[P], Rest>
  }
}

export function perMaskedChild<Base, R extends UnknownRecursive, Rest>(
  anim: HasChildren<Base, R, unknown>,
  mask: Partial<Mask<R>>,
  fn: (child: HasChildren<Base, UnknownRecursive, Rest>) => void
) {
  const filteredChildren = Object.keys(anim.children).filter(
    key => mask[key as keyof typeof mask] !== false
  )
  for (const key of filteredChildren) {
    const child = anim.children[key as keyof R]
    if (child) {
      fn(child as HasChildren<Base, UnknownRecursive, Rest>)
    }
    perMaskedChild(
      child as HasChildren<Base, UnknownRecursive, unknown>,
      mask[key as keyof typeof mask] as Partial<
        Mask<UnknownRecursiveAnimatable>
      >,
      fn
    )
  }
}
