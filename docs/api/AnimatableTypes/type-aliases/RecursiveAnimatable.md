[aninest](../../index.md) / [AnimatableTypes](../index.md) / RecursiveAnimatable

# RecursiveAnimatable\<T\>

```ts
type RecursiveAnimatable<T>: { [P in keyof T]: T[P] extends number ? number : RecursiveAnimatable<T[P]> };
```

The generic type of the animation state.

## Type Parameters

• **T**

## Example

```ts
{ 
  a: {x: 0, y: 0},
  b: {x: 0, y: 0} 
}
```

## Defined in

<<<<<<< HEAD
[Animate/AnimatableTypes.ts:49](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableTypes.ts#L49)
=======
• **T**

## Source

[Animate/AnimatableTypes.ts:49](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableTypes.ts#L49)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
