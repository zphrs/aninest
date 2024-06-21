import { LocalAnimatable, RecursiveAnimatable } from "./AnimatableTypes"
type ChildrenOfRecursiveAnimatable<T> = {
  [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? T[P] : undefined
}

export function separateChildren<T extends RecursiveAnimatable<unknown>>(
  obj: T
): [LocalAnimatable<T>, ChildrenOfRecursiveAnimatable<T>] {
  const anim = {} as LocalAnimatable<T>
  const children = {} as ChildrenOfRecursiveAnimatable<T>
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === "number") {
      anim[key] = value as LocalAnimatable<T>[Extract<keyof T, string>]
    } else {
      children[key] =
        value as unknown as ChildrenOfRecursiveAnimatable<T>[Extract<
          keyof T,
          string
        >]
    }
  }
  return [anim, children]
}
