[aninest](../../index.md) / [AnimatableEvents](../index.md) / addRecursiveListener

# addRecursiveListener()

```ts
addRecursiveListener<Animating>(
   anim, 
   type, 
   listener): unsubscribe
```

Adds a recursive start listener to the animation. This listener will trigger on any child modification.
Animation listeners are called in the order in which they were added.

## Type parameters

• **Animating** extends [`Recursive`](../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\> \| [`Listener`](../../Listeners/type-aliases/Listener.md)\<[`UnknownAnimation`](../../AnimatableTypes/type-aliases/UnknownAnimation.md)\>

() => boolean Returns whether to remove the listener. Void or false to keep the listener.

## Returns

[`unsubscribe`](../../AnimatableTypes/type-aliases/unsubscribe.md)

A function to remove the listener

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveListener(anim, "start", () => console.log("started")) // will trigger
```

## Source

[Animate/AnimatableEvents.ts:114](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableEvents.ts#L114)
