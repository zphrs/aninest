**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / createAnimation

# Function: createAnimation()

> **createAnimation**\<`Init`\>(`init`, `timing`, `bounds`?): [`Animation`](../type-aliases/Animation.md)\<`Init`\>

## Type parameters

• **Init** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **init**: `Init`

The initial state of the animation

• **timing**: [`Interp`](../type-aliases/Interp.md)

The timing function. See [Interp.ts](./Interp.ts) for some common timing functions

• **bounds?**: [`Bounds`](../type-aliases/Bounds.md)\<`Init`\>

Optional bounds for the animation. The animation will be loosely clamped to these bounds

## Returns

[`Animation`](../type-aliases/Animation.md)\<`Init`\>

The animation info object.

## Description

Creates an animation info object, automatically inferring type from the init object.

## Example

```ts
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
  upper: { a: 1, b: 1 },
  lower: { a: -1, b: -1 },
})
```

## Source

[Animate/Animatable.ts:172](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L172)
