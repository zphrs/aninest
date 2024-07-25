[aninest](../../../index.md) / [Extensions/Snap](../index.md) / distanceLessThan

# distanceLessThan()

```ts
distanceLessThan<Animating, Point>(distance): ShouldSnap<Animating, Point>
```

Returns a function of whether the provided distance is smaller than the distance between the current state and an arbitrary point.
Mainly meant as a utility function for [setSnapPoint](setSnapPoint.md).

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

• **Point** extends [`PartialRecursive`](../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>

## Parameters

• **distance**: `number`

The threshold euclidean distance.

## Returns

[`ShouldSnap`](../type-aliases/ShouldSnap.md)\<`Animating`, `Point`\>

A function which returns whether the distance between the 
current state and the point is less than distance provided.

## Example

```ts
const dlt2 = distanceLessThan(2)
dlt2({x: 1, y: 1}, {x: 0, y: 0}) // true
```

## Source

[Animate/Extensions/snap.ts:204](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extensions/snap.ts#L204)
