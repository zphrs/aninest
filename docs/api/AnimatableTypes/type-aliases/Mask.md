[aninest](../../index.md) / [AnimatableTypes](../index.md) / Mask

# Mask\<T\>

```ts
type Mask<T>: { [P in keyof T]: T[P] | boolean };
```

Mask over animation. Set any key to `false` in order to mask out
that key and that key's subtree.

## Example

```ts
const init = {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
// will only include {b: {x: number}} after the mask is applied
const mask: Mask<typeof init> = {a: false, b: {x: false}}
```

## Type parameters

• **T**

## Source

[Animate/AnimatableTypes.ts:127](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/AnimatableTypes.ts#L127)
