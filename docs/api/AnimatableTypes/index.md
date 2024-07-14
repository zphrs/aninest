[aninest](../index.md) / AnimatableTypes

# AnimatableTypes

A collection of types to support Animatable.

## Index

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [Mask](type-aliases/Mask.md) | Mask over animation. Set any key to `false` in order to mask out<br />that key and that key's subtree. |
| [UnknownRecursiveAnimatable](type-aliases/UnknownRecursiveAnimatable.md) | Convenient way to write `RecursiveAnimatable<unknown>`,<br />usually used to extend a generic type. |
| [unsubscribe](type-aliases/unsubscribe.md) | - |

### Bounds

| Type alias | Description |
| :------ | :------ |
| [Bounds](type-aliases/Bounds.md) | The bounds of the animation. The animation will be loosely clamped to these bounds. |
| [PartialBounds](type-aliases/PartialBounds.md) | The partial bounds of the animation, making the lower and upper bounds optional. |

### Construction

| Type alias | Description |
| :------ | :------ |
| [Animation](type-aliases/Animation.md) | The animation object. This is a recursive type, meaning that it can <br />contain other animations. |

### State Types

| Type alias | Description |
| :------ | :------ |
| [Animatable](type-aliases/Animatable.md) | The local state of the animation, meaning only the numbers in the topmost level of the input animation. |
| [LocalAnimatable](type-aliases/LocalAnimatable.md) | A local slice of the Animatable type. |
| [PartialRecursiveAnimatable](type-aliases/PartialRecursiveAnimatable.md) | A subtree of the Animatable type. |
| [RecursiveAnimatable](type-aliases/RecursiveAnimatable.md) | The generic type of the animation state. |
