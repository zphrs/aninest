[@aninest/extensions](../../index.md) / [DeduplicatedStart](../index.md) / DeduplicatedStartLayer

# DeduplicatedStartLayer\<Animating\>

```ts
type DeduplicatedStartLayer<Animating>: Layer<Animating> & object;
```

Enables mounting to an animation and subscribing to the deduplicated start
events.

## Type declaration

### subscribe()

```ts
subscribe: (sub) => unsubscribe;
```

#### Parameters

• **sub**: `Listener`\<`undefined`\>

#### Returns

`unsubscribe`

## Type Parameters

• **Animating** *extends* `UnknownRecursiveAnimatable`

## Defined in

[../../extensions/src/deduplicatedStart.ts:19](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/extensions/src/deduplicatedStart.ts#L19)
