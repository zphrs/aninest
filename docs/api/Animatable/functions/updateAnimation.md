[aninest](../../index.md) / [Animatable](../index.md) / updateAnimation

# updateAnimation()

```ts
updateAnimation<Animating>(anim, dt): boolean
```

Moves forward in the animation by a certain amount of time.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **dt**: `number`

The time to increment the animation by. Must be positive. If negative or zero then no-op.

## Returns

`boolean`

true if the animation needs to be updated again

## Source

[Animate/Animatable.ts:373](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/Animatable.ts#L373)
