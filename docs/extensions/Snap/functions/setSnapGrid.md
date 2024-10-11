[@aninest/extensions](../../index.md) / [Snap](../index.md) / setSnapGrid

# setSnapGrid()

```ts
function setSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Adds a grid to snap to.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **gridSize**: `PartialRecursive`\<`number`, `Animating`\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

`unsubscribe`

a function to remove the snap grid

## Example

```ts
setSnapGrid(anim, {x: 1, y: 1}) // will snap to integer values before ending
```

## Defined in

[../../extensions/src/snap.ts:44](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/extensions/src/snap.ts#L44)
