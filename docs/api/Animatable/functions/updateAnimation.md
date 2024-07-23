[aninest](../../index.md) / [Animatable](../index.md) / updateAnimation

# updateAnimation()

```ts
updateAnimation<Animating>(anim, dt): boolean
```

Moves the animation forward by a certain amount of time.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **dt**: `number`

The timestep to increment the animation by. Must be positive.
If negative or zero and the interpolation function is not NO_INTERP then no-op.

## Returns

`boolean`

true if the animation needs to be updated again

## Source

[Animate/Animatable.ts:406](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Animatable.ts#L406)
