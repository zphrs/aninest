[aninest](../../index.md) / [Extensions](../index.md) / mountExtension

# mountExtension()

```ts
mountExtension<Animating>(extension, anim): unmount
```

A function that mounts the extension to the animation.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **extension**: [`Extension`](../type-aliases/Extension.md)\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](../type-aliases/unmount.md)

A function that unmounts the extension from the animation.

## Source

Animate/Extensions/index.ts:42
