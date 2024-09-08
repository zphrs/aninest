[aninest](../../index.md) / [Vec2](../index.md) / lerp

# lerp()

```ts
function lerp(
   v1, 
   v2, 
   time): Vec2
```

Performs a linear interpolation between two vectors by a time value.

## Parameters

• **v1**: [`Vec2`](../type-aliases/Vec2.md)

The start vector.

• **v2**: [`Vec2`](../type-aliases/Vec2.md)

The end vector.

• **time**: `number`

The time value to interpolate by (should be between 0 and 1).

## Returns

[`Vec2`](../type-aliases/Vec2.md)

A new vector.

## Defined in

[Utils/vec2.ts:223](https://github.com/zphrs/aninest/blob/93165c72e5bf58f07554172fb8f04e60bd3cd7ed/core/src/Utils/vec2.ts#L223)
