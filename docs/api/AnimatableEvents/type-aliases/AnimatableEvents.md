[aninest](../../index.md) / [AnimatableEvents](../index.md) / AnimatableEvents

# AnimatableEvents

```ts
type AnimatableEvents: AnimatableEventsWithValue | "update";
```

The various event types that are emitted by the animation.
Here are the possible events:
- **start**: when the animation's target state is changed by calling [modifyTo](../../Animatable/functions/modifyTo.md)
and the new state is different from the current state.
Returns a [LocalAnimatable](../../AnimatableTypes/type-aliases/LocalAnimatable.md) of the new local state with only the changed values.
- **end**: when the animation fully comes to a stop, provides the resting state
Returns an [Animatable](../../AnimatableTypes/type-aliases/Animatable.md) of the new local state with the final resting state.
- **beforeEnd**: when the animation is about to end
Useful for preventing the animation from ending to instead loop/bounce/snap etc.
- **interrupt**: when a new `modifyTo` is called before the animation is finished
Returns a [LocalAnimatable](../../AnimatableTypes/type-aliases/LocalAnimatable.md) of the new local state with all of the currently in progress values.
- **update**: when the current state of the animation changes, usually from a call to
[updateAnimation](../../Animatable/functions/updateAnimation.md).
Returns `undefined`

## Defined in

[Animate/AnimatableEvents.ts:224](https://github.com/zphrs/aninest/blob/988b5e8ac7585d70f507e793229537041ab3eea8/core/src/Animate/AnimatableEvents.ts#L224)
