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

[Utils/sleep.ts:9](https://github.com/zphrs/aninest/tree//core/src/Utils/sleep.ts#L9)