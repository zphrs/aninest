[aninest](../index.md) / Animatable

# Animatable

This module deals with creating and modifying Animations.

## Index

### Construction

| Function | Description |
| ------ | ------ |
| [createAnimation](functions/createAnimation.md) | Creates an animation info object, automatically inferring type from the init object. |
| [createParentAnimation](functions/createParentAnimation.md) | Creates a parent animation from a dictionary of children which will function the same as though the parent and children were created at once. |

### Interpolation

| Function | Description |
| ------ | ------ |
| [changeInterpFunction](functions/changeInterpFunction.md) | Changes the interpolation function of specific subproperties based on the mask. |

### State Modification

| Function | Description |
| ------ | ------ |
| [modifyTo](functions/modifyTo.md) | Sets the final stopping point of the animation. The animation will start to interpolate to the new state the next time [updateAnimation](functions/updateAnimation.md) is called. |
| [updateAnimation](functions/updateAnimation.md) | Moves the animation forward by a certain amount of time. |

### State Retrieval

| Function | Description |
| ------ | ------ |
| [getInterpingToTree](functions/getInterpingToTree.md) | Gets the full state tree that the animation is currently interpolating to. If the animation is not headed to any state, it will return the current state. |
| [getLocalInterpingTo](functions/getLocalInterpingTo.md) | Gets the local target state that the animation is currently headed to. If the animation is not headed to any state, it will return the current state. This only returns the local state of the animation, meaning only the numbers in the topmost level of the animation. |
| [getLocalInterpingToValue](functions/getLocalInterpingToValue.md) | Gets a value |
| [getLocalState](functions/getLocalState.md) | Gets the current local state of the animation, meaning only the numbers in the topmost level of the animation. To access the local state of a child, use `anim.children.childName` as the input. |
| [getStateTree](functions/getStateTree.md) | Gets the full state of the animation, including all children. |
