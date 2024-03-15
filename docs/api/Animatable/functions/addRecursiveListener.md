[aninest](../../index.md) / [Animatable](../index.md) / addRecursiveListener

# addRecursiveListener()

```ts
addRecursiveListener<Animating>(
   anim, 
   type, 
   listener): void
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

`void`

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveListener(anim, "start", () => console.log("started")) // will trigger
```

## Source

[Animate/Animatable.ts:534](https://github.com/zphrs/aninest/blob/df0807b/src/Animate/Animatable.ts#L534)
