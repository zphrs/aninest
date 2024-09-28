[aninest](../../index.md) / [AnimatableEvents](../index.md) / removeRecursiveListener

# removeRecursiveListener()

```ts
function removeRecursiveListener<Animating>(
   anim, 
   type, 
   listener): void
```

Removes a recursive start listener from the animation

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **type**: 
  \| `"beforeStart"`
  \| `"start"`
  \| `"end"`
  \| `"interrupt"`
  \| `"beforeEnd"`

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<[`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<[`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<[`Animatable`](../../AnimatableTypes/type-aliases/Animatable.md)\>\>\>

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

## Defined in

[Animate/AnimatableEvents.ts:155](https://github.com/zphrs/aninest/blob/faa26c191e539bfffb0686de3335249d40ae5db1/core/src/Animate/AnimatableEvents.ts#L155)
