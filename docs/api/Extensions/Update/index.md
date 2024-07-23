[aninest](../../index.md) / Extensions/Update

# Extensions/Update

Updates the animation every frame, providing a subscribe function which allows
listening to:
- **start** - when the animation starts to be updated,
- **stop** - when the animation finishes animating everything
- **update** - each update frame
Will only update the animation when necessary, i.e. when the animation has
been started and there are still things to animate.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [UpdateLayer](type-aliases/UpdateLayer.md) | An update layer that can be mounted to an animation.<br />Allows listening to:<br />- **start** - when the animation starts to be updated,<br />- **stop** - when the animation finishes animating everything<br />- **update** - each update frame |

### Functions

| Function | Description |
| :------ | :------ |
| [getUpdateLayer](functions/getUpdateLayer.md) | Updates the animation every frame, providing a subscribe function which allows<br />listening to:<br />- **start** - when the animation starts to be updated,<br />- **stop** - when the animation finishes animating everything<br />- **update** - each update frame |
