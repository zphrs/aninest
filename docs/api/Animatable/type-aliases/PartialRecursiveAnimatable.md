[aninest](../../index.md) / [Animatable](../index.md) / PartialRecursiveAnimatable

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

[Animate/Animatable.ts:125](https://github.com/plexigraph/aninest/blob/5437bdd/src/Animate/Animatable.ts#L125)
