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

[Animate/AnimatableTypes.ts:85](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/AnimatableTypes.ts#L85)
