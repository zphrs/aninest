[aninest](../../index.md) / [Animatable](../index.md) / getLocalInterpingToValue

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

[Animate/Animatable.ts:554](https://github.com/zphrs/aninest/blob/c0759892862ca3c4697d159317f2939666662924/core/src/Animate/Animatable.ts#L554)
