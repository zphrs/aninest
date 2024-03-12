[aninest](../../index.md) / [Animatable](../index.md) / getInterpingToTree

# getInterpingToTree()

```ts
getInterpingToTree<Animating>(anim): Animating
```

Gets the total target state that the animation is currently headed to.
If the animation is not headed to any state, it will return the current state.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

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

[Animate/Animatable.ts:815](https://github.com/plexigraph/aninest/blob/9e50535/src/Animate/Animatable.ts#L815)
