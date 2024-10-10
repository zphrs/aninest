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

[Animate/Extension.ts:21](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/Extension.ts#L21)
