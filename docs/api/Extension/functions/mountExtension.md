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

[Animate/Extension.ts:37](https://github.com/zphrs/aninest/blob/988b5e8ac7585d70f507e793229537041ab3eea8/core/src/Animate/Extension.ts#L37)
