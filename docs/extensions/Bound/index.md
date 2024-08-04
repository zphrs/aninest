[@aninest/extensions](../index.md) / Bound

# Bound

Adds bounds to an animation to ensure an animation
will end within the given bounds.

## Index

### Type Aliases

| Type alias | Description |
| ------ | ------ |
| [Bounds](type-aliases/Bounds.md) | The bounds of the animation, which means that all values within the bounds are optional, including the the `upper` and `lower` objects. The animation will be loosely clamped to these bounds. |
| [BoundsLayer](type-aliases/BoundsLayer.md) | A layer used to enforce minimum and maximum bounds on an animation. |

### Functions

| Function | Description |
| ------ | ------ |
| [setupBoundsLayer](functions/setupBoundsLayer.md) | Sets up a bounds layer for an animation. Allows for the animation's bounds to be dynamically changed. |
