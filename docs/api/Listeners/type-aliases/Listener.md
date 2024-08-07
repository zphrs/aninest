[aninest](../../index.md) / [Listeners](../index.md) / Listener

# Listener()\<T\>

```ts
type Listener<T>: (currentLocalState) => boolean | void | Promise<void>;
```

A listener function that is called when an event is broadcast.

## Type Parameters

• **T**

## Parameters

• **currentLocalState**: `T`

## Returns

`boolean` \| `void` \| `Promise`\<`void`\>

## Description

The listener can return `true` to remove itself from the listener set, `false` to keep itself in the listener set, or `void` to keep itself in the listener set.

## Examples

```ts
() => true // remove listener
() => false // keep listener
() => {} // keep listener
```

```ts
({a, b}) => console.log(a, b)
```

## Defined in

[Listeners.ts:15](https://github.com/zphrs/aninest/blob/765f2ede3df887f1f3a3e1391afab09a932de29a/core/src/Listeners.ts#L15)
