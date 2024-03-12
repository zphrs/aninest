[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / removeRecursiveListener

# removeRecursiveListener()

```ts
removeRecursiveListener<Animating>(
   anim, 
   type, 
   listener): void
```

Removes a recursive start listener from the animation

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

## Returns

`void`

## Example

```ts
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = () => console.log("started")
addRecursiveListener(anim, "start", listener)

modifyTo(anim.children.a, {x: 1}) // will trigger the listener

removeRecursiveListener(anim, "start", listener)
modifyTo(anim.children.a, {x: 0}) // will not trigger the listener
```

## Source

[Animate/Animatable.ts:507](https://github.com/plexigraph/aninest/blob/bb3b3dd/src/Animate/Animatable.ts#L507)
