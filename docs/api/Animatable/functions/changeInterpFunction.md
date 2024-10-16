[aninest root](../../index.md) / [Animatable](../index.md) / changeInterpFunction

# changeInterpFunction()

```ts
function changeInterpFunction<Animating>(
   anim, 
   interp, 
   mask): void
```

Changes the interpolation function of specific subproperties based on the mask.

Note: you only have the granularity of each dictionary level. For instance,
if you had the following animation structure:
```ts
const anim = createAnimation({a: {x: 0, y: 0}, b: {x: 0, y: 0}}, getLinearInterp(1))
```
then you could change the interpolation function of `a` and `b` but not `a.x` and `a.y`.
To change `a.x` seprately from `a.y`, this would be your structure:
```ts
const anim = createAnimation({a: {x: {value: 0}, y: {value: 0}}, b: {x: 0, y: 0}}, getLinearInterp(1))
// only changes `a.x` interp function
changeInterpFunction(anim, getLinearInterp(2), {a: {x: true, y: false}, b: false})
```
Then to get the value of `a.x` you would call `getLocalState(anim.children.a.children.x).value`.

To get the `value` of both `x` and `y` and simply store set the variables `x` and `y` to the
respective values you could do:
```ts
const {x: {value: x}, y: {value: y}} = getStateTree(anim.children.a)
```

## Type Parameters

• **Animating** *extends* [`RecursiveAnimatable`](../../AnimatableTypes/type-aliases/RecursiveAnimatable.md)\<`unknown`\>

## Parameters

• **anim**: [`Animation`](../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **interp**: [`Interp`](../../module:Interp/type-aliases/Interp.md)

• **mask**: `Partial`\<[`Mask`](../../RecursiveHelpers/type-aliases/Mask.md)\<`Animating`\>\> = `{}`

Assumes default of true for all keys. It is optional.

## Returns

`void`

## Example

```ts
const anim = createAnimation({a: newVec2(0, 0), b: newVec2(0, 0)}, getLinearInterp(1))
modifyTo(anim, {a: newVec2(1, 1), b: newVec2(1, 1)})
getStateTree(anim) // {a: {x: 0, y: 0}, b: {x: 0, y: 0}}
updateAnimation(anim, 0.5)
getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.5, y: 0.5}}
changeInterpFunction(anim, getLinearInterp(2), {a: false}) // doesn't change a, does change b
updateAnimation(anim, 0.5)
getStateTree(anim) // {a: {x: 0.5, y: 0.5}, b: {x: 0.75, y: 0.75}}
```

## Defined in

[Animate/Animatable.ts:522](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/core/src/Animate/Animatable.ts#L522)
