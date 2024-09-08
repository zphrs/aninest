[aninest](../../index.md) / [Animatable](../index.md) / getInterpingToTree

# getInterpingToTree()

```ts
function getInterpingToTree<Animating>(anim, into): Animating
```

Gets the full state tree that the animation is currently interpolating to.
If the animation is not headed to any state, it will return the current state.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **into**: `object` = `{}`

## Returns

`Animating`

## Example

```ts
const anim = createAnimation({a: newVec(0, 0), b: 0, c: 0}, getLinearInterp(1))
getInterpingToTree(anim) // {a: {x: 0, y: 0}, b: 0, c: 0}
modifyTo(anim, {a: newVec(1, 1), b: 1})
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0}
updateAnimation(anim, 0.5)
getInterpingToTree(anim) // {a: {x: 1, y: 1}, b: 1, c: 0} - same as before update
```

## Defined in

[Animate/Animatable.ts:622](https://github.com/zphrs/aninest/blob/93165c72e5bf58f07554172fb8f04e60bd3cd7ed/core/src/Animate/Animatable.ts#L622)
