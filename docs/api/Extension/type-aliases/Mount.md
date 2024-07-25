[aninest](../../index.md) / [Extension](../index.md) / Mount

# Mount\<Animating\>

```ts
type Mount<Animating>: (anim) => unmount;
```

A function that mounts an extension to the animation.

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](unmount.md)

## Source

[Animate/Extension.ts:21](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extension.ts#L21)
