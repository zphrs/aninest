[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / PartialBounds

# PartialBounds\<T\>

```ts
type PartialBounds<T>: Partial<Bounds<T>>;
```

The partial bounds of the animation, making the lower and upper bounds optional.

## See

[Bounds](Bounds.md) for the full bounds type and for further explanation of the bounds.

## Example

```ts
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
 lower: { a: {x: 0, y: 0}, b: {x: 0} },
} // Note that there are no upper bounds
```

## Type parameters

• **T**

## Source

[Animate/Animatable.ts:47](https://github.com/plexigraph/aninest/blob/c1a56b4/src/Animate/Animatable.ts#L47)
