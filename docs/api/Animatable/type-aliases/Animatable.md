[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / Animatable

# Animatable

```ts
type Animatable: Object;
```

The local state of the animation, meaning only the numbers in the topmost level of the input animation.

## Example

```ts
const startingState = {a: {x: 0, y: 0}, b: 0}
// Looking at the root level:
{b: 0}
// Looking at the 'a' child:
{ x: 0, y: 0 }
```

## Index signature

 \[`key`: `string`\]: `number`

## Source

[Animate/Animatable.ts:20](https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L20)
