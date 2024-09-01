[@aninest/extensions](../../index.md) / [Snap](../index.md) / setLocalSnapGrid

# setLocalSnapGrid()

```ts
function setLocalSnapGrid<Animating>(anim, gridSize): unsubscribe
```

Sets a snap grid only for the top level of the animation.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **gridSize**: `Partial`\<`LocalAnimatable`\<`Animating`\>\>

A dictionary of the size of each grid square for each variable. Ex: `{x: 1, y: 1}`

## Returns

`unsubscribe`

a function to remove the snap grid

## Defined in

[../../extensions/src/snap.ts:76](https://github.com/zphrs/aninest/blob/b669292333243ef725d764f354c403b2c4bde014/extensions/src/snap.ts#L76)
