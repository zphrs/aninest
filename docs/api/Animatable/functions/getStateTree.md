[aninest](../../index.md) / [Animatable](../index.md) / getStateTree

# getStateTree()

```ts
getStateTree<Animating>(anim, into): Animating
```

Gets the total state of the animation, including all children.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **into**: `object`= `undefined`

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

[Animate/Animatable.ts:959](https://github.com/zphrs/aninest/blob/a2c9b37/src/Animate/Animatable.ts#L959)
