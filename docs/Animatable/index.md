[@plexigraph/aninest](../index.md) / Animatable

# Animatable

This module deals with creating and modifying animations.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [Animation](type-aliases/Animation.md) | The animation object. This is a recursive type, meaning that it can contain other animations. |
| [RecursiveAnimatable](type-aliases/RecursiveAnimatable.md) | The generic type of the animation state. |

### Functions

| Function | Description |
| :------ | :------ |
| [addLocalListener](functions/addLocalListener.md) | Adds a local listener to the animation. You can listen to the following events:<br />- start<br />- end<br />- bounce: hitting a bound<br />- interrupt: when a new `modifyTo` is called before the animation is finished<br />Animation listeners are scoped to only trigger when the current level of the animation is modified. |
| [addRecursiveStartListener](functions/addRecursiveStartListener.md) | Adds a recursive start listener to the animation. This listener will trigger on any child modification. |
| [boundAnimation](functions/boundAnimation.md) | Modifies the bounds of an object, changing what the animation is currently interpolating to.<br />Note: you might have to call `updateAnimationInfo` after this to make sure the animation is updated,<br />if the current state is outside the new bounds.<br />You can also call `animationNeedsUpdate` to check if the animation needs to be updated before calling `updateAnimationInfo`. |
| [changeInterpFunction](functions/changeInterpFunction.md) | Changes the interpolation function of specific subproperties based on the mask.<br /><br />Note: you only have the granularity of each dictionary level. For instance,<br />if you had the following animation structure:<br />` const anim = createAnimation({a: {x: 0, y: 0}, b: {x: 0, y: 0}}, getLinearInterp(1)) `<br />then you could change the interpolation function of `a` and `b` but not `a.x` and `a.y`.<br />To change `a.x` seprately from `a.y`, this would be your structure:<br />` const anim = createAnimation({a: {x: {value: 0}, y: {value: 0}}, b: {x: 0, y: 0}}, getLinearInterp(1)) // only changes `a.x` interp function changeInterpFunction(anim, getLinearInterp(2), {a: {x: true, y: false}, b: false}) `<br />Then to get the value of `a.x` you would call `getLocalState(anim.children.a.children.x).value`.<br /><br />To get the `value` of both `x` and `y` and simply store set the variables `x` and `y` to the<br />respective values you could do:<br />` const {x: {value: x}, y: {value: y}} = getStateTree(anim.children.a) ` |
| [createAnimation](functions/createAnimation.md) | Creates an animation info object, automatically inferring type from the init object. |
| [getInterpingToTree](functions/getInterpingToTree.md) | Gets the total target state that the animation is currently headed to.<br />If the animation is not headed to any state, it will return the current state. |
| [getLocalInterpingTo](functions/getLocalInterpingTo.md) | Gets the local target state that the animation is currently headed to.<br />If the animation is not headed to any state, it will return the current state.<br />This only returns the local state of the animation, meaning only the numbers<br />in the topmost level of the input animation. |
| [getLocalState](functions/getLocalState.md) | Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.<br />To access the local state of a child, use `anim.children.childName` as the input. |
| [getStateTree](functions/getStateTree.md) | Gets the total state of the animation, including all children. |
| [modifyTo](functions/modifyTo.md) | Sets the final stopping point of the animation.<br />The animation will start to interpolate to the new state. |
| [removeListener](functions/removeListener.md) | Removes a listener from the animation |
| [removeRecursiveStartListener](functions/removeRecursiveStartListener.md) | Removes a recursive start listener from the animation |
| [updateAnimation](functions/updateAnimation.md) | Updates the animation by incrementing the current timestamp of the animation by `dt`. |
