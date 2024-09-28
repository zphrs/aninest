[@aninest/extensions](../../index.md) / [Snap](../index.md) / setSnapPoint

# setSnapPoint()

```ts
function setSnapPoint<Animating, Point>(
   anim, 
   snapPoint, 
   shouldSnap): unsubscribe
```

Adds a point to snap to, across any number of features.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

• **Point** *extends* `PartialRecursive`\<`number`, `Animating`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

• **snapPoint**: `Point`

A point to snap to. Ex: `{x: 0.5, y: 0.5}`

• **shouldSnap**: [`ShouldSnap`](../type-aliases/ShouldSnap.md)\<`Animating`, `Point`\>

A function which returns whether to snap to the snap point based on the snapPoint and the current state tree. See [distanceLessThan](distanceLessThan.md) for a helper function to create the shouldSnap function for snapping within a certain distance.

## Returns

`unsubscribe`

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

## Defined in

[../../extensions/src/snap.ts:208](https://github.com/zphrs/aninest/blob/4def9b51a0eda7ca5b3d63922b6674c9f9434175/extensions/src/snap.ts#L208)
