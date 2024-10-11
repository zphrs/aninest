[aninest root](../../index.md) / [AnimatableTypes](../index.md) / PartialRecursiveAnimatable

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

[Animate/AnimatableTypes.ts:85](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/core/src/Animate/AnimatableTypes.ts#L85)
