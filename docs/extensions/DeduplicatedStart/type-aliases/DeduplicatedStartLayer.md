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

[../../extensions/src/deduplicatedStart.ts:19](https://github.com/zphrs/aninest/blob/988b5e8ac7585d70f507e793229537041ab3eea8/extensions/src/deduplicatedStart.ts#L19)
