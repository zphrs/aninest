[aninest](../../../index.md) / [Extensions/Cache](../index.md) / CacheLayer

# CacheLayer\<Animating\>

```ts
type CacheLayer<Animating>: Object & Layer<Animating>;
```

Layer used to create a cache of the current state of the animation.

## Type declaration

### cache

```ts
readonly cache: Animating;
```

Stores the current state of the animation. Reuses the same object for caching.

### removeSubscribers

```ts
removeSubscribers: () => void;
```

Removes all subscribers.

#### Returns

`void`

### subscribe

```ts
subscribe: (subscription) => unsubscribe;
```

Allows adding a subscription to the cache which will get called every time the
animation gets updated.

#### Parameters

• **subscription**: [`Listener`](../../../Listeners/type-aliases/Listener.md)\<`Animating`\>

The function which will be called when the cache updates.

#### Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Source

Animate/Extensions/cache.ts:19
