[@aninest/extensions](../../index.md) / [Snap](../index.md) / distanceLessThan

# distanceLessThan()

```ts
function distanceLessThan<Animating, Point>(distance): ShouldSnap<Animating, Point>
```

Returns a function of whether the provided distance is smaller than the distance between the current state and an arbitrary point.
Mainly meant as a utility function for [setSnapPoint](setSnapPoint.md).

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

• **Point** *extends* `PartialRecursive`\<`number`, `Animating`\>

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

## Defined in

[../../extensions/src/snap.ts:240](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/extensions/src/snap.ts#L240)
