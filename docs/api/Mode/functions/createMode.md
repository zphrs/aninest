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

[Animate/Mode.ts:31](https://github.com/zphrs/aninest/blob/faa26c191e539bfffb0686de3335249d40ae5db1/core/src/Animate/Mode.ts#L31)
