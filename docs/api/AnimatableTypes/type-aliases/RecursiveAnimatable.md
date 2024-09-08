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

[Animate/AnimatableTypes.ts:49](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/core/src/Animate/AnimatableTypes.ts#L49)
