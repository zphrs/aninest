[aninest](../../index.md) / [ExtensionStack](../index.md) / mountStack

# mountStack()

```ts
mountStack<Animating>(stack, anim): unmount
```

Mounts a stack of extensions to the animation. Returns a function that
unmounts all the extensions in the stack.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **stack**: [`ExtensionStack`](../type-aliases/ExtensionStack.md)\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](../../Extension/type-aliases/unmount.md)

A function that unmounts all the extensions in the stack.

## Source

[Animate/ExtensionStack.ts:63](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/ExtensionStack.ts#L63)
