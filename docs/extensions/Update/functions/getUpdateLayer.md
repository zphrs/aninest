[@aninest/extensions](../../index.md) / [Update](../index.md) / getUpdateLayer

# getUpdateLayer()

```ts
function getUpdateLayer<Animating>(queueNextUpdate): UpdateLayer<Animating>
```

Updates the animation every frame, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **done** - when the animation finishes animating everything
- **update** - each update frame

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **queueNextUpdate** = `requestAnimationFrame`

## Returns

[`UpdateLayer`](../type-aliases/UpdateLayer.md)\<`Animating`\>

## Defined in

[../../extensions/src/update.ts:110](https://github.com/zphrs/aninest/blob/8c5d5cec878cb0688cbcb852e4de66105e356f88/extensions/src/update.ts#L110)
