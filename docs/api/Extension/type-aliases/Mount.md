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

[Animate/Extension.ts:21](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/core/src/Animate/Extension.ts#L21)
