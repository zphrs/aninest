**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / LocalRecursiveAnimatable

# Type alias: LocalRecursiveAnimatable\<T\>

> **LocalRecursiveAnimatable**\<`T`\>: `{ [P in keyof T]: T[P] extends number ? number : undefined }` & [`Animatable`](Animatable.md)

## Type parameters

• **T**

## Source

[Animate/Animatable.ts:35](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L35)
