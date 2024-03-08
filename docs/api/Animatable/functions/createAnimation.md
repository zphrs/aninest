[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / createAnimation

# createAnimation()

```ts
createAnimation<Init>(
   init, 
   timing, 
bounds?): Animation<Init>
```

Creates an animation info object, automatically inferring type from the init object.

## Type parameters

• **Init** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **init**: `Init`

The initial state of the animation

• **timing**: [`Interp`](../../Interp/type-aliases/Interp.md)

The timing function. See [Interp.ts](./Interp.ts) for some common timing functions

• **bounds?**: [`Bounds`](../type-aliases/Bounds.md)\<`Init`\>

Optional bounds for the animation. The animation will be loosely clamped to these bounds

## Returns

[`Animation`](../type-aliases/Animation.md)\<`Init`\>

The animation info object.

## Example

```ts
const anim = createAnimation({ a: 0, b: 0 }, getLinearInterp(1), {
 upper: { a: 1, b: 1 },
 lower: { a: -1, b: -1 },
})
```

## Source

[Animate/Animatable.ts:257](https://github.com/plexigraph/aninest/blob/ed5e272/src/Animate/Animatable.ts#L257)
