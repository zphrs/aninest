[aninest](../../index.md) / [AnimatableTypes](../index.md) / Animatable

# Animatable

```ts
type Animatable: Object;
```

The local state of the animation, meaning only the numbers in the topmost 
level of the animation.

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

[Animate/AnimatableTypes.ts:22](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/AnimatableTypes.ts#L22)