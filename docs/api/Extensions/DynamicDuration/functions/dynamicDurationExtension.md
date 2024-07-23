[aninest](../../../index.md) / [Extensions/DynamicDuration](../index.md) / dynamicDurationExtension

# dynamicDurationExtension()

```ts
dynamicDurationExtension<Animating>(
   mask, 
   interp, 
   speed, ...
params): Extension<Animating>
```

Extension to make the animation duration dynamic based on
the distance between the start and end points.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **mask**: `Partial`\<[`Mask`](../../../RecursiveHelpers/type-aliases/Mask.md)\<`Animating`\>\>= `{}`

• **interp**: [`InterpWithDuration`](../type-aliases/InterpWithDuration.md)

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

[`Extension`](../../../Extension/type-aliases/Extension.md)\<`Animating`\>

## Source

[Animate/Extensions/dynamicDuration.ts:38](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/dynamicDuration.ts#L38)
