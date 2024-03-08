[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / addLocalListener

# addLocalListener()

```ts
addLocalListener<Animating>(
   anim, 
   type, 
   listener): void
```

Adds a local listener to the animation. You can listen to the following events:
- start
- end
- bounce: hitting a bound
- interrupt: when a new `modifyTo` is called before the animation is finished
Animation listeners are scoped to only trigger when the current level of the animation is modified.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

"start", "end", "bounce", "interrupt"

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`Partial`\<[`LocalAnimatable`](../type-aliases/LocalAnimatable.md)\<`Animating`\>\>\>

The listener function - return true from the function to remove the listener

## Returns

`void`

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

[Animate/Animatable.ts:352](https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L352)