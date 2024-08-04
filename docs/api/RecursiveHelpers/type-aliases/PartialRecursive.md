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

[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/core/src/Animate/RecursiveHelpers.ts#L46)
