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

[../../extensions/src/deduplicatedStart.ts:19](https://github.com/zphrs/aninest/blob/4def9b51a0eda7ca5b3d63922b6674c9f9434175/extensions/src/deduplicatedStart.ts#L19)
