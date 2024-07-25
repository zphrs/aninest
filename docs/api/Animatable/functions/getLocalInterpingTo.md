[aninest](../../index.md) / [Animatable](../index.md) / getLocalInterpingTo

# getLocalInterpingTo()

```ts
getLocalInterpingTo<Animating>(anim, into): LocalAnimatable<Animating>
```

Gets the local target state that the animation is currently headed to.
If the animation is not headed to any state, it will return the current state.
This only returns the local state of the animation, meaning only the numbers
in the topmost level of the animation.

## Type parameters

• **Animating** extends `Partial`\<[`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<[`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>\>\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **into**: `object`= `{}`

## Returns

[`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<`Animating`\>

The local target state of the animation

## Example

```ts
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getLocalInterpingTo(anim) // {b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getLocalInterpingTo(anim) // {b: 1, c: 0}
```

## Source

[Animate/Animatable.ts:533](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Animatable.ts#L533)
