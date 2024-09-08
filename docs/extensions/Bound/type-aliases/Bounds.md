[@aninest/extensions](../../index.md) / [Bound](../index.md) / Bounds

# Bounds\<Animating\>

```ts
type Bounds<Animating>: PartialFullBounds<PartialRecursiveAnimatable<Animating>>;
```

The bounds of the animation, which means that all values within
the bounds are optional, including the the `upper` and `lower` objects.
The animation will be loosely clamped to these bounds.

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## See

[setupBoundsLayer](../functions/setupBoundsLayer.md) for how to apply bounds to an animation.

## Example

```ts
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds: PartialRecursiveBounds<{a: Vec2, b: Vec2}> = {
 lower: { a: {x: 0, y: 0}, b: {x: 0} },
 upper: { a: {x: 1, y: 1} }
} // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
```

## Defined in

[../../extensions/src/bound.ts:66](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/extensions/src/bound.ts#L66)
