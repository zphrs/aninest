[Documentation](../../../../../../index.md) / [../../extensions/src/css](../index.md) / CSSProps

# CSSProps

```ts
type CSSProps = object;
```

Defined in: [../../extensions/src/css/index.ts:117](https://github.com/zphrs/aninest/blob/d15fc4e13610c8d581ef6e02e86e0f6d2661eb01/extensions/src/css/index.ts#L117)

Note: values have units. If you want different units
then

## Properties

### vars?

```ts
optional vars: object;
```

Defined in: [../../extensions/src/css/index.ts:130](https://github.com/zphrs/aninest/blob/d15fc4e13610c8d581ef6e02e86e0f6d2661eb01/extensions/src/css/index.ts#L130)

A key with camel case will be converted to skewered.
If in skewer format already, key will be left alone.
No need for first two dashes.

#### Index Signature

```ts
[key: string]: string
```
