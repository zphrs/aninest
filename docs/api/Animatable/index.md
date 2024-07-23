[aninest](../index.md) / Animatable

# Animatable

This module deals with creating and modifying Animations.

## Index

### Construction

| Function | Description |
| :------ | :------ |
| [createAnimation](functions/createAnimation.md) | Creates an animation info object, automatically inferring type from the init object. |
| [createParentAnimation](functions/createParentAnimation.md) | Creates a parent animation from a dictionary of children which will function the same<br />as though the parent and children were created at once. |

### Interpolation

| Function | Description |
| :------ | :------ |
| [changeInterpFunction](functions/changeInterpFunction.md) | Changes the interpolation function of specific subproperties based on the mask.<br /><br />Note: you only have the granularity of each dictionary level. For instance,<br />if you had the following animation structure:<br />` const anim = createAnimation({a: {x: 0, y: 0}, b: {x: 0, y: 0}}, getLinearInterp(1)) `<br />then you could change the interpolation function of `a` and `b` but not `a.x` and `a.y`.<br />To change `a.x` seprately from `a.y`, this would be your structure:<br />` const anim = createAnimation({a: {x: {value: 0}, y: {value: 0}}, b: {x: 0, y: 0}}, getLinearInterp(1)) // only changes `a.x` interp function changeInterpFunction(anim, getLinearInterp(2), {a: {x: true, y: false}, b: false}) `<br />Then to get the value of `a.x` you would call `getLocalState(anim.children.a.children.x).value`.<br /><br />To get the `value` of both `x` and `y` and simply store set the variables `x` and `y` to the<br />respective values you could do:<br />` const {x: {value: x}, y: {value: y}} = getStateTree(anim.children.a) ` |

### State Modification

| Function | Description |
| :------ | :------ |
| [modifyTo](functions/modifyTo.md) | Sets the final stopping point of the animation.<br />The animation will start to interpolate to the new state the next<br />time [updateAnimation](functions/updateAnimation.md) is called. |
| [updateAnimation](functions/updateAnimation.md) | Moves the animation forward by a certain amount of time. |

### State Retrieval

| Function | Description |
| :------ | :------ |
| [getInterpingToTree](functions/getInterpingToTree.md) | Gets the full state tree that the animation is currently interpolating to.<br />If the animation is not headed to any state, it will return the current state. |
| [getLocalInterpingTo](functions/getLocalInterpingTo.md) | Gets the local target state that the animation is currently headed to.<br />If the animation is not headed to any state, it will return the current state.<br />This only returns the local state of the animation, meaning only the numbers<br />in the topmost level of the animation. |
| [getLocalState](functions/getLocalState.md) | Gets the current local state of the animation, meaning only the numbers in the topmost level of the animation.<br />To access the local state of a child, use `anim.children.childName` as the input. |
| [getStateTree](functions/getStateTree.md) | Gets the full state of the animation, including all children. |
