**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / AnimationWithoutChildren

# Type alias: AnimationWithoutChildren\<Animating\>

> **AnimationWithoutChildren**\<`Animating`\>: `Object` & [`Listeners`](Listeners.md)\<[`AnimatableEvents`](AnimatableEvents.md), `Partial`\<[`LocalRecursiveAnimatable`](LocalRecursiveAnimatable.md)\<`Animating`\>\>\> & [`Listeners`](Listeners.md)\<`"recursiveStart"`, `undefined`\>

## Type declaration

### \_bounds

> **\_bounds**: [`Bounds`](Bounds.md)\<[`LocalRecursiveAnimatable`](LocalRecursiveAnimatable.md)\<`Animating`\>\>

### \_from

> **\_from**: [`LocalRecursiveAnimatable`](LocalRecursiveAnimatable.md)\<`Animating`\>

### \_time

> **\_time**: `number`

### \_timingFunction

> **\_timingFunction**: [`Interp`](Interp.md)

### \_to

> **\_to**: `Partial`\<[`LocalRecursiveAnimatable`](LocalRecursiveAnimatable.md)\<`Animating`\>\> \| `null`

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](RecursiveAnimatable.md)\<`unknown`\>

## Source

[Animate/Animatable.ts:53](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L53)
