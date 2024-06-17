[aninest](../../index.md) / [Animatable](../index.md) / removeLocalListener

# removeLocalListener()

```ts
removeLocalListener<Animating, Event>(
   anim, 
   type, 
   listener): void
```

Removes a listener from the animation

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

The listener function to remove

## Returns

`void`

## See

[addLocalListener](addLocalListener.md) to add a listener to an animation

## Example

```ts
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = state => console.log("started", state)
addLocalListener(anim, "start", listener)

modifyTo(anim, {a: {x: 1}}) // will trigger the listener

removeLocalListener(anim, "start", listener)
modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
```

## Source

[Animate/Animatable.ts:524](https://github.com/zphrs/aninest/blob/9544357/src/Animate/Animatable.ts#L524)
