[aninest](../../../index.md) / [Extensions/Snap](../index.md) / distanceSquaredBetween

# distanceSquaredBetween()

```ts
distanceSquaredBetween<Animating, Point>(point, currentState): number
```

Measures the squared euclidean distance between the point and the currentState across the features in the point.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

• **Point** extends [`PartialRecursive`](../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>

## Parameters

• **point**: `Point`

An arbitrary point ex. if `Animating = {x: number, y: number, z: number}` then point could be `{x: number, y: number}`

• **currentState**: [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `Animating`\>

## Returns

`number`

The squared euclidean distance between the point and the currentState across the features in the point.

## Example

```ts
const anim = createAnimation({x: 0, y: 0, z: 0}, getLinearInterp(1))
const point = {x: 1, y: 1}
const distSquared = distanceSquaredBetween(point, getStateTree(anim)) // 2
```

## Source

[Animate/Extensions/snap.ts:228](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/snap.ts#L228)
