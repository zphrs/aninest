[@aninest/extensions](../../index.md) / [Update](../index.md) / getUpdateLayer

# getUpdateLayer()

```ts
function getUpdateLayer<Animating>(queueNextUpdate): UpdateLayer<Animating>
```

Updates the animation every frame, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **queueNextUpdate** = `requestAnimationFrame`

## Returns

[`UpdateLayer`](../type-aliases/UpdateLayer.md)\<`Animating`\>

## Defined in

[../../extensions/src/update.ts:104](https://github.com/zphrs/aninest/blob/faa26c191e539bfffb0686de3335249d40ae5db1/extensions/src/update.ts#L104)
