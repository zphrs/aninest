[aninest root](../../index.md) / [ExtensionStack](../index.md) / addLayerToStack

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

[Animate/ExtensionStack.ts:46](https://github.com/zphrs/aninest/blob/efdac3830228dc951d7e8e69ab0c7db89aa8723f/core/src/Animate/ExtensionStack.ts#L46)
