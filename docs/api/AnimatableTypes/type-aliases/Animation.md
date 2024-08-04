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

<<<<<<< HEAD
[Animate/AnimatableTypes.ts:121](https://github.com/zphrs/aninest/tree//core/src/Animate/AnimatableTypes.ts#L121)
=======
### children

```ts
readonly children: { [P in keyof Animating]: Animating[P] extends number ? undefined : Animation<RecursiveAnimatable<Animating[P]>> };
```

## Type parameters

• **Animating** extends [`UnknownRecursiveAnimatable`](UnknownRecursiveAnimatable.md)

## Source

[Animate/AnimatableTypes.ts:119](https://github.com/zphrs/aninest/blob/37209a6/src/Animate/AnimatableTypes.ts#L119)
>>>>>>> 7fb4e8c2b5ac941788b8ec79ba38b46487084854
