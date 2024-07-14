[aninest](../../index.md) / [Animatable](../index.md) / getInterpingToTree

# getInterpingToTree()

```ts
getInterpingToTree<Animating>(anim, into): Animating
```

Gets the total target state that the animation is currently headed to.
If the animation is not headed to any state, it will return the current state.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **into**: `object`= `{}`

## Returns

`Animating`

## Example

```ts
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getInterpingToTree(anim) // {a: {x: 0, y: 0}, b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0}
```

## Source

[Animate/Animatable.ts:519](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/Animatable.ts#L519)
