[aninest](../../index.md) / [Animatable](../index.md) / createParentAnimation

# createParentAnimation()

```ts
function createParentAnimation<Animating>(children, timing): Animation<Animating>
```

Creates a parent animation from a dictionary of children which will function the same
as though the parent and children were created at once.

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **children**: `ParentAnimatable`\<`Animating`\>

a dictionary of children animations and numbers. 
Note that [Animatable](../../AnimatableTypes/type-aliases/Animatable.md) objects are not allowed.

• **timing**: [`Interp`](../../module:Interp/type-aliases/Interp.md)

The timing function which will only be applied to the numbers in the provided `children` dictionary.

## Returns

[`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Example

```ts
const a = createAnimation({x: 0, y: 0})
const b = createAnimation({x: 1, y: 0})
const anim = createParentAnimation({a, b, c: 1})
```

## Defined in

[Animate/Animatable.ts:186](https://github.com/zphrs/aninest/blob/765f2ede3df887f1f3a3e1391afab09a932de29a/core/src/Animate/Animatable.ts#L186)
