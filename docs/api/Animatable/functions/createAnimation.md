[aninest](../../index.md) / [Animatable](../index.md) / createAnimation

# createAnimation()

```ts
function createAnimation<Init>(init, timing): Animation<Init>
```

Creates an animation info object, automatically inferring type from the init object.

## Type Parameters

• **Init** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **init**: `Init`

The initial state of the animation

• **timing**: [`Interp`](../../module:Interp/type-aliases/Interp.md)

The timing function. See [Interp](../../module:Interp/type-aliases/Interp.md) for some common timing functions.

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

## Defined in

<<<<<<< HEAD
[Animate/Animatable.ts:140](https://github.com/zphrs/aninest/tree//core/src/Animate/Animatable.ts#L140)
=======
[Animate/Animatable.ts:140](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Animatable.ts#L140)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
