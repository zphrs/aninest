[aninest](../index.md) / Animatable

# Animatable

This module deals with creating and modifying animations.

## Index

### Bounds

| Type alias | Description |
| :------ | :------ |
| [Bounds](type-aliases/Bounds.md) | The bounds of the animation. The animation will be loosely clamped to these bounds. |
| [PartialBounds](type-aliases/PartialBounds.md) | The partial bounds of the animation, making the lower and upper bounds optional. |
| [boundAnimation](functions/boundAnimation.md) | Modifies the bounds of an object, changing what the animation is currently interpolating to.<br />Note: you might have to call [updateAnimation](functions/updateAnimation.md) after this to make sure the animation is updated,<br />if the current state is outside the new bounds.<br />You can also call [animationNeedsUpdate](functions/animationNeedsUpdate.md) to check if the animation needs to be updated before calling [updateAnimation](functions/updateAnimation.md). |

### Cache

| Function | Description |
| :------ | :------ |
| [initializeAnimationCache](functions/initializeAnimationCache.md) | Initializes a cache for the animation. The animation will automatically update the cache whenever it or any of its children are updated. |

### Construction

| Type alias | Description |
| :------ | :------ |
| [Animation](type-aliases/Animation.md) | The animation object. This is a recursive type, meaning that it can contain other animations. |
| [createAnimation](functions/createAnimation.md) | Creates an animation info object, automatically inferring type from the init object. |

### Events

| Type alias | Description |
| :------ | :------ |
| [AnimatableEvents](type-aliases/AnimatableEvents.md) | The various event types that are emitted by the animation.<br />Here are the possible events:<br />- **start**: when the animation's target state is changed by calling [modifyTo](functions/modifyTo.md)<br />and the new state is different from the current state.<br />Returns a [PartialAnimatable](type-aliases/LocalAnimatable.md) of the new local state with only the changed values.<br />- **end**: when the animation fully comes to a stop, provides the resting state<br />Returns an [Animatable](type-aliases/LocalAnimatable.md) of the new local state with the final resting state.<br />- **beforeEnd**: when the animation is about to end<br />Useful for preventing the animation from ending to instead loop/bounce/snap etc.<br />- **bounce**: when the animation bounces off a bound<br />Returns a [PartialAnimatable](type-aliases/LocalAnimatable.md) of the new local state with only the bounced values.<br />- **interrupt**: when a new `modifyTo` is called before the animation is finished<br />Returns a [PartialAnimatable](type-aliases/LocalAnimatable.md) of the new local state with all of the currently in progress values.<br />- **update**: when the animation is updated<br />Returns `undefined` |
| [addLocalListener](functions/addLocalListener.md) | Adds a local listener to the animation. You can listen to the following events:<br />- start<br />- end<br />- bounce: hitting a bound<br />- interrupt: when a new `modifyTo` is called before the animation is finished<br />Animation listeners are scoped to only trigger when the current level of the animation is modified. |
| [addRecursiveListener](functions/addRecursiveListener.md) | Adds a recursive start listener to the animation. This listener will trigger on any child modification. |
| [removeLocalListener](functions/removeLocalListener.md) | Removes a listener from the animation |
| [removeRecursiveListener](functions/removeRecursiveListener.md) | Removes a recursive start listener from the animation |

### Helpers

| Function | Description |
| :------ | :------ |
| [loopAnimation](functions/loopAnimation.md) | Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state. |

### Interpolation

| Function | Description |
| :------ | :------ |
| [changeInterpFunction](functions/changeInterpFunction.md) | Changes the interpolation function of specific subproperties based on the mask.<br /><br />Note: you only have the granularity of each dictionary level. For instance,<br />if you had the following animation structure:<br />` const anim = createAnimation({a: {x: 0, y: 0}, b: {x: 0, y: 0}}, getLinearInterp(1)) `<br />then you could change the interpolation function of `a` and `b` but not `a.x` and `a.y`.<br />To change `a.x` seprately from `a.y`, this would be your structure:<br />` const anim = createAnimation({a: {x: {value: 0}, y: {value: 0}}, b: {x: 0, y: 0}}, getLinearInterp(1)) // only changes `a.x` interp function changeInterpFunction(anim, getLinearInterp(2), {a: {x: true, y: false}, b: false}) `<br />Then to get the value of `a.x` you would call `getLocalState(anim.children.a.children.x).value`.<br /><br />To get the `value` of both `x` and `y` and simply store set the variables `x` and `y` to the<br />respective values you could do:<br />` const {x: {value: x}, y: {value: y}} = getStateTree(anim.children.a) ` |
| [getLocalInterpingTo](functions/getLocalInterpingTo.md) | Gets the local target state that the animation is currently headed to.<br />If the animation is not headed to any state, it will return the current state.<br />This only returns the local state of the animation, meaning only the numbers<br />in the topmost level of the input animation. |

### Snap

| Function | Description |
| :------ | :------ |
| [distanceLessThan](functions/distanceLessThan.md) | Returns a function of whether the distance across the features of the point is closer than the given distance to the current state.<br />Mainly meant as a utility function for [setSnapPoint](functions/setSnapPoint.md). |
| [distanceSquaredBetween](functions/distanceSquaredBetween.md) | Measures the squared euclidean distance between the point and the current state only on the subset of features of the point. |
| [setLocalSnapGrid](functions/setLocalSnapGrid.md) | Sets a snap grid only for the top level of the animation. |
| [setSnapGrid](functions/setSnapGrid.md) | Adds a grid to snap to. |
| [setSnapPoint](functions/setSnapPoint.md) | Adds a point to snap to, across any number of features. |

### State Modification

| Function | Description |
| :------ | :------ |
| [modifyTo](functions/modifyTo.md) | Sets the final stopping point of the animation.<br />The animation will start to interpolate to the new state. |
| [updateAnimation](functions/updateAnimation.md) | Moves forward in the animation by a certain amount of time. |

### State Retrieval

| Function | Description |
| :------ | :------ |
| [getInterpingToTree](functions/getInterpingToTree.md) | Gets the total target state that the animation is currently headed to.<br />If the animation is not headed to any state, it will return the current state. |
| [getLocalState](functions/getLocalState.md) | Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.<br />To access the local state of a child, use `anim.children.childName` as the input. |
| [getStateTree](functions/getStateTree.md) | Gets the total state of the animation, including all children. |

### State Types

| Type alias | Description |
| :------ | :------ |
| [Animatable](type-aliases/Animatable.md) | The local state of the animation, meaning only the numbers in the topmost level of the input animation. |
| [LocalAnimatable](type-aliases/LocalAnimatable.md) | A local slice of the Animatable type. |
| [PartialRecursiveAnimatable](type-aliases/PartialRecursiveAnimatable.md) | A subtree of the Animatable type. |
| [RecursiveAnimatable](type-aliases/RecursiveAnimatable.md) | The generic type of the animation state. |

### Status

| Function | Description |
| :------ | :------ |
| [animationNeedsUpdate](functions/animationNeedsUpdate.md) | Returns whether the animation needs to be updated. |
| [animationTreeNeedsUpdate](functions/animationTreeNeedsUpdate.md) | Checks if any property of the animation is still in progress. |
