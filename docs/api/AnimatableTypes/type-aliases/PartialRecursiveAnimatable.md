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

<<<<<<< HEAD
[Animate/AnimatableTypes.ts:85](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableTypes.ts#L85)
=======
• **T**

## Source

[Animate/AnimatableTypes.ts:83](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableTypes.ts#L83)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
