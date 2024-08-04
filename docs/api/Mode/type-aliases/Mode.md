[aninest](../../index.md) / [Mode](../index.md) / Mode

# Mode

```ts
type Mode: object;
```

Provides on, off, and toggle functions to toggle an [ExtensionStack](../../ExtensionStack/type-aliases/ExtensionStack.md).`

## Type declaration

### off()

```ts
off: () => void;
```

#### Returns

`void`

### on()

```ts
on: () => void;
```

#### Returns

`void`

### toggle()

```ts
toggle: (to?) => void;
```

Will toggle the mode on or off depending on the value of `to`.
If the mode is already set to match `to` then this function is a no-op.

#### Parameters

• **to?**: `boolean`

`true` to turn the mode on, `false` to turn the mode off,
and undefined to toggle.

#### Returns

`void`

## Defined in

<<<<<<< HEAD
[Animate/Mode.ts:12](https://github.com/zphrs/aninest/tree//core/src/Animate/Mode.ts#L12)
=======
[Animate/Mode.ts:12](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Mode.ts#L12)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
