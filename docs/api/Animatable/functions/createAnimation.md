[aninest](../../index.md) / [Animatable](../index.md) / createAnimation

# createAnimation()

```ts
createAnimation<Init>(init, timing): Animation<Init>
```

Creates an animation info object, automatically inferring type from the init object.

## Type parameters

• **Init** extends [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **init**: `Init`

The initial state of the animation

• **timing**: [`Interp`](../../Interp/type-aliases/Interp.md)

The timing function. See [Interp.ts](./Interp.ts) for some common timing functions

## Returns

[`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Init`\>

The animation info object.

## Example

```ts
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
 upper: { a: 1, b: 1 },
 lower: { a: -1, b: -1 },
})
```

## Source

[Animate/Animatable.ts:123](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/Animatable.ts#L123)
