[aninest](../../../index.md) / [Extensions/Update](../index.md) / getUpdateLayer

# getUpdateLayer()

```ts
getUpdateLayer<Animating>(): UpdateLayer<Animating>
```

Updates the animation every frame, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Returns

[`UpdateLayer`](../type-aliases/UpdateLayer.md)\<`Animating`\>

## Source

[Animate/Extensions/update.ts:45](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/update.ts#L45)
