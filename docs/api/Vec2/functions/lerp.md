[aninest](../../index.md) / [Vec2](../index.md) / lerp

# lerp()

```ts
lerp(
   v1, 
   v2, 
   time): Object
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

[Utils/vec2.ts:220](https://github.com/plexigraph/aninest/blob/9e50535/src/Utils/vec2.ts#L220)
