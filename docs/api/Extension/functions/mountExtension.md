[aninest](../../index.md) / [Extension](../index.md) / mountExtension

# mountExtension()

```ts
function mountExtension<Animating>(extension, anim): unmount
```

A function that mounts an extension to the animation.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **extension**: [`Extension`](../type-aliases/Extension.md)\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](../type-aliases/unmount.md)

A function that unmounts an extension from the animation.

## Defined in

[Animate/Extension.ts:37](https://github.com/zphrs/aninest/blob/ba102fd602fb72315102b5ca371477900b4b57ce/core/src/Animate/Extension.ts#L37)
