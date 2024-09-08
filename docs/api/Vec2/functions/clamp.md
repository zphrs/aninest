[aninest](../../index.md) / [Vec2](../index.md) / clamp

# clamp()

```ts
function clamp(
   min, 
   n, 
   max): number
```

Clamps a value between a minimum and maximum value.

## Parameters

• **min**: `undefined` \| `number`

The minimum clamping value. If undefined, no minimum clamping is done.

• **n**: `number`

The value to clamp.

• **max**: `undefined` \| `number`

The maximum clamping value. If undefined, no maximum clamping is done.

## Returns

`number`

The clamped value.

## Example

```ts
let value = 1.5
let clampedValue = clamp(0, value, 1) // clampedValue is 1
```

## Defined in

[Utils/vec2.ts:52](https://github.com/zphrs/aninest/blob/93165c72e5bf58f07554172fb8f04e60bd3cd7ed/core/src/Utils/vec2.ts#L52)
