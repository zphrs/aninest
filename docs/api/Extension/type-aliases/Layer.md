[aninest](../../index.md) / [Extension](../index.md) / Layer

# Layer\<Animating\>

```ts
type Layer<Animating>: object;
```

A layer that can be mounted to an animation via its `mount` function.

## Type Parameters

• **Animating** *extends* [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Type declaration

### mount

```ts
mount: Mount<Animating>;
```

Mounts a layer to a specific Animation.

## Defined in

[Animate/Extension.ts:47](https://github.com/zphrs/aninest/blob/3019702e634994a4353fce5adc21aa1a16369bbd/core/src/Animate/Extension.ts#L47)
