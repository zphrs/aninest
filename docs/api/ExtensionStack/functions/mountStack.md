[aninest](../../index.md) / [ExtensionStack](../index.md) / mountStack

# mountStack()

```ts
mountStack<Animating>(stack, anim): () => void
```

Mounts the stack of extensions to the animation.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **stack**: `ExtensionStack`\<`Animating`\>

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

`Function`

A function that unmounts all the extensions in the stack.

> ### Returns
>
> `void`
>

## Source

Animate/ExtensionStack.ts:56
