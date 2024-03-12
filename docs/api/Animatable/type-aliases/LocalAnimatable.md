[aninest](../../index.md) / [Animatable](../index.md) / LocalAnimatable

# LocalAnimatable\<T\>

```ts
type LocalAnimatable<T>: { [P in keyof T]: T[P] extends number ? number : undefined } & Animatable;
```

A local slice of the Animatable type.

## Example

```ts
const startingState = {a: {x: 0, y: 0}, b: 0}
// the following are the local slices of the type of the startingState:
// looking at the root level
{b: 0}
// looking at the 'a' child
{ x: 0, y: 0 }
```

## Type parameters

• **T**

## Source

[Animate/Animatable.ts:100](https://github.com/plexigraph/aninest/blob/5437bdd/src/Animate/Animatable.ts#L100)
