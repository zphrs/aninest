[aninest](../index.md) / RecursiveHelpers

# RecursiveHelpers

Provides general helper functions for working with recursive objects.
Especially useful for allowing extensions to mask out (not affect) certain
children of an object.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [Mask](type-aliases/Mask.md) | Mask over animation. Set any key to `false` in order to mask out<br />that key and that key's subtree. |
| [PartialRecursive](type-aliases/PartialRecursive.md) | Contains the same structure as the original object, but with all keys<br />being optional. |
| [Recursive](type-aliases/Recursive.md) | Generic type which allows for the recursive definition of an object<br />which either has a value of type `Base` or a subtree of the same type. |
