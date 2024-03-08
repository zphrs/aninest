[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / updateAnimation

# updateAnimation()

```ts
updateAnimation<Animating>(anim, dt): boolean
```

Updates the animation by incrementing the current timestamp of the animation by `dt`.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **dt**: `number`

The time to increment the animation by. Must be positive. If negative or zero then no-op.

## Returns

`boolean`

whether the animation needs to be updated again

## Source

[Animate/Animatable.ts:509](https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L509)
