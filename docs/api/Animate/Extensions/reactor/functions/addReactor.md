[aninest](../../../../index.md) / [Animate/Extensions/reactor](../index.md) / addReactor

# addReactor()

```ts
addReactor<Animating>(
   anim, 
   reactor, 
   mask): unmount
```

Creates a dependency link between sets of properties.
For example you could change the color of an object based on its position:

## Type parameters

• **Animating** extends [`Recursive`](../../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **reactor**: `Transform`\<`Animating`\>

• **mask**: [`Mask`](../../../../RecursiveHelpers/type-aliases/Mask.md)\<[`PartialRecursive`](../../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>\>

Prevents running the reactor unnecessarily. Lets you specify which
properties you don't want to react to.

## Returns

[`unmount`](../../../../Extension/type-aliases/unmount.md)

## Example

```ts
const anim = createAnimation({pos: ZERO_VEC2, color: {r: 0, g: 0, b: 0}}, getLinearInterp(1))
addReactor(anim, ({pos}) => {
   r = (pos.x - 127) % 255
   g = (pos.y - 127) % 255
   return {color: {r, g}}
 }, 
 {color: false} // makes sure the reactor doesn't trigger when color is modified.
 // otherwise would create an endless loop of reactor calls.
)
```

## Source

[Animate/Extensions/reactor.ts:40](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/reactor.ts#L40)
