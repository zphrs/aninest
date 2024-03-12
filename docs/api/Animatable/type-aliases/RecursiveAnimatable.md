[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / RecursiveAnimatable

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

[Animate/Animatable.ts:79](https://github.com/plexigraph/aninest/blob/bb3b3dd/src/Animate/Animatable.ts#L79)
