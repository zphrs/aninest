[aninest](../../index.md) / [Animatable](../index.md) / updateAnimation

# updateAnimation()

```ts
function updateAnimation<Animating>(anim, dt): boolean
```

Moves the animation forward by a certain amount of time.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **dt**: `number`

The timestep to increment the animation by. Must be positive.
If negative or zero and the interpolation function is not NO_INTERP then no-op.

## Returns

`boolean`

true if the animation needs to be updated again

## Defined in

<<<<<<< HEAD
[Animate/Animatable.ts:406](https://github.com/zphrs/aninest/tree//core/src/Animate/Animatable.ts#L406)
=======
[Animate/Animatable.ts:406](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Animatable.ts#L406)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
