[aninest](../../index.md) / [Extension](../index.md) / Mount

# Mount()\<Animating\>

```ts
type Mount<Animating>: (anim) => unmount;
```

A function that mounts an extension to the animation.

## Type Parameters

• **Animating** *extends* [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](unmount.md)

## Defined in

[Animate/Extension.ts:21](https://github.com/zphrs/aninest/blob/4def9b51a0eda7ca5b3d63922b6674c9f9434175/core/src/Animate/Extension.ts#L21)
