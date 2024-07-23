[aninest](../../index.md) / [AnimatableTypes](../index.md) / PartialRecursiveAnimatable

# PartialRecursiveAnimatable\<T\>

```ts
type PartialRecursiveAnimatable<T>: PartialRecursive<number, T>;
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

[Animate/AnimatableTypes.ts:83](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/AnimatableTypes.ts#L83)
