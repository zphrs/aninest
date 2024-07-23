[aninest](../../index.md) / [module:Interp](../index.md) / Interp

# Interp

```ts
type Interp: (t) => number | undefined;
```

Interpolation function.
At time 0 it should return either 0 or null (for [NO_INTERP](../functions/NO_INTERP.md))

## See

[NO_INTERP](../functions/NO_INTERP.md), [getLinearInterp](../functions/getLinearInterp.md), [getSlerp](../functions/getSlerp.md), and [getCubicBezier](../functions/getCubicBezier.md)
to create interpolation functions.

## Parameters

• **t**: `number`

Time in seconds. Guaranteed to be positive.

## Returns

`number` \| `undefined`

## Source

[Animate/Interp.ts:17](https://github.com/zphrs/aninest/blob/60918f7/src/Animate/Interp.ts#L17)
