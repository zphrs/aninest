[@plexigraph/aninest](../../index.md) / [Animatable](../index.md) / Animation

# Animation\<Animating\>

```ts
type Animation<Animating>: AnimationWithoutChildren<Animating> & Object;
```

The animation object. This is a recursive type, meaning that it can contain other animations.

## Type declaration

### children

```ts
readonly children: { [P in keyof Animating]: Animating[P] extends number ? undefined : Animation<RecursiveAnimatable<Animating[P]>> };
```

## Type parameters

• **Animating** extends [`RecursiveAnimatable`](RecursiveAnimatable.md)\<`unknown`\>

## Source

[Animate/Animatable.ts:72](https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L72)
