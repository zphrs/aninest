[@aninest/extensions](../../index.md) / [DynamicDuration](../index.md) / setRecursiveDynamicDuration

# setRecursiveDynamicDuration()

```ts
function setRecursiveDynamicDuration<Animating>(
   anim, 
   mask, 
   interp, 
   speed, ...
   params): unmount
```

Sets the duration of an animation to be dynamic based on the distance between
the start and end points.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **mask**: `Partial`\<`Mask`\<`Animating`\>\> = `{}`

• **interp**: [`InterpWithDuration`](../type-aliases/InterpWithDuration.md)

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

`unmount`

## Defined in

[../../extensions/src/dynamicDuration.ts:67](https://github.com/zphrs/aninest/blob/faa26c191e539bfffb0686de3335249d40ae5db1/extensions/src/dynamicDuration.ts#L67)
