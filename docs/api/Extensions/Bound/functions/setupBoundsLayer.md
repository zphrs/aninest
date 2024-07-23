[aninest](../../../index.md) / [Extensions/Bound](../index.md) / setupBoundsLayer

# setupBoundsLayer()

```ts
setupBoundsLayer<Animating>(
   anim, 
   bounds, 
mask): BoundsLayer<Animating>
```

Sets up a bounds layer for an animation.
Allows for the animation's bounds to be dynamically changed.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **bounds**: `Partial`\<`FullBounds`\<[`PartialRecursive`](../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>\>\>

• **mask**: `Partial`\<[`Mask`](../../../RecursiveHelpers/type-aliases/Mask.md)\<`Animating`\>\>= `{}`

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

[Animate/Extensions/bound.ts:80](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/bound.ts#L80)
