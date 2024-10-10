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

[Animate/Animatable.ts:597](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/Animatable.ts#L597)
