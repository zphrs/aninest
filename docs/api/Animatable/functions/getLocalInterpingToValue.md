[aninest root](../../index.md) / [Animatable](../index.md) / getLocalInterpingToValue

# getLocalInterpingToValue()

```ts
function getLocalInterpingToValue<Animating>(anim, key): number | undefined
```

Gets a value

## Type Parameters

• **Animating** *extends* [`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<[`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **key**: keyof `Animating`

## Returns

`number` \| `undefined`

## Defined in

[Animate/Animatable.ts:597](https://github.com/zphrs/aninest/blob/8c5d5cec878cb0688cbcb852e4de66105e356f88/core/src/Animate/Animatable.ts#L597)
