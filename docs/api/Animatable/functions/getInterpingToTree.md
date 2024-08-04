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

<<<<<<< HEAD
[Animate/Animatable.ts:579](https://github.com/zphrs/aninest/tree//core/src/Animate/Animatable.ts#L579)
=======
[Animate/Animatable.ts:573](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Animatable.ts#L573)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
