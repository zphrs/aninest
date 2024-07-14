[aninest](../../../index.md) / [Extensions/Bound](../index.md) / BoundsLayer

# BoundsLayer\<Animating\>

```ts
type BoundsLayer<Animating>: Object & Layer<Animating>;
```

A layer used to enforce min and max bounds on an animation.

## See

[setupBoundsLayer](../functions/setupBoundsLayer.md) for how to create a BoundsLayer.

## Type declaration

### update

```ts
update: (bounds) => void | undefined;
```

#### Parameters

• **bounds**: [`PartialBounds`](PartialBounds.md)\<[`PartialRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>\>

#### Returns

`void` \| `undefined`

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Source

Animate/Extensions/bound.ts:184
