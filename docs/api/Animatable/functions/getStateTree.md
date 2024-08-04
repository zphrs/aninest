[aninest](../../index.md) / [Animatable](../index.md) / getStateTree

# getStateTree()

```ts
function getStateTree<Animating>(
   anim, 
   into, 
   skipFrom): Animating
```

Gets the full state of the animation, including all children.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **into**: `object` = `...`

• **skipFrom**: `boolean` = `false`

## Returns

`Animating`

## Example

```ts
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const state = getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 1, y: 1}}
const stateA = getStateTree(anim.children.a) // {x: 0, y: 0}
const stateB = getStateTree(anim.children.b) // {x: 1, y: 1}
```

## Defined in

<<<<<<< HEAD
[Animate/Animatable.ts:377](https://github.com/zphrs/aninest/tree//core/src/Animate/Animatable.ts#L377)
=======
[Animate/Animatable.ts:377](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Animatable.ts#L377)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
