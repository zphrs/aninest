[aninest](../../index.md) / [RecursiveHelpers](../index.md) / PartialRecursive

# PartialRecursive\<Base, Shape\>

```ts
type PartialRecursive<Base, Shape>: { [P in keyof Shape]?: Shape[P] extends Base ? Base : PartialRecursive<Base, Shape[P]> };
```

Contains the same structure as the original object, but with all keys
being optional.

## Type parameters

• **Base**

• **Shape**

## Source

[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/RecursiveHelpers.ts#L46)
