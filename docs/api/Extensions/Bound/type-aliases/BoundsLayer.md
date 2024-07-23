[aninest](../../../index.md) / [Extensions/Bound](../index.md) / BoundsLayer

# BoundsLayer\<Animating\>

```ts
type BoundsLayer<Animating>: Object & Layer<Animating>;
```

A layer used to enforce minimum and maximum bounds on an animation.

## See

[setupBoundsLayer](../functions/setupBoundsLayer.md) for how to create a BoundsLayer.

## Type declaration

### update

```ts
update: (bounds) => void | undefined;
```

Updates and overrides the previously set bounds, similar to how [modifyTo](../../../Animatable/functions/modifyTo.md) works.
A bound updated with this function will apply immediately rather than waiting for
the animation to end before snapping the state to be within the bound.

#### Parameters

• **bounds**: `PartialFullBounds`\<[`PartialRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>\>

#### Returns

`void` \| `undefined`

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Source

[Animate/Extensions/bound.ts:206](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Extensions/bound.ts#L206)
