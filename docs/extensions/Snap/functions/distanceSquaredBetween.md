[@aninest/extensions](../../index.md) / [Snap](../index.md) / distanceSquaredBetween

# distanceSquaredBetween()

```ts
function distanceSquaredBetween<Animating, Point>(point, currentState): number
```

Measures the squared euclidean distance between the point and the currentState across the features in the point.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

• **Point** *extends* `PartialRecursive`\<`number`, `Animating`\>

## Parameters

• **point**: `Point`

An arbitrary point ex. if `Animating = {x: number, y: number, z: number}` then point could be `{x: number, y: number}`

• **currentState**: `RecursiveAnimatable`\<`Animating`\>

## Returns

`number`

The squared euclidean distance between the point and the currentState across the features in the point.

## Example

```ts
const anim = createAnimation({x: 0, y: 0, z: 0}, getLinearInterp(1))
const point = {x: 1, y: 1}
const distSquared = distanceSquaredBetween(point, getStateTree(anim)) // 2
```

## Defined in

[../../extensions/src/snap.ts:264](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/extensions/src/snap.ts#L264)
