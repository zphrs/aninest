[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / addRecursiveStartListener

# addRecursiveStartListener()

```ts
addRecursiveStartListener<Animating>(anim, listener): void
```

Adds a recursive start listener to the animation. This listener will trigger on any child modification.

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](../type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **listener**: [`Listener`](../../Listeners/type-aliases/Listener.md)\<`undefined`\>

## Returns

`void`

## Example

```ts
const anim = createAnimation({ a: newVec2(0, 0), b: newVec(0, 0) }, getLinearInterp(1))
addRecursiveStartListener(anim, () => console.log("started")) // will trigger
```

## Source

[Animate/Animatable.ts:305](https://github.com/plexigraph/aninest/blob/55953ac/src/Animate/Animatable.ts#L305)
