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

[Animate/Animatable.ts:554](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/core/src/Animate/Animatable.ts#L554)
