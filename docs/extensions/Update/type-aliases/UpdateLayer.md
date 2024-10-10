[@aninest/extensions](../../index.md) / [Update](../index.md) / UpdateLayer

# UpdateLayer\<Animating\>

```ts
type UpdateLayer<Animating>: Layer<Animating> & object;
```

An update layer that can be mounted to an animation.
Allows listening to:
- **start** - when any child animation starts to be updated,
- **done** - when any child animation finishes animating everything
- **update** - when any child animation is updated
- **updateWithDeltaTime** - each update frame with the time since the last update
- **afterUpdate** - after each update frame
- **childStart** - when a child UpdateLayer starts to be updated
- **childEnd** - when a child UpdateLayer finishes animating everything, including its children
- **done** - when the animation finishes animating everything and pauses the updates

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

• **sub**: `Event` *extends* `"updateWithDeltaTime"` ? `Listener`\<`number`\> : `Event` *extends* `ChildEvents` ? `Listener`\<`InternalUpdateLayer`\<`RecursiveAnimatable`\<`unknown`\>\>\> : `Event` *extends* `"done"` ? `Listener`\<`undefined`\> : `Listener`\<`Animation`\<`Animating`\>\>

#### Returns

`unsubscribe`

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## Defined in

[../../extensions/src/update.ts:56](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/extensions/src/update.ts#L56)
