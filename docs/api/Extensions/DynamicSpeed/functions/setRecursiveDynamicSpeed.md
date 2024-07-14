[aninest](../../../index.md) / [Extensions/DynamicSpeed](../index.md) / setRecursiveDynamicSpeed

# setRecursiveDynamicSpeed()

```ts
setRecursiveDynamicSpeed<Animating>(
   anim, 
   interp, 
   speed, ...
   params): unmount
```

Sets the speed of an animation to be dynamic based on the distance between
the start and end points.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **interp**: `InterpWithSpeed`

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

[`unmount`](../../type-aliases/unmount.md)

## Source

Animate/Extensions/dynamicSpeed.ts:48
