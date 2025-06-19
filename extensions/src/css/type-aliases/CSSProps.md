[@aninest/extensions](../../../../aninest/extensionDocs/index.md) / [../../extensions/src/css](../index.md) / CSSProps

# CSSProps

```ts
type CSSProps: object;
```

Note: values have units. If you want different units
then

## Type declaration

### backgroundColor?

```ts
optional backgroundColor: Color;
```

### borderColor?

```ts
optional borderColor: Color;
```

### borderRadius?

```ts
optional borderRadius: BorderRadius;
```

### color?

```ts
optional color: Color;
```

### opacity?

```ts
optional opacity: Scalar;
```

### transform?

```ts
optional transform: Transform;
```

### vars?

```ts
optional vars: object;
```

A key with camel case will be converted to skewered.
If in skewer format already, key will be left alone.
No need for first two dashes.

#### Index Signature

 \[`key`: `string`\]: `string`

## Defined in

[../../extensions/src/css/index.ts:117](https://github.com/zphrs/aninest/blob/3abbfe57ec79530e3a03f1081dec571fda0e2dde/extensions/src/css/index.ts#L117)
