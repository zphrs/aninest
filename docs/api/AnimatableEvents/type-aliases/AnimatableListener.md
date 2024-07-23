[aninest](../../index.md) / [AnimatableEvents](../index.md) / AnimatableListener

# AnimatableListener\<Animating, Event\>

```ts
type AnimatableListener<Animating, Event>: Event extends AnimatableEventsWithValue ? Listener<Partial<LocalAnimatable<Animating>>> : Listener<undefined>;
```

Listens to the animation for a specific event.
All events aside from `update` return a dictionary of local values which are currently being animated.

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

• **Event** extends [`AnimatableEvents`](AnimatableEvents.md)

## Source

[Animate/AnimatableEvents.ts:172](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/AnimatableEvents.ts#L172)
