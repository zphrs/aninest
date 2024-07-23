[aninest](../../../index.md) / [Extensions/Bound](../index.md) / Bounds

# Bounds\<Animating\>

```ts
type Bounds<Animating>: PartialFullBounds<PartialRecursiveAnimatable<Animating>>;
```

The bounds of the animation, which means that all values within
the bounds are optional, including the the `upper` and `lower` objects.
The animation will be loosely clamped to these bounds.

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

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Source

[Animate/Extensions/bound.ts:62](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Extensions/bound.ts#L62)