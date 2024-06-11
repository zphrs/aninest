[aninest](../../index.md) / [sleep](../index.md) / sleep

# sleep()

```ts
sleep(seconds): Promise<void>
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

## Source

[Utils/sleep.ts:9](https://github.com/zphrs/aninest/blob/a2c9b37/src/Utils/sleep.ts#L9)
