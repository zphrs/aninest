[aninest](../index.md) / module:Interp

# module:Interp

Several interpolation function constructors.

## Index

### Type Aliases

| Type alias | Description |
| ------ | ------ |
| [Interp](type-aliases/Interp.md) | Interpolation function. At time 0 it should return either 0 or null (for [NO_INTERP](functions/NO_INTERP.md)) |

### Functions

| Function | Description |
| ------ | ------ |
| [NO\_INTERP](functions/NO_INTERP.md) | - |
| [getCubicBezier](functions/getCubicBezier.md) | Returns a cubic bezier interpolation function. |
| [getLinearInterp](functions/getLinearInterp.md) | Returns a linear interpolation function. |
| [getProgress](functions/getProgress.md) | Gets the linear progress of an animation based on time and duration, clamped between 0 and 1. |
| [getSlerp](functions/getSlerp.md) | Returns a smooth interpolation function based on the sine function. |
