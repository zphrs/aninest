[aninest root](../../index.md) / [sleep](../index.md) / sleep

# sleep()

```ts
function sleep(seconds): Promise<void>
```

Sleep for a given number of seconds, supporting await syntax.

## Parameters

• **seconds**: `number`

## Returns

`Promise`\<`void`\>

## Example

```ts
await sleep(1) // sleep for 1 second
```

## Defined in

[Utils/sleep.ts:9](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Utils/sleep.ts#L9)
