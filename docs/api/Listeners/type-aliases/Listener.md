[aninest](../../index.md) / [Listeners](../index.md) / Listener

# Listener\<T\>

```ts
type Listener<T>: (currentLocalState) => boolean | void | Promise<void>;
```

A listener function that is called when an event is broadcast.

## Description

The listener can return `true` to remove itself from the listener set, `false` to keep itself in the listener set, or `void` to keep itself in the listener set.

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

`boolean` \| `void` \| `Promise`\<`void`\>

## Source

[Listeners.ts:15](https://github.com/zphrs/aninest/blob/9544357/src/Listeners.ts#L15)
