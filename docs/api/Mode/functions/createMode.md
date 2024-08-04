[aninest](../../index.md) / [Mode](../index.md) / createMode

# createMode()

```ts
function createMode<Animating>(anim, stack): Mode
```

Creates a mode. A mode is simply an [ExtensionStack](../../ExtensionStack/type-aliases/ExtensionStack.md)
which can be easily toggled on and off.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **stack**: [`ExtensionStack`](../../ExtensionStack/type-aliases/ExtensionStack.md)\<`Animating`\>

## Returns

[`Mode`](../type-aliases/Mode.md)

used to toggle the [ExtensionStack](../../ExtensionStack/type-aliases/ExtensionStack.md).

## Defined in

<<<<<<< HEAD
[Animate/Mode.ts:31](https://github.com/zphrs/aninest/tree//core/src/Animate/Mode.ts#L31)
=======
[Animate/Mode.ts:31](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Mode.ts#L31)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
