[aninest](../../index.md) / [Animatable](../index.md) / RecursiveAnimatable

# RecursiveAnimatable\<T\>

```ts
type RecursiveAnimatable<T>: { [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? RecursiveAnimatable<T[P]> : number };
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

[Animate/Animatable.ts:93](https://github.com/zphrs/aninest/blob/9544357/src/Animate/Animatable.ts#L93)
