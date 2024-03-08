**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / Animation

# Type alias: Animation\<Animating\>

`Namespace`

> **Animation**\<`Animating`\>: [`AnimationWithoutChildren`](AnimationWithoutChildren.md)\<`Animating`\> & `Object`

Animation

## Type declaration

### children

> **`readonly`** **children**: `{ [P in keyof Animating]: Animating[P] extends number ? undefined : Animation<RecursiveAnimatable<Animating[P]>> }`

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](RecursiveAnimatable.md)\<`unknown`\>

## Source

[Animate/Animatable.ts:67](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L67)
