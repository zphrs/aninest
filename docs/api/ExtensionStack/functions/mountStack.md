[aninest](../../index.md) / [ExtensionStack](../index.md) / mountStack

# mountStack()

```ts
function mountStack<Animating>(stack, anim): unmount
```

Mounts a stack of extensions to the animation. Returns a function that
unmounts all the extensions in the stack.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **stack**: [`ExtensionStack`](../type-aliases/ExtensionStack.md)\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unmount`](../../Extension/type-aliases/unmount.md)

A function that unmounts all the extensions in the stack.

## Defined in

<<<<<<< HEAD
[Animate/ExtensionStack.ts:63](https://github.com/zphrs/aninest/tree//core/src/Animate/ExtensionStack.ts#L63)
=======
[Animate/ExtensionStack.ts:63](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/ExtensionStack.ts#L63)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
