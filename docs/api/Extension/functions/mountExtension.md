[aninest root](../../index.md) / [Extension](../index.md) / mountExtension

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

[Animate/Extension.ts:37](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/Extension.ts#L37)
