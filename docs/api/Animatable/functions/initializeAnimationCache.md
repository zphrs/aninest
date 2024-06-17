[aninest](../../index.md) / [Animatable](../index.md) / initializeAnimationCache

# initializeAnimationCache()

```ts
initializeAnimationCache<Animating>(anim): undefined | () => void
```

Initializes a cache for the animation. The animation will automatically update the cache whenever it or any of its children are updated.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

## Returns

`undefined` \| () => `void`

A function to remove caching

## Source

[Animate/Animatable.ts:718](https://github.com/zphrs/aninest/blob/729a7d6/src/Animate/Animatable.ts#L718)
