[aninest](../../../index.md) / [Extensions/DynamicSpeed](../index.md) / dynamicSpeedExtension

# dynamicSpeedExtension()

```ts
dynamicSpeedExtension<Animating>(
   interp, 
   speed, ...
params): Extension<Animating>
```

Extension to make the animation speed dynamic based on
the distance between the start and end points.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **interp**: `InterpWithSpeed`

The interpolation function to use.

• **speed**: `number`

The speed in units per second.

• ...**params**: `unknown`[]

The additional parameters to pass to the interpolation
function (after `duration`).

## Returns

[`Extension`](../../type-aliases/Extension.md)\<`Animating`\>

## Source

Animate/Extensions/dynamicSpeed.ts:27
