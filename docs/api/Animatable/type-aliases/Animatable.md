[aninest](../../index.md) / [Animatable](../index.md) / Animatable

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

[Animate/Animatable.ts:25](https://github.com/zphrs/aninest/blob/df0807b/src/Animate/Animatable.ts#L25)
