[@plexigraph/aninest](../../index.md) / [Listeners](../index.md) / Listener

# Listener\<T\>

```ts
type Listener<T>: (currentLocalState) => boolean | void;
```

A listener function that is called when an event is broadcast.

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

[Listeners.ts:14](https://github.com/plexigraph/aninest/blob/55953ac/src/Listeners.ts#L14)
