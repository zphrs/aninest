[aninest](../../index.md) / [Animatable](../index.md) / getStateTree

# getStateTree()

```ts
getStateTree<Animating>(
   anim, 
   into, 
   skipFrom): Animating
```

Gets the full state of the animation, including all children.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **into**: `object`= `undefined`

• **skipFrom**: `boolean`= `false`

## Returns

`Animating`

## Example

```ts
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const state = getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 1, y: 1}}
const stateA = getStateTree(anim.children.a) // {x: 0, y: 0}
const stateB = getStateTree(anim.children.b) // {x: 1, y: 1}
```

## Source

[Animate/Animatable.ts:377](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Animatable.ts#L377)
