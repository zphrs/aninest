[aninest](../../index.md) / Extensions/Bound

# Extensions/Bound

Adds bounds to an animation to ensure an animation
will end within the given bounds.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [Bounds](type-aliases/Bounds.md) | The bounds of the animation, which means that all values within<br />the bounds are optional, including the the `upper` and `lower` objects.<br />The animation will be loosely clamped to these bounds. |
| [BoundsLayer](type-aliases/BoundsLayer.md) | A layer used to enforce minimum and maximum bounds on an animation. |

### Functions

| Function | Description |
| :------ | :------ |
| [setupBoundsLayer](functions/setupBoundsLayer.md) | Sets up a bounds layer for an animation.<br />Allows for the animation's bounds to be dynamically changed. |
