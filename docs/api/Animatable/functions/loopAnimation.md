[aninest](../../index.md) / [Animatable](../index.md) / loopAnimation

# loopAnimation()

```ts
loopAnimation<Animating>(anim): () => void
```

Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

## Returns

`Function`

A function that will stop the loop when called

> ### Returns
>
> `void`
>

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

[Animate/Animatable.ts:315](https://github.com/zphrs/aninest/blob/df0807b/src/Animate/Animatable.ts#L315)
