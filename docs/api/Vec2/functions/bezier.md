[aninest](../../index.md) / [Vec2](../index.md) / bezier

# bezier()

```ts
function bezier(
   v1, 
   v2, 
   p1, 
   p2, 
   time): Vec2
```

Performs a bezier interpolation between two vectors by a time value.

## Parameters

• **v1**: [`Vec2`](../type-aliases/Vec2.md)

The start vector.

• **v2**: [`Vec2`](../type-aliases/Vec2.md)

The end vector.

• **p1**: [`Vec2`](../type-aliases/Vec2.md)

Control point 1.

• **p2**: [`Vec2`](../type-aliases/Vec2.md)

Control point 2.

• **time**: `number`

The time value to interpolate by (should be between 0 and 1).

## Returns

[`Vec2`](../type-aliases/Vec2.md)

A new vector.

## Defined in

[Utils/vec2.ts:235](https://github.com/zphrs/aninest/blob/4def9b51a0eda7ca5b3d63922b6674c9f9434175/core/src/Utils/vec2.ts#L235)
