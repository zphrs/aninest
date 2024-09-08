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

[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/blob/93165c72e5bf58f07554172fb8f04e60bd3cd7ed/core/src/Animate/RecursiveHelpers.ts#L46)
