[aninest](../../index.md) / [Animatable](../index.md) / addLocalListener

# addLocalListener()

```ts
addLocalListener<Animating, Event>(
   anim, 
   type, 
   listener): unsubscribe
```

Adds a local listener to the animation. You can listen to the following events:
- start
- end
- bounce: hitting a bound
- interrupt: when a new `modifyTo` is called before the animation is finished
Animation listeners are scoped to only trigger when the current level of the animation is modified.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **Event** extends [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: `Event`

"start", "end", "bounce", "interrupt", "update"

• **listener**: `Event` extends 
  \| `"start"`
  \| `"end"`
  \| `"beforeEnd"`
  \| `"bounce"`
  \| `"interrupt"`
  \| `"update"` ? [`Listener`](../../Listeners/type-aliases/Listener.md)\<`Partial`\<[`LocalAnimatable`](../type-aliases/LocalAnimatable.md)\<`Animating`\>\>\> : [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

The listener function - return true from the function to remove the listener

## Returns

`unsubscribe`

A function to remove the listener

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addLocalListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addLocalListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
```

## See

 - [addRecursiveListener](addRecursiveListener.md) for a recursive listener which triggers on any child modification
 - removeListener to remove a listener from an animation

## Source

[Animate/Animatable.ts:492](https://github.com/zphrs/aninest/blob/729a7d6/src/Animate/Animatable.ts#L492)
