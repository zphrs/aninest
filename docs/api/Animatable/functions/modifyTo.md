[aninest](../../index.md) / [Animatable](../index.md) / modifyTo

# modifyTo()

```ts
modifyTo<Animating>(anim, to): void
```

Sets the final stopping point of the animation.
The animation will start to interpolate to the new state the next
time [updateAnimation](updateAnimation.md) is called.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **to**: [`PartialRecursive`](../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>

The new partial state of the animation. A partial state
means that if the complete state is `{ a: 0, b: 0 }` and you call `modifyTo(anim, { a: 1 })`,
the new target state will be `{ a 1, b: 0 }`.

## Returns

`void`

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

## See

[Vec2](../../Vec2/type-aliases/Vec2.md)

## Source

[Animate/Animatable.ts:241](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Animatable.ts#L241)
