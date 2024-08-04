[aninest](../../index.md) / [sleep](../index.md) / sleep

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

[Utils/sleep.ts:9](https://github.com/zphrs/aninest/blob/765f2ede3df887f1f3a3e1391afab09a932de29a/core/src/Utils/sleep.ts#L9)
