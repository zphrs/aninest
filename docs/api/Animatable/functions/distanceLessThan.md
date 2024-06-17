[aninest](../../index.md) / [Animatable](../index.md) / distanceLessThan

# distanceLessThan()

```ts
distanceLessThan<Animating, Point>(distance): (point, currentState) => boolean
```

Returns a function of whether the distance across the features of the point is closer than the given distance to the current state.
Mainly meant as a utility function for [setSnapPoint](setSnapPoint.md).

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **Point** extends [`PartialRecursiveAnimatable`](../type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>

## Parameters

• **distance**: `number`

## Returns

`Function`

> ### Parameters
>
> • **point**: `Point`
>
> • **currentState**: [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`Animating`\>
>
> ### Returns
>
> `boolean`
>

## Example

```ts
const dlt2 = distanceLessThan(2)
dlt2({x: 1, y: 1}, {x: 0, y: 0}) // true
```

## Source

[Animate/Animatable.ts:874](https://github.com/zphrs/aninest/blob/729a7d6/src/Animate/Animatable.ts#L874)
