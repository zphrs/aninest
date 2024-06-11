[aninest](../../index.md) / [Animatable](../index.md) / distanceSquaredBetween

# distanceSquaredBetween()

```ts
distanceSquaredBetween<Animating, Point>(point, currentState): number
```

Measures the squared euclidean distance between the point and the current state only on the subset of features of the point.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **Point** extends [`PartialRecursiveAnimatable`](../type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>

## Parameters

• **point**: `Point`

An arbitrary point ex. if `Animating = {x: number, y: number, z: number}` then point could be `{x: number, y: number}`

• **currentState**: [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`Animating`\>

## Returns

`number`

## Example

```ts
const anim = createAnimation({x: 0, y: 0, z: 0}, getLinearInterp(1))
const point = {x: 1, y: 1}
const distSquared = distanceSquaredBetween(point, getStateTree(anim)) // 2
```

## Source

[Animate/Animatable.ts:890](https://github.com/zphrs/aninest/blob/a2c9b37/src/Animate/Animatable.ts#L890)
