[aninest](../../index.md) / [AnimatableTypes](../index.md) / PartialRecursiveAnimatable

# PartialRecursiveAnimatable\<T\>

```ts
type PartialRecursiveAnimatable<T>: PartialRecursive<number, T>;
```

A subtree of the Animatable type.

## Type Parameters

• **T**

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

## Defined in

[Animate/AnimatableTypes.ts:85](https://github.com/zphrs/aninest/blob/765f2ede3df887f1f3a3e1391afab09a932de29a/core/src/Animate/AnimatableTypes.ts#L85)
