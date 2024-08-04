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

[../../extensions/src/bound.ts:210](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/extensions/src/bound.ts#L210)
