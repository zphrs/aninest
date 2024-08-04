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

[Animate/AnimatableTypes.ts:64](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/core/src/Animate/AnimatableTypes.ts#L64)
