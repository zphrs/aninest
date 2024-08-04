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

[Animate/Mode.ts:12](https://github.com/zphrs/aninest/blob/3019702e634994a4353fce5adc21aa1a16369bbd/core/src/Animate/Mode.ts#L12)
