[aninest](../../index.md) / [Extension](../index.md) / Layer

# Layer\<Animating\>

```ts
type Layer<Animating>: Object;
```

A layer that can be mounted to an animation via its `mount` function.

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.md)

## Type declaration

### mount

```ts
mount: Mount<Animating>;
```

Mounts a layer to a specific Animation.

## Source

[Animate/Extension.ts:47](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/Extension.ts#L47)
