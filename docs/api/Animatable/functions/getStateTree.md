[aninest root](../../index.md) / [Animatable](../index.md) / getStateTree

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

• **into**: `object` = `{}`

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

[Animate/Animatable.ts:404](https://github.com/zphrs/aninest/blob/8c5d5cec878cb0688cbcb852e4de66105e356f88/core/src/Animate/Animatable.ts#L404)
