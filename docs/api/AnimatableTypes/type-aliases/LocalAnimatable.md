[aninest](../../index.md) / [AnimatableTypes](../index.md) / LocalAnimatable

# LocalAnimatable\<T\>

```ts
type LocalAnimatable<T>: { [P in keyof T]: T[P] extends number ? number : undefined } & Animatable;
```

A local slice of the Animatable type.

## Type Parameters

• **T**

## Example

```ts
const startingState = {a: {x: 0, y: 0}, b: 0}
// the following are the local slices of the type of the startingState:
// looking at the root level
{b: 0}
// looking at the 'a' child
{ x: 0, y: 0 }
```

## Defined in

<<<<<<< HEAD
[Animate/AnimatableTypes.ts:64](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableTypes.ts#L64)
=======
• **T**

## Source

[Animate/AnimatableTypes.ts:62](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableTypes.ts#L62)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
