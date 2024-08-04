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

<<<<<<< HEAD
[Animate/AnimatableEvents.ts:179](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableEvents.ts#L179)
=======
[Animate/AnimatableEvents.ts:179](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableEvents.ts#L179)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
