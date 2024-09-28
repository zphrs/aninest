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

[Utils/vec2.ts:223](https://github.com/zphrs/aninest/blob/ba102fd602fb72315102b5ca371477900b4b57ce/core/src/Utils/vec2.ts#L223)
