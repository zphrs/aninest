[aninest](../../index.md) / [Animatable](../index.md) / setSnapGrid

# setSnapGrid()

```ts
setSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Adds a grid to snap to.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **gridSize**: [`PartialRecursiveAnimatable`](../type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

`unsubscribe`

a function to remove the snap grid

## Example

```ts
setSnapGrid(anim, {x: 1, y: 1}) // will snap to integer values before ending
```

## Source

[Animate/Animatable.ts:748](https://github.com/zphrs/aninest/blob/729a7d6/src/Animate/Animatable.ts#L748)
