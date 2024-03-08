**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / RecursiveAnimatable

# Type alias: RecursiveAnimatable\<T\>

> **RecursiveAnimatable**\<`T`\>: `{ [P in keyof T]: T[P] extends RecursiveAnimatable<unknown> ? RecursiveAnimatable<T[P]> : number }`

## Example

```ts
{
 *   a: {
 *     x: 0,
 *     y: 0,
 * },
 *   b: {
 *     x: 1,
 *     y: 1,
 *   }
 * }
```

## Type parameters

• **T**

## Source

[Animate/Animatable.ts:29](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L29)
