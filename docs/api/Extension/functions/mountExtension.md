[aninest](../../index.md) / [Extension](../index.md) / mountExtension

# mountExtension()

```ts
mountExtension<Animating>(extension, anim): unmount
```

A function that mounts an extension to the animation.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **extension**: [`Extension`](../type-aliases/Extension.md)\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](../type-aliases/unmount.md)

A function that unmounts an extension from the animation.

## Source

[Animate/Extension.ts:37](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extension.ts#L37)
