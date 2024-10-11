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

[../../extensions/src/dynamicDuration.ts:44](https://github.com/zphrs/aninest/blob/988b5e8ac7585d70f507e793229537041ab3eea8/extensions/src/dynamicDuration.ts#L44)
