[aninest](../../index.md) / [RecursiveHelpers](../index.md) / Recursive

# Recursive\<Base, Shape\>

```ts
type Recursive<Base, Shape>: { [P in keyof Shape]: Shape[P] extends Base ? Base : Recursive<Base, Shape[P]> };
```

Generic type which allows for the recursive definition of an object
which either has a value of type `Base` or a subtree of the same type.

## Type Parameters

• **Base**

• **Shape**

## Defined in

[Animate/RecursiveHelpers.ts:36](https://github.com/zphrs/aninest/blob/3019702e634994a4353fce5adc21aa1a16369bbd/core/src/Animate/RecursiveHelpers.ts#L36)
