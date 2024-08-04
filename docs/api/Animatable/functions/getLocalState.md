[aninest](../../index.md) / [Animatable](../index.md) / getLocalState

# getLocalState()

```ts
function getLocalState<Animating>(
   anim, 
   into, 
skipFrom): LocalAnimatable<Animating>
```

Gets the current local state of the animation, meaning only the numbers in the topmost level of the animation.
To access the local state of a child, use `anim.children.childName` as the input.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **into**: [`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<`Animating`\> = `...`

• **skipFrom**: `boolean` = `false`

## Returns

[`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<`Animating`\>

The local state of the animation

## Examples

```ts
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const localState = getLocalState(anim) // {}
const localStateA = getLocalState(anim.children.a) // {x: 0, y: 0}
const localStateB = getLocalState(anim.children.b) // {x: 1, y: 1}
```

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
const localState = getLocalState(anim) // { b: 1 }
const localStateA = getLocalState(anim.children.a) // { x: 0, y: 0 }
```

## Defined in

[Animate/Animatable.ts:316](https://github.com/zphrs/aninest/blob/3019702e634994a4353fce5adc21aa1a16369bbd/core/src/Animate/Animatable.ts#L316)
