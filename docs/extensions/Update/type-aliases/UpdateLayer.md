[@aninest/extensions](../../index.md) / [Update](../index.md) / UpdateLayer

# UpdateLayer\<Animating\>

```ts
type UpdateLayer<Animating>: Layer<Animating> & object;
```

An update layer that can be mounted to an animation.
Allows listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame

## Type declaration

### subscribe()

```ts
subscribe: (type, sub) => unsubscribe;
```

#### Parameters

• **type**: `"start"` \| `"end"` \| `"update"`

• **sub**: `Listener`\<`Animation`\<`Animating`\>\>

#### Returns

`unsubscribe`

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## Defined in

[../../extensions/src/update.ts:33](https://github.com/zphrs/aninest/blob/b669292333243ef725d764f354c403b2c4bde014/extensions/src/update.ts#L33)
