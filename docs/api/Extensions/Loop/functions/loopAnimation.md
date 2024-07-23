[aninest](../../../index.md) / [Extensions/Loop](../index.md) / loopAnimation

# loopAnimation()

```ts
loopAnimation<Animating>(anim): unsubscribe
```

Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

A function that will stop the loop when called

## Example

```ts
const anim = createAnimation({a: 0, b: 0}, getLinearInterp(1))
loopAnimation(anim)
anim.modifyTo({a: 1, b: 1})
anim.updateAnimation(0.5)
anim.getStateTree() // {a: 0.5, b: 0.5}
anim.updateAnimation(0.49)
anim.getStateTree() // {a: ~1, b: ~1}
anim.updateAnimation(0.01) // will trigger the loop
anim.getStateTree() // {a: 0, b: 0}
```

## Source

[Animate/Extensions/loop.ts:51](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Extensions/loop.ts#L51)
