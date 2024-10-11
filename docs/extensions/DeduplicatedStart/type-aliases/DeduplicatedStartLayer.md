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

[../../extensions/src/deduplicatedStart.ts:19](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/extensions/src/deduplicatedStart.ts#L19)
