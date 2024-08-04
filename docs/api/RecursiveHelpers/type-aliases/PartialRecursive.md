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

<<<<<<< HEAD
[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/tree//core/src/Animate/RecursiveHelpers.ts#L46)
=======
[Animate/RecursiveHelpers.ts:46](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/RecursiveHelpers.ts#L46)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
