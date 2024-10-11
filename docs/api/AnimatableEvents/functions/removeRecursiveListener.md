[aninest](../../index.md) / [AnimatableEvents](../index.md) / removeRecursiveListener

# ~~removeRecursiveListener()~~

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

## Deprecated

Instead use the return value of `{@link addRecursiveListener}`
or the AbortSignal passed into `{@link addRecursiveListener}` with the `options`'
`signal` field.

## Defined in

[Animate/AnimatableEvents.ts:176](https://github.com/zphrs/aninest/blob/988b5e8ac7585d70f507e793229537041ab3eea8/core/src/Animate/AnimatableEvents.ts#L176)
