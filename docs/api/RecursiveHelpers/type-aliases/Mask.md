[aninest](../../index.md) / [RecursiveHelpers](../index.md) / Mask

# Mask\<T\>

```ts
type Mask<T>: { [P in keyof T]: T[P] | boolean };
```

Mask over animation. Set any key to `false` in order to mask out
that key and that key's subtree.

## Type Parameters

• **T**

## Example

```ts
const init = {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
// will only include {b: {x: number}} after the mask is applied
const mask: Mask<typeof init> = {a: false, b: {x: false}}
```

## Defined in

[Animate/RecursiveHelpers.ts:63](https://github.com/zphrs/aninest/blob/3019702e634994a4353fce5adc21aa1a16369bbd/core/src/Animate/RecursiveHelpers.ts#L63)
