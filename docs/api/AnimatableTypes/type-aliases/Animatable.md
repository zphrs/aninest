[aninest](../../index.md) / [AnimatableTypes](../index.md) / Animatable

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

<<<<<<< HEAD
[Animate/AnimatableTypes.ts:22](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableTypes.ts#L22)
=======
 \[`key`: `string`\]: `number`

## Source

[Animate/AnimatableTypes.ts:22](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableTypes.ts#L22)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
