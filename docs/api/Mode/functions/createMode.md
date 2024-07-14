[aninest](../../index.md) / [Mode](../index.md) / createMode

# createMode()

```ts
createMode<Animating>(anim, stack): Mode
```

Creates a mode which can be toggled on and off

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **stack**: `ExtensionStack`\<`Animating`\>

## Returns

[`Mode`](../type-aliases/Mode.md)

[Mode](../type-aliases/Mode.md) to toggle the [ExtensionStack](../../ExtensionStack/index.md)

## Source

Animate/Mode.ts:30
