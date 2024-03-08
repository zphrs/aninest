**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / Listener

# Type alias: Listener\<T\>

> **Listener**\<`T`\>: (`currentLocalState`) => `boolean` \| `void`

## Example

```ts
() => true // remove listener
() => false // keep listener
() => {} // keep listener
```

## Example

```ts
({a, b}) => console.log(a, b)
```

## Type parameters

• **T**

## Parameters

• **currentLocalState**: `T`

## Returns

`boolean` \| `void`

## Source

[Listeners.ts:10](https://github.com/plexigraph/aninest/blob/b607a0c/src/Listeners.ts#L10)
