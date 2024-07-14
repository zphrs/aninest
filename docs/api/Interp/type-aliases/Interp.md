[aninest](../../index.md) / [Interp](../index.md) / Interp

# Interp

```ts
type Interp: (t) => number | undefined;
```

Interpolation function.
At time 0 it should return either 0 or null (for [NO_INTERP](../functions/NO_INTERP.md))

## Parameters

• **t**: `number`

Time in seconds. Guaranteed to be positive.

## Returns

`number` \| `undefined`

## Source

[Animate/Interp.ts:15](https://github.com/zphrs/aninest/blob/b0ed172/src/Animate/Interp.ts#L15)
