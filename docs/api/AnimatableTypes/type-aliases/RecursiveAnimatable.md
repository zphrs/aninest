[aninest](../../index.md) / [AnimatableTypes](../index.md) / RecursiveAnimatable

# RecursiveAnimatable\<T\>

```ts
type RecursiveAnimatable<T>: { [P in keyof T]: T[P] extends UnknownRecursiveAnimatable ? RecursiveAnimatable<T[P]> : number };
```

The generic type of the animation state.

## Example

```ts
{ 
  a: {x: 0, y: 0},
  b: {x: 0, y: 0} 
}
```

## Type parameters

• **T**

## Source

[Animate/AnimatableTypes.ts:75](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/AnimatableTypes.ts#L75)
