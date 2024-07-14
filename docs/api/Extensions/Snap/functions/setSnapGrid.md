[aninest](../../../index.md) / [Extensions/Snap](../index.md) / setSnapGrid

# setSnapGrid()

```ts
setSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Adds a grid to snap to.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **gridSize**: [`PartialRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

a function to remove the snap grid

## Example

```ts
setSnapGrid(anim, {x: 1, y: 1}) // will snap to integer values before ending
```

## Source

Animate/Extensions/snap.ts:42
