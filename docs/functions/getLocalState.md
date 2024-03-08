**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / getLocalState

# Function: getLocalState()

> **getLocalState**\<`Animating`\>(`anim`): [`LocalRecursiveAnimatable`](../type-aliases/LocalRecursiveAnimatable.md)\<`Animating`\>

Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation.
To access the local state of a child, use `anim.children.childName` as the input.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

## Returns

[`LocalRecursiveAnimatable`](../type-aliases/LocalRecursiveAnimatable.md)\<`Animating`\>

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

[Animate/Animatable.ts:468](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L468)
