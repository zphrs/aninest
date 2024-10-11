[aninest root](../index.md) / ExtensionStack

# ExtensionStack

A stack of extensions that can be mounted to an animation.

## Index

### Functions

| Function | Description |
| ------ | ------ |
| [addLayerToStack](functions/addLayerToStack.md) | A passthrough function that adds a layer to the stack and returns the layer. |
| [createExtensionStack](functions/createExtensionStack.md) | Creates an empty stack of extensions. |

### Extensions

| Type alias, Function | Description |
| ------ | ------ |
| [ExtensionStack](type-aliases/ExtensionStack.md) | A list of extensions which will be mounted to an animation in order. |
| [addExtensionToStack](functions/addExtensionToStack.md) | Adds an extension to the stack. |
| [mountStack](functions/mountStack.md) | Mounts a stack of extensions to the animation. Returns a function that unmounts all the extensions in the stack. |
