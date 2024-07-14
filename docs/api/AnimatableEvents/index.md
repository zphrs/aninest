[aninest](../index.md) / AnimatableEvents

# AnimatableEvents

Various ways to attach and detach event listeners to an Animation.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [AnimatableEvents](type-aliases/AnimatableEvents.md) | The various event types that are emitted by the animation.<br />Here are the possible events:<br />- **start**: when the animation's target state is changed by calling [modifyTo](../Animatable/functions/modifyTo.md)<br />and the new state is different from the current state.<br />Returns a [LocalAnimatable](../AnimatableTypes/type-aliases/LocalAnimatable.md) of the new local state with only the changed values.<br />- **end**: when the animation fully comes to a stop, provides the resting state<br />Returns an [Animatable](../AnimatableTypes/type-aliases/Animatable.md) of the new local state with the final resting state.<br />- **beforeEnd**: when the animation is about to end<br />Useful for preventing the animation from ending to instead loop/bounce/snap etc.<br />- **interrupt**: when a new `modifyTo` is called before the animation is finished<br />Returns a [LocalAnimatable](../AnimatableTypes/type-aliases/LocalAnimatable.md) of the new local state with all of the currently in progress values.<br />- **update**: when the current state of the animation changes, usually from a call to<br />[updateAnimation](../Animatable/functions/updateAnimation.md).<br />Returns `undefined` |
| [AnimatableEventsWithValue](type-aliases/AnimatableEventsWithValue.md) | Animation Events which return the values which the animation is interpolating to. |

### Functions

| Function | Description |
| :------ | :------ |
| [addLocalListener](functions/addLocalListener.md) | Adds a local listener to the animation. You can listen to the  events listed in [AnimatableEvents](type-aliases/AnimatableEvents.md).<br />Animation listeners are scoped to only trigger when the current level of the animation is modified.<br />Animation listeners are called in the order in which they were added. |
| [removeLocalListener](functions/removeLocalListener.md) | Removes a listener from the animation |
| [removeRecursiveListener](functions/removeRecursiveListener.md) | Removes a recursive start listener from the animation |

### Events

| Type alias | Description |
| :------ | :------ |
| [AnimatableListener](type-aliases/AnimatableListener.md) | Listens to the animation for a specific event.<br />All events aside from `update` return a dictionary of local values which are currently being animated. |
| [addRecursiveListener](functions/addRecursiveListener.md) | Adds a recursive start listener to the animation. This listener will trigger on any child modification.<br />Animation listeners are called in the order in which they were added. |
