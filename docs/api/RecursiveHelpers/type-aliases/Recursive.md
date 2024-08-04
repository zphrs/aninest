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

<<<<<<< HEAD
[Animate/RecursiveHelpers.ts:36](https://github.com/zphrs/aninest/tree//core/src/Animate/RecursiveHelpers.ts#L36)
=======
[Animate/RecursiveHelpers.ts:36](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/RecursiveHelpers.ts#L36)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
