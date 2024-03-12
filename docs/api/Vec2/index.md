[aninest](../index.md) / Vec2

# Vec2

A collection of 2D vector math functions and a few other generic scalar operations.

## Description

Vectors are represented as `{x: number, y: number}` and are meant to be immutable,
following a functional programming style.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [Vec2](type-aliases/Vec2.md) | A 2D vector. |

### Variables

| Variable | Description |
| :------ | :------ |
| [zeroVec2](variables/zeroVec2.md) | A 2D vector with x and y set to 0. |

### Functions

| Function | Description |
| :------ | :------ |
| [addVec](functions/addVec.md) | Adds two vectors together, returning a new vector. |
| [bezier](functions/bezier.md) | Performs a bezier interpolation between two vectors by a time value. |
| [clamp](functions/clamp.md) | Clamps a value between a minimum and maximum value. |
| [copy](functions/copy.md) | Duplicates the vector. |
| [cross](functions/cross.md) | Calculates the cross product of two vectors. |
| [distanceTo](functions/distanceTo.md) | Calculates the distance between two vectors. |
| [distanceTo2](functions/distanceTo2.md) | Calculates the squared distance between two vectors. |
| [divScalar](functions/divScalar.md) | Divides a vector `v` by a scalar `s` immutably. |
| [divVec](functions/divVec.md) | Performs component-wise division of `v1` / `v2` immutably. |
| [dot](functions/dot.md) | Calculates the dot product of two vectors. |
| [lerp](functions/lerp.md) | Performs a linear interpolation between two vectors by a time value. |
| [lerpFunc](functions/lerpFunc.md) | Lerps between a and b by t. |
| [mag](functions/mag.md) | Calculates the magnitude of a vector. |
| [magSquared](functions/magSquared.md) | Squares the magnitude of a vector. |
| [mapVec](functions/mapVec.md) | Calls a function func on each component of a vector,<br />creating a new vector from the result of each function call. |
| [mulScalar](functions/mulScalar.md) | Multiplies a vector `v` by a scalar `s` immutably. |
| [mulVec](functions/mulVec.md) | Does component-wise multiplication of two vectors immutably. |
| [newVec2](functions/newVec2.md) | Vec2 Constructor |
| [normalize](functions/normalize.md) | Returnes a normalized version of the vector. |
| [rotate](functions/rotate.md) | Rotates a vector by an angle in radians. |
| [rotateAround](functions/rotateAround.md) | Rotates a vector around a pivot point by an angle in radians. |
| [subVec](functions/subVec.md) | Subtracts v2 from v1 immutably. |
| [vecToIter](functions/vecToIter.md) | Converts a vector to an array.<br />Useful for spreading into function arguments. |
