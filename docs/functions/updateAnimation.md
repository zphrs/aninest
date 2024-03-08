**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / updateAnimation

# Function: updateAnimation()

> **updateAnimation**\<`Animating`\>(`anim`, `dt`): `boolean`

Updates the animation by incrementing the current timestamp of the animation by `dt`.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **dt**: `number`

The time to increment the animation by. Must be positive. If negative or zero then no-op.

## Returns

`boolean`

whether the animation needs to be updated again

## Source

[Animate/Animatable.ts:510](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L510)
