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

[Animate/AnimatableTypes.ts:49](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/AnimatableTypes.ts#L49)
