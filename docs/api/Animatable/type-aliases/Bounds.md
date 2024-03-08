[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / Bounds

# Bounds\<T\>

```ts
type Bounds<T>: Object;
```

The bounds of the animation. The animation will be loosely clamped to these bounds.

## Example

```ts
// Assuming the animation is of type {a: Vec2, b: Vec2}:
const bounds = {
 lower: { a: {x: 0, y: 0}, b: {x: 0} },
 upper: { a: {x: 1, y: 1} }
} // note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.
```

## Type parameters

• **T**

## Type declaration

### lower

```ts
lower: Partial<T>;
```

### upper

```ts
upper: Partial<T>;
```

## Source

[Animate/Animatable.ts:32](https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L32)
