[aninest](../../index.md) / [Animatable](../index.md) / AnimatableEvents

# AnimatableEvents

```ts
type AnimatableEvents: AnimatableEventsWithValue | "update";
```

The various event types that are emitted by the animation.
Here are the possible events:
- **start**: when the animation's target state is changed by calling [modifyTo](../functions/modifyTo.md)
and the new state is different from the current state.
Returns a [PartialAnimatable](LocalAnimatable.md) of the new local state with only the changed values.
- **end**: when the animation fully comes to a stop, provides the resting state
Returns an [Animatable](LocalAnimatable.md) of the new local state with the final resting state.
- **beforeEnd**: when the animation is about to end
Useful for preventing the animation from ending to instead loop/bounce/snap etc.
- **bounce**: when the animation bounces off a bound
Returns a [PartialAnimatable](LocalAnimatable.md) of the new local state with only the bounced values.
- **interrupt**: when a new `modifyTo` is called before the animation is finished
Returns a [PartialAnimatable](LocalAnimatable.md) of the new local state with all of the currently in progress values.
- **update**: when the animation is updated
Returns `undefined`

## Source

[Animate/Animatable.ts:82](https://github.com/zphrs/aninest/blob/9544357/src/Animate/Animatable.ts#L82)
