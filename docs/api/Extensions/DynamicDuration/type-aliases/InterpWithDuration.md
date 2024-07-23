[aninest](../../../index.md) / [Extensions/DynamicDuration](../index.md) / InterpWithDuration

# InterpWithDuration

```ts
type InterpWithDuration: (duration, ...params) => Interp;
```

The most generic interpolation function that can be used with dynamic speed.
It only requires a duration parameter as the first argument to the construction
function of the interpolation.

## Parameters

• **duration**: `number`

• ...**params**: `unknown`[]

## Returns

[`Interp`](../../../module:Interp/type-aliases/Interp.md)

## Source

[Animate/Extensions/dynamicDuration.ts:24](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/dynamicDuration.ts#L24)
