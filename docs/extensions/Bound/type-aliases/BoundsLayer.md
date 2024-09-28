[@aninest/extensions](../../index.md) / [Bound](../index.md) / BoundsLayer

# BoundsLayer\<Animating\>

```ts
type BoundsLayer<Animating>: object & Layer<Animating>;
```

A layer used to enforce minimum and maximum bounds on an animation.

## Type declaration

### update()

```ts
update: (bounds) => void | undefined;
```

#### Parameters

• **bounds**: `PartialFullBounds`\<`PartialRecursiveAnimatable`\<`Animating`\>\>

#### Returns

`void` \| `undefined`

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## See

[setupBoundsLayer](../functions/setupBoundsLayer.md) for how to create a BoundsLayer.

## Defined in

[../../extensions/src/bound.ts:211](https://github.com/zphrs/aninest/blob/4def9b51a0eda7ca5b3d63922b6674c9f9434175/extensions/src/bound.ts#L211)
