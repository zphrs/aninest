[aninest](../../index.md) / [Animatable](../index.md) / setLocalSnapGrid

# setLocalSnapGrid()

```ts
setLocalSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Sets a snap grid only for the top level of the animation.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **gridSize**: `Partial`\<[`LocalAnimatable`](../type-aliases/LocalAnimatable.md)\<`Animating`\>\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

`unsubscribe`

a function to remove the snap grid

## Source

[Animate/Animatable.ts:779](https://github.com/zphrs/aninest/blob/3be3895/src/Animate/Animatable.ts#L779)
