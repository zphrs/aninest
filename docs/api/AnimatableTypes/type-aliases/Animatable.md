[aninest root](../../index.md) / [AnimatableTypes](../index.md) / Animatable

# Animatable

```ts
type Animatable: object;
```

The local state of the animation, meaning only the numbers in the topmost 
level of the animation.

## Index Signature

 \[`key`: `string`\]: `number`

## Example

```ts
const startingState = {a: {x: 0, y: 0}, b: 0}
// Looking at the root level:
{b: 0}
// Looking at the 'a' child:
{ x: 0, y: 0 }
```

## Defined in

[Animate/AnimatableTypes.ts:22](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/core/src/Animate/AnimatableTypes.ts#L22)
