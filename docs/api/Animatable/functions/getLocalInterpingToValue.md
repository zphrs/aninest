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

[Animate/Animatable.ts:555](https://github.com/zphrs/aninest/blob/765f2ede3df887f1f3a3e1391afab09a932de29a/core/src/Animate/Animatable.ts#L555)
