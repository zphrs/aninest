[aninest](../../index.md) / [Mode](../index.md) / createMode

# createMode()

```ts
createMode<Animating>(anim, stack): Mode
```

Creates a mode. A mode is simply an [ExtensionStack](../../ExtensionStack/type-aliases/ExtensionStack.md)
which can be easily toggled on and off.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **stack**: [`ExtensionStack`](../../ExtensionStack/type-aliases/ExtensionStack.md)\<`Animating`\>

## Returns

[`Mode`](../type-aliases/Mode.md)

used to toggle the [ExtensionStack](../../ExtensionStack/type-aliases/ExtensionStack.md).

## Source

[Animate/Mode.ts:31](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Mode.ts#L31)