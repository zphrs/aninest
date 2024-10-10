[aninest](../../index.md) / [ExtensionStack](../index.md) / addLayerToStack

# addLayerToStack()

```ts
function addLayerToStack<Animating, L>(stack, layer): L
```

A passthrough function that adds a layer to the stack and
returns the layer.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **L** *extends* [`Layer`](../../Extension/type-aliases/Layer.md)\<`Animating`\>

## Parameters

• **stack**: [`ExtensionStack`](../type-aliases/ExtensionStack.md)\<`Animating`\>

• **layer**: `L`

## Returns

`L`

the inputted layer

## Defined in

[Animate/ExtensionStack.ts:46](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/ExtensionStack.ts#L46)
