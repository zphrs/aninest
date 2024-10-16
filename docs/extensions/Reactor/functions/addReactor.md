[@aninest/extensions](../../index.md) / [Reactor](../index.md) / addReactor

# addReactor()

```ts
function addReactor<Animating>(
   anim, 
   reactor, 
   mask): unmount
```

Creates a dependency link between sets of properties.
For example you could change the color of an object based on its position:

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **reactor**: `Transform`\<`Animating`\>

• **mask**: `Mask`\<`PartialRecursive`\<`number`, `Animating`\>\>

Prevents running the reactor unnecessarily. Lets you specify which
properties you don't want to react to.

## Returns

`unmount`

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

## Defined in

[../../extensions/src/reactor.ts:49](https://github.com/zphrs/aninest/blob/638398f3759b1c9c8747db3d93d805b9d84d9bf5/extensions/src/reactor.ts#L49)
