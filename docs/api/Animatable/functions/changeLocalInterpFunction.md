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

[Animate/Animatable.ts:552](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/core/src/Animate/Animatable.ts#L552)
