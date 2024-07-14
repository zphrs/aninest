[aninest](../../index.md) / [ExtensionStack](../index.md) / addLayerToStack

# addLayerToStack()

```ts
addLayerToStack<Animating, L>(stack, layer): L
```

A passthrough function that adds a layer to the stack and
returns the layer.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **L** extends [`Layer`](../../Extensions/type-aliases/Layer.md)\<`Animating`\>

## Parameters

• **stack**: `ExtensionStack`\<`Animating`\>

• **layer**: `L`

## Returns

`L`

the inputted layer

## Source

Animate/ExtensionStack.ts:41
