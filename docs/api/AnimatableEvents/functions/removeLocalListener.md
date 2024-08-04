[aninest](../../index.md) / [AnimatableEvents](../index.md) / removeLocalListener

# ~~removeLocalListener()~~

```ts
function removeLocalListener<Animating, Event>(
   anim, 
   type, 
   listener): void
```

Removes a listener from the animation

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

• **Event** *extends* [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

The animation object

• **type**: `Event`

See [AnimatableEvents](../type-aliases/AnimatableEvents.md)

• **listener**: `Event` *extends* 
  \| `"beforeStart"`
  \| `"start"`
  \| `"end"`
  \| `"interrupt"`
  \| `"beforeEnd"` ? [`Listener`](../../Listeners/type-aliases/Listener.md)\<`Partial`\<[`LocalAnimatable`](../../AnimatableTypes/type-aliases/LocalAnimatable.md)\<`Animating`\>\>\> : [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

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

## Deprecated

Instead use the return value of `{@link addLocalListener}`.

## Defined in

[Animate/AnimatableEvents.ts:90](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableEvents.ts#L90)
