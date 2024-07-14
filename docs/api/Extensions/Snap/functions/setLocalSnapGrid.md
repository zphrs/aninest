[aninest](../../../index.md) / [Extensions/Snap](../index.md) / setLocalSnapGrid

# setLocalSnapGrid()

```ts
setLocalSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Sets a snap grid only for the top level of the animation.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **gridSize**: `Partial`\<[`LocalAnimatable`](../../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<`Animating`\>\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

a function to remove the snap grid

## Source

Animate/Extensions/snap.ts:74
