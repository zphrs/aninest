[aninest](../../../index.md) / [Extensions/Snap](../index.md) / setSnapGrid

# setSnapGrid()

```ts
setSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Adds a grid to snap to.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **gridSize**: [`PartialRecursive`](../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

a function to remove the snap grid

## Example

```ts
setSnapGrid(anim, {x: 1, y: 1}) // will snap to integer values before ending
```

## Source

[Animate/Extensions/snap.ts:42](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Extensions/snap.ts#L42)
