[aninest](../../index.md) / [RecursiveHelpers](../index.md) / PartialRecursive

# PartialRecursive\<Base, Shape\>

```ts
type PartialRecursive<Base, Shape>: { [P in keyof Shape]?: Shape[P] extends Base ? Base : PartialRecursive<Base, Shape[P]> };
```

Contains the same structure as the original object, but with all keys
being optional.

## Type Parameters

• **Base**

• **Shape**

## Defined in

[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/blob/b669292333243ef725d764f354c403b2c4bde014/core/src/Animate/RecursiveHelpers.ts#L46)
