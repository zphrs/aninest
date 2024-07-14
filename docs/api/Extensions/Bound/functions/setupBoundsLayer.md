[aninest](../../../index.md) / [Extensions/Bound](../index.md) / setupBoundsLayer

# setupBoundsLayer()

```ts
setupBoundsLayer<Animating>(anim, bounds): BoundsLayer<Animating>
```

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **bounds**: `Partial`\<[`Bounds`](../type-aliases/Bounds.md)\<[`PartialRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>\>\>

## Returns

[`BoundsLayer`](../type-aliases/BoundsLayer.md)\<`Animating`\>

## Example

```ts
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
const bounds = {
   lower: { a: 0, b: 0 },
   upper: { a: 1, b: 1 }
}
const {unsub, updateBounds} = initializeBounds(anim, bounds)
updateBounds({lower: {a: 0.5}})
```

## Source

Animate/Extensions/bound.ts:64
