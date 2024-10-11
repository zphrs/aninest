[aninest root](../../index.md) / [Animatable](../index.md) / changeLocalInterpFunction

# changeLocalInterpFunction()

```ts
function changeLocalInterpFunction<Animating>(anim, interp): void
```

Updates the interpolation function of the animation only for the topmost level.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **interp**: [`Interp`](../../module:Interp/type-aliases/Interp.md)

## Returns

`void`

## Defined in

[Animate/Animatable.ts:552](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/Animatable.ts#L552)
