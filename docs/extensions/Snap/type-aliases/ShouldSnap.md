[@aninest/extensions](../../index.md) / [Snap](../index.md) / ShouldSnap

# ShouldSnap()\<Animating, Point\>

```ts
type ShouldSnap<Animating, Point>: (point, currentState) => boolean;
```

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

• **Point** *extends* `PartialRecursiveAnimatable`\<`Animating`\>

## Parameters

• **point**: `Point`

• **currentState**: `Animating`

## Returns

`boolean`

## Defined in

[../../extensions/src/snap.ts:124](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/extensions/src/snap.ts#L124)