[@plexigraph/aninest](../../index.md) / [Vec2](../index.md) / bezier

# bezier()

```ts
bezier(
   v1, 
   v2, 
   p1, 
   p2, 
   time): Object
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

`Object`

A new vector.

### x

```ts
x: number;
```

### y

```ts
y: number;
```

## Source

[Utils/vec2.ts:232](https://github.com/plexigraph/aninest/blob/bb3b3dd/src/Utils/vec2.ts#L232)
