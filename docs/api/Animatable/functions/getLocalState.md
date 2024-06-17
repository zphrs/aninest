[aninest](../../index.md) / [Animatable](../index.md) / getLocalState

# getLocalState()

```ts
getLocalState<Animating>(anim, into): LocalAnimatable<Animating>
```

Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.
To access the local state of a child, use `anim.children.childName` as the input.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **into**: [`LocalAnimatable`](../type-aliases/LocalAnimatable.md)\<`Animating`\>= `undefined`

## Returns

[`LocalAnimatable`](../type-aliases/LocalAnimatable.md)\<`Animating`\>

The local state of the animation

## Example

```ts
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(1, 1)}, getLinearInterp(1))
const localState = getLocalState(anim) // {}
const localStateA = getLocalState(anim.children.a) // {x: 0, y: 0}
const localStateB = getLocalState(anim.children.b) // {x: 1, y: 1}
```

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: 1 }, NO_INTERP)
const localState = getLocalState(anim) // { b: 1 }
const localStateA = getLocalState(anim.children.a) // { x: 0, y: 0 }
```

## Source

[Animate/Animatable.ts:924](https://github.com/zphrs/aninest/blob/729a7d6/src/Animate/Animatable.ts#L924)
