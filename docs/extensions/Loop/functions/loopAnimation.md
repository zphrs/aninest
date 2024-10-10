[@aninest/extensions](../../index.md) / [Loop](../index.md) / loopAnimation

# loopAnimation()

```ts
function loopAnimation<Animating>(anim): unsubscribe
```

Will loop the animation, meaning that it will loop from the initial state to the target state and jump back to the initial state.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

## Returns

`unsubscribe`

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

## Defined in

[../../extensions/src/loop.ts:49](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/extensions/src/loop.ts#L49)
