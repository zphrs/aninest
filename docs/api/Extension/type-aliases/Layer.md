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

[Animate/Extension.ts:47](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/Extension.ts#L47)
