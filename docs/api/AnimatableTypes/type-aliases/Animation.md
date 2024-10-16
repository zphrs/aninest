[aninest root](../../index.md) / [AnimatableTypes](../index.md) / Animation

# Animation\<Animating\>

```ts
type Animation<Animating>: AnimationWithoutChildren<Animating> & object;
```

The animation object. This is a recursive type, meaning that it can 
contain other animations.

## Type declaration

### children

```ts
readonly children: { [P in keyof Animating]: Animating[P] extends number ? undefined : Animation<RecursiveAnimatable<Animating[P]>> };
```

## Type Parameters

• **Animating** *extends* [`UnknownRecursiveAnimatable`](UnknownRecursiveAnimatable.md)

## Example

```ts
const anim: Animation<{a: Vec2}> = createAnimation({a: {x: 0, y: 0}}) 
// the anim object will look like this:
{
 <private fields>
 children: {
 a: {
   // holds the state of a, which is currently {x: 0, y: 0}
   <private fields>
 }
}
```

## Defined in

[Animate/AnimatableTypes.ts:121](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/AnimatableTypes.ts#L121)
