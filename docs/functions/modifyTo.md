**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / modifyTo

# Function: modifyTo()

> **modifyTo**\<`Animating`\>(`anim`, `to`): `void`

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **to**: `PartialRecursiveAnimatable`\<`Animating`\>

The new partial state of the animation. A partial state
means that if the complete state is `{ a: 0, b: 0 }` and you call `modifyTo(anim, { a: 1 })`,
the new target state will be `{ a: 1, b: 0 }`.

## Returns

`void`

## Description

Sets the final stopping point of the animation.
The animation will start to interpolate to the new state.

## Example

```ts
modifyTo<{a: number, b: number}>(anim, { a: 1, b: 1 })
```

## Example

```ts
modifyTo<{a: Vec2, b: Vec2}>(anim, {a: {x: 1}})
```

## Example

```ts
modifyTo<{a: Vec2, b: Vec2}>(anim.children.a, {x: 1})
```

## Source

[Animate/Animatable.ts:224](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L224)
