[@aninest/extensions](../../index.md) / [DynamicDuration](../index.md) / dynamicDurationExtension

# dynamicDurationExtension()

```ts
function dynamicDurationExtension<Animating>(
   mask, 
   interp, 
   speed, ...
params): Extension<Animating>
```

Extension to make the animation duration dynamic based on
the distance between the start and end points.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **mask**: `Partial`\<`Mask`\<`Animating`\>\> = `{}`

• **interp**: [`InterpWithDuration`](../type-aliases/InterpWithDuration.md)

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

`Extension`\<`Animating`\>

## Defined in

[../../extensions/src/dynamicDuration.ts:44](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/extensions/src/dynamicDuration.ts#L44)
