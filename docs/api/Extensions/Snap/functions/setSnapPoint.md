[aninest](../../../index.md) / [Extensions/Snap](../index.md) / setSnapPoint

# setSnapPoint()

```ts
setSnapPoint<Animating, Point>(
   anim, 
   snapPoint, 
   shouldSnap): unsubscribe
```

Adds a point to snap to, across any number of features.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

• **Point** extends [`PartialRecursive`](../../../RecursiveHelpers/type-aliases/PartialRecursive.md)\<`number`, `Animating`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

• **snapPoint**: `Point`

A point to snap to. Ex: `{x: 0.5, y: 0.5}`

• **shouldSnap**: [`ShouldSnap`](../type-aliases/ShouldSnap.md)\<`Animating`, `Point`\>

A function which returns whether to snap to the snap point based on the snapPoint and the current state tree. See [distanceLessThan](distanceLessThan.md) for a helper function to create the shouldSnap function for snapping within a certain distance.

## Returns

[`unsubscribe`](../../../AnimatableTypes/type-aliases/unsubscribe.md)

a function to remove the snap point

## Example

```ts
// initialize the animation
const anim = createAnimation({x: 0, y: 0}, getLinearInterp(1))
setSnapPoint(anim, {x: 1, y: 1}, distanceLessThan(1))
const s = getStateTree(anim) // {x: 0, y: 0}
// start an interp to (1.5, 1.5) which will get snapped to (1, 1)
modifyTo(anim, {x: 1.5, y: 1.5})

// start of interp to (1.5, 1.5)
const s2 = getStateTree(anim) // {x: 0, y: 0}
updateAnimation(anim, 0.5) // true
const s3 = getStateTree(anim) // {x: 0.75, y: 0.75}
updateAnimation(anim, 0.5) // true
const s4 = getStateTree(anim) // {x: 1.5, y: 1.5}

// start of snap to (1, 1)
updateAnimation(anim, 0.5) // true
const s5 = getStateTree(anim) // {x: 1.25, y: 1.25}
updateAnimation(anim, 0.5) // false
const s6 = getStateTree(anim) // {x: 1, y: 1}
```

## Source

[Animate/Extensions/snap.ts:171](https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/snap.ts#L171)
