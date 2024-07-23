[aninest](../../../index.md) / [Extensions/Update](../index.md) / UpdateLayer

# UpdateLayer\<Animating\>

```ts
type UpdateLayer<Animating>: Layer<Animating> & Object;
```

An update layer that can be mounted to an animation.
Allows listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame

## Type declaration

### subscribe

```ts
subscribe: (type, sub) => unsubscribe;
```

#### Parameters

• **type**: `"start"` \| `"end"` \| `"update"`

• **sub**: [`Listener`](../../../Listeners/type-aliases/Listener.md)\<[`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>\>

#### Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Source

[Animate/Extensions/update.ts:30](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/update.ts#L30)
