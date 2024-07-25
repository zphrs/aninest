[aninest](../../../index.md) / [Extensions/DynamicDuration](../index.md) / setRecursiveDynamicDuration

# setRecursiveDynamicDuration()

```ts
setRecursiveDynamicDuration<Animating>(
   anim, 
   mask, 
   interp, 
   speed, ...
   params): unmount
```

Sets the duration of an animation to be dynamic based on the distance between
the start and end points.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **mask**: `Partial`\<[`Mask`](../../../RecursiveHelpers/type-aliases/Mask.md)\<`Animating`\>\>= `{}`

• **interp**: [`InterpWithDuration`](../type-aliases/InterpWithDuration.md)

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

[`unmount`](../../../Extension/type-aliases/unmount.md)

## Source

[Animate/Extensions/dynamicDuration.ts:61](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extensions/dynamicDuration.ts#L61)
