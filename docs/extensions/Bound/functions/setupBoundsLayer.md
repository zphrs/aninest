[@aninest/extensions](../../index.md) / [Bound](../index.md) / setupBoundsLayer

# setupBoundsLayer()

```ts
function setupBoundsLayer<Animating>(
   anim, 
   bounds, 
mask): BoundsLayer<Animating>
```

Sets up a bounds layer for an animation.
Allows for the animation's bounds to be dynamically changed.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **bounds**: `Partial`\<`FullBounds`\<`PartialRecursive`\<`number`, `Animating`\>\>\>

• **mask**: `Partial`\<`Mask`\<`Animating`\>\> = `{}`

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

## Defined in

[../../extensions/src/bound.ts:84](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/extensions/src/bound.ts#L84)
