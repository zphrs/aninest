[aninest](../../index.md) / [Animatable](../index.md) / updateAnimation

# updateAnimation()

```ts
updateAnimation<Animating>(anim, dt): boolean
```

Moves forward in the animation by a certain amount of time.

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

[Animate/Animatable.ts:797](https://github.com/zphrs/aninest/blob/2327e64/src/Animate/Animatable.ts#L797)
