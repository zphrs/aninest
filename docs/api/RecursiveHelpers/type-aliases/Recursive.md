[aninest](../../index.md) / [RecursiveHelpers](../index.md) / Recursive

# Recursive\<Base, Shape\>

```ts
type Recursive<Base, Shape>: { [P in keyof Shape]: Shape[P] extends Base ? Base : Recursive<Base, Shape[P]> };
```

Generic type which allows for the recursive definition of an object
which either has a value of type `Base` or a subtree of the same type.

## Type parameters

• **Base**

• **Shape**

## Source

[Animate/RecursiveHelpers.ts:36](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/RecursiveHelpers.ts#L36)
