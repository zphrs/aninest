[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / boundAnimation

# boundAnimation()

```ts
boundAnimation<Animating>(anim, bounds): void
```

Modifies the bounds of an object, changing what the animation is currently interpolating to.
Note: you might have to call `updateAnimationInfo` after this to make sure the animation is updated,
if the current state is outside the new bounds.
You can also call `animationNeedsUpdate` to check if the animation needs to be updated before calling `updateAnimationInfo`.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation to modify

• **bounds**: `undefined` \| `Partial`\<`Bounds`\<`PartialRecursiveAnimatable`\<`Animating`\>\>\>

The new bounds to set. They can be partial and will be merged with the old bounds.

## Returns

`void`

## Example

```ts
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
upper: { a: 1, b: 1 },
})
modifyTo(anim, { a: 2 }) // will animate out to `a: 2` and then bounce back to `a: 1`
...// run updateAnimationInfo in a loop here
modifyAnimationBounds(anim, {
lower: { b: -1 },
})
```

## Source

[Animate/Animatable.ts:389](https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L389)