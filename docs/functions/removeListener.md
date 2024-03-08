**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / removeListener

# Function: removeListener()

> **removeListener**\<`Animating`\>(`anim`, `type`, `listener`): `void`

Removes a listener from the animation

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

"start", "end", "bounce", "interrupt" - the type used to add the listener

• **listener**: [`Listener`](../type-aliases/Listener.md)\<`Partial`\<[`LocalRecursiveAnimatable`](../type-aliases/LocalRecursiveAnimatable.md)\<`Animating`\>\>\>

The listener function to remove

## Returns

`void`

## See

addListener to add a listener to an animation

## Example

```ts
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = state => console.log("started", state)
addListener(anim, "start", listener)

modifyTo(anim, {a: {x: 1}}) // will trigger the listener

removeListener(anim, "start", listener)
modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
```

## Source

[Animate/Animatable.ts:295](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L295)
