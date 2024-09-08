[aninest](../../index.md) / [AnimatableEvents](../index.md) / AnimatableListener

# AnimatableListener\<Animating, Event\>

```ts
type AnimatableListener<Animating, Event>: Event extends AnimatableEventsWithValue ? Listener<Partial<LocalAnimatable<Animating>>> : Listener<undefined>;
```

Listens to the animation for a specific event.
All events aside from `update` return a dictionary of local values which are currently being animated.

## Type Parameters

• **Animating** *extends* [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

• **Event** *extends* [`AnimatableEvents`](AnimatableEvents.md)

## Defined in

[Animate/AnimatableEvents.ts:180](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/core/src/Animate/AnimatableEvents.ts#L180)
