[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / removeListener

# removeListener()

```ts
removeListener<Animating>(
   anim, 
   type, 
   listener): void
```

Removes a listener from the animation

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: `AnimatableEvents`

"start", "end", "bounce", "interrupt" - the type used to add the listener

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`Partial`\<`LocalRecursiveAnimatable`\<`Animating`\>\>\>

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
addListener(anim, "start", listener)

modifyTo(anim, {a: {x: 1}}) // will trigger the listener

removeListener(anim, "start", listener)
modifyTo(anim, {a: {x: 0}}) // will not trigger the listener
```

## Source

[Animate/Animatable.ts:294](https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L294)
