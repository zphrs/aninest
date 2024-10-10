[aninest](../../index.md) / [AnimatableTypes](../index.md) / Animation

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

[Animate/AnimatableTypes.ts:121](https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/AnimatableTypes.ts#L121)
