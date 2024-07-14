[aninest](../../index.md) / [AnimatableTypes](../index.md) / PartialRecursiveAnimatable

# PartialRecursiveAnimatable\<T\>

```ts
type PartialRecursiveAnimatable<T>: { [P in keyof T]?: T[P] extends number ? number : PartialRecursiveAnimatable<T[P]> };
```

A subtree of the Animatable type.

## Example

```ts
const startingState: RecursiveAnimatable<{a: number, b: number}> = {a: {x: 0, y: 0}}
// the following are all valid partial states of the type of the startingState:
// example 3
{
a: {x: 1, y: 1}
}
// example 2
{
 a: {x: 1}
}
// example 1
{}
```

## Type parameters

• **T**

## Source

[Animate/AnimatableTypes.ts:113](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/AnimatableTypes.ts#L113)
