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
- **updateWithDeltaTime** - each update frame with the time since the last update
- **afterUpdate** - after each update frame
- **childStart** - when a child UpdateLayer starts to be updated
- **childEnd** - when a child UpdateLayer finishes animating everything, including its children

## Type declaration

### setParent()

```ts
setParent: (parentLayer) => unsubscribe;
```

#### Parameters

• **parentLayer**: [`UpdateLayer`](UpdateLayer.md)\<`UnknownRecursiveAnimatable`\>

#### Returns

`unsubscribe`

### subscribe()

#### Type Parameters

• **Event** *extends* `UpdateLayerEvents`

#### Parameters

• **type**: `Event`

• **sub**: `Event` *extends* `"updateWithDeltaTime"` ? `Listener`\<`number`\> : `Event` *extends* `ChildEvents` ? `Listener`\<`InternalUpdateLayer`\<`RecursiveAnimatable`\<`unknown`\>\>\> : `Listener`\<`Animation`\<`Animating`\>\>

#### Returns

`unsubscribe`

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## Defined in

[../../extensions/src/update.ts:53](https://github.com/zphrs/aninest/blob/93165c72e5bf58f07554172fb8f04e60bd3cd7ed/extensions/src/update.ts#L53)
