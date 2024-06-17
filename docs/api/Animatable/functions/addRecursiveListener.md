[aninest](../../index.md) / [Animatable](../index.md) / addRecursiveListener

# addRecursiveListener()

```ts
addRecursiveListener<Animating>(
   anim, 
   type, 
   listener): unsubscribe
```

Adds a recursive start listener to the animation. This listener will trigger on any child modification.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../type-aliases/Animation.md)\<`Animating`\>

• **type**: [`AnimatableEvents`](../type-aliases/AnimatableEvents.md)

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<[`Animation`](../type-aliases/Animation.md)\<[`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>\>\> \| [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

() => boolean Returns whether to remove the listener. Void or false to keep the listener.

## Returns

`unsubscribe`

A function to remove the listener

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveListener(anim, "start", () => console.log("started")) // will trigger
```

## Source

[Animate/Animatable.ts:548](https://github.com/zphrs/aninest/blob/9544357/src/Animate/Animatable.ts#L548)
