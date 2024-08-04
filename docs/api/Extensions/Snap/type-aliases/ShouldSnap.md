[aninest](../../../index.md) / [Extensions/Snap](../index.md) / ShouldSnap

# ShouldSnap\<Animating, Point\>

```ts
type ShouldSnap<Animating, Point>: (point, currentState) => boolean;
```

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **Point** extends [`PartialRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/PartialRecursiveAnimatable.md)\<`Animating`\>

## Parameters

• **point**: `Point`

• **currentState**: `Animating`

## Returns

`boolean`

## Source

[Animate/Extensions/snap.ts:122](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extensions/snap.ts#L122)