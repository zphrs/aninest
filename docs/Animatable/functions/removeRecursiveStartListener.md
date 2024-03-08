[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / removeRecursiveStartListener

# removeRecursiveStartListener()

```ts
removeRecursiveStartListener<Animating>(anim, listener): void
```

Removes a recursive start listener from the animation

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

## Returns

`void`

## Example

```ts
// setup
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
const listener = () => console.log("started")
addRecursiveStartListener(anim, listener)

modifyTo(anim.children.a, {x: 1}) // will trigger the listener

removeRecursiveStartListener(anim, listener)
modifyTo(anim.children.a, {x: 0}) // will not trigger the listener
```

## Source

[Animate/Animatable.ts:340](https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L340)