[aninest](../../index.md) / [Animatable](../index.md) / changeLocalInterpFunction

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

[Animate/Animatable.ts:552](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/Animatable.ts#L552)
