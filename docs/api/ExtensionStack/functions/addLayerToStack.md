[aninest](../../index.md) / [ExtensionStack](../index.md) / addLayerToStack

# addLayerToStack()

```ts
addLayerToStack<Animating, L>(stack, layer): L
```

A passthrough function that adds a layer to the stack and
returns the layer.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

• **L** extends [`Layer`](../../Extension/type-aliases/Layer.md)\<`Animating`\>

## Parameters

• **stack**: [`ExtensionStack`](../type-aliases/ExtensionStack.md)\<`Animating`\>

• **layer**: `L`

## Returns

`L`

the inputted layer

## Source

[Animate/ExtensionStack.ts:46](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/ExtensionStack.ts#L46)
