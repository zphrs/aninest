[@aninest/extensions](../../index.md) / [Update](../index.md) / getUpdateLayer

# getUpdateLayer()

```ts
function getUpdateLayer<Animating>(): UpdateLayer<Animating>
```

Updates the animation every frame, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Returns

[`UpdateLayer`](../type-aliases/UpdateLayer.md)\<`Animating`\>

## Defined in

[../../extensions/src/update.ts:48](https://github.com/zphrs/aninest/blob/b669292333243ef725d764f354c403b2c4bde014/extensions/src/update.ts#L48)
