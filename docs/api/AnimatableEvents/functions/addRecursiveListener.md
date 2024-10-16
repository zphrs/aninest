[aninest root](../../index.md) / [AnimatableEvents](../index.md) / addRecursiveListener

# addRecursiveListener()

```ts
function addRecursiveListener<Animating>(
   anim, 
   type, 
   listener, 
   options): unsubscribe
```

Adds a recursive start listener to the animation. This listener will trigger on any child modification.
Animation listeners are called in the order in which they were added.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\> \| [`Listener`](../../Listeners/type-aliases/Listener.md)\<[`UnknownAnimation`](../../AnimatableTypes/type-aliases/UnknownAnimation.md)\>

() => boolean Returns whether to remove the listener. Void or false to keep the listener.

• **options** = `{}`

Contains one option, `signal` which supports passing in an AbortSignal.

• **options.signal?**: `AbortSignal`

## Returns

[`unsubscribe`](../../AnimatableTypes/type-aliases/unsubscribe.md)

A function to remove the listener

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveListener(anim, "start", () => console.log("started")) // will trigger
```

## Defined in

[Animate/AnimatableEvents.ts:126](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/AnimatableEvents.ts#L126)
