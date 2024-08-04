[aninest](../../index.md) / [AnimatableEvents](../index.md) / addLocalListener

# addLocalListener()

```ts
function addLocalListener<Animating, Event>(
   anim, 
   type, 
   listener): unsubscribe
```

Adds a local listener to the animation. You can listen to the  events listed in [AnimatableEvents](../type-aliases/AnimatableEvents.md).
Animation listeners are scoped to only trigger when the current level of the animation is modified.
Animation listeners are called in the order in which they were added.

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

The listener function - return true from the function to remove the listener

## Returns

[`unsubscribe`](../../AnimatableTypes/type-aliases/unsubscribe.md)

A function to remove the listener

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addLocalListener(anim, "start", state => console.log("started", state)) // will never get triggered no matter what
addLocalListener(anim.children.a, "start", state => console.log("started", state)) // will trigger
modifyTo(anim, {a: {x: 1}}) // will trigger the listener on the 'a' child
```

## See

[addRecursiveListener](addRecursiveListener.md) for a recursive listener which triggers on any child modification

## Defined in

[Animate/AnimatableEvents.ts:58](https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/core/src/Animate/AnimatableEvents.ts#L58)
