[aninest root](../index.md) / AnimatableTypes

# AnimatableTypes

A collection of types to support Animatable.

## Index

### Type Aliases

| Type alias | Description |
| ------ | ------ |
| [UnknownAnimation](type-aliases/UnknownAnimation.md) | Convenient way to write `UnknownAnimation`. Usually used to cast an animation to this more generic type. |
| [UnknownRecursiveAnimatable](type-aliases/UnknownRecursiveAnimatable.md) | Convenient way to write `RecursiveAnimatable<unknown>`, usually used to extend a generic type. |
| [unsubscribe](type-aliases/unsubscribe.md) | Generic unsubscribe function which will remove event listeners. |

### Construction

| Type alias | Description |
| ------ | ------ |
| [Animation](type-aliases/Animation.md) | The animation object. This is a recursive type, meaning that it can contain other animations. |

### State Types

| Type alias | Description |
| ------ | ------ |
| [Animatable](type-aliases/Animatable.md) | The local state of the animation, meaning only the numbers in the topmost level of the animation. |
| [LocalAnimatable](type-aliases/LocalAnimatable.md) | A local slice of the Animatable type. |
| [PartialRecursiveAnimatable](type-aliases/PartialRecursiveAnimatable.md) | A subtree of the Animatable type. |
| [RecursiveAnimatable](type-aliases/RecursiveAnimatable.md) | The generic type of the animation state. |
