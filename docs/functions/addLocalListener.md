**@plexigraph/aninest** • [Readme](../README.md) \| [API](../globals.md)

***

[@plexigraph/aninest](../README.md) / addLocalListener

# Function: addLocalListener()

> **addLocalListener**\<`Animating`\>(`anim`, `type`, `listener`): `void`

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

"start", "end", "bounce", "interrupt"

• **listener**: [`Listener`](../type-aliases/Listener.md)\<`Partial`\<[`LocalRecursiveAnimatable`](../type-aliases/LocalRecursiveAnimatable.md)\<`Animating`\>\>\>

The listener function - return true from the function to remove the listener

## Returns

`void`

## Description

adds a local listener to the animation. You can listen to the following events:
- start
- end
- bounce: hitting a bound
- interrupt: when a new `modifyTo` is called before the animation is finished
Animation listeners are scoped to only trigger when the current level of the animation is modified.

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
```

## See

 - [addRecursiveStartListener](addRecursiveStartListener.md) for a recursive listener which triggers on any child modification
 - [removeListener](removeListener.md) to remove a listener from an animation

## Source

[Animate/Animatable.ts:268](https://github.com/plexigraph/aninest/blob/b607a0c/src/Animate/Animatable.ts#L268)
