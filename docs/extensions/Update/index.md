[@aninest/extensions](../index.md) / Update

# Update

Updates the animation every screen refresh, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **done** - when the animation finishes animating everything
- **update** - each update frame
It will only update the animation when necessary, i.e. when the animation has
been started and there are still things to animate.

## Index

### Type Aliases

| Type alias | Description |
| ------ | ------ |
| [UpdateLayer](type-aliases/UpdateLayer.md) | An update layer that can be mounted to an animation. Allows listening to: - **start** - when any child animation starts to be updated, - **done** - when any child animation finishes animating everything - **update** - when any child animation is updated - **updateWithDeltaTime** - each update frame with the time since the last update - **afterUpdate** - after each update frame - **childStart** - when a child UpdateLayer starts to be updated - **childEnd** - when a child UpdateLayer finishes animating everything, including its children - **done** - when the animation finishes animating everything and pauses the updates |

### Functions

| Function | Description |
| ------ | ------ |
| [getUpdateLayer](functions/getUpdateLayer.md) | Updates the animation every frame, providing a subscribe function which allows listening to: - **start** - when the animation starts to be updated, - **done** - when the animation finishes animating everything - **update** - each update frame |
