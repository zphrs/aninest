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

[Utils/sleep.ts:9](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Utils/sleep.ts#L9)
