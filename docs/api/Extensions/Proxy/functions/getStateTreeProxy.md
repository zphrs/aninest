[aninest](../../../index.md) / [Extensions/Proxy](../index.md) / getStateTreeProxy

# getStateTreeProxy()

```ts
getStateTreeProxy<Animating>(anim): Object
```

Returns a proxy object that allows you to interact with the animation state
as though it were a plain object.

## Type parameters

• **Animating** extends [`Recursive`](../../../RecursiveHelpers/type-aliases/Recursive.md)\<`number`, `unknown`\>

## Parameters

• **anim**: [`Animation`](../../../AnimatableTypes/type-aliases/Animation.md)\<`Animating`\>

## Returns

`Object`

A proxy object that allows you to interact with the animation state
along with an unsubscribe function that remove the proxy from the animation.

### proxy

```ts
proxy: Animating;
```

### unsubscribe

```ts
unsubscribe: unsubscribe;
```

## Example

```ts
const anim = createAnimation({a: {x: 0, y: 0}, b: 0}, getLinearInterp(1))
const { proxy } = getStateTreeProxy(anim)
proxy.a.x // 0
proxy.a.y // 0
proxy.b // 0
proxy.a.x = 1
proxy.a.x // 0 - the value reflects the current state of the animation so
         // it will not change until the animation is updated
updateAnimation(anim, 0.5)
proxy.a.x // 0.5
updateAnimation(anim, 0.5)
proxy.a.x // 1
```

## Example

```ts
const anim = createAnimation({a: {x: 0, y: 0}}, getLinearInterp(1))
const { proxy } = getStateTreeProxy(anim)
proxy.a.x // 0
proxy.a.y // 0
proxy.a = {x: 1, y: 1}
updateAnimation(anim, 0.5)
proxy.a // {x: 0.5, y: 0.5}
updateAnimation(anim, 0.5)
proxy.a // {x: 1, y: 1}
```

## Description

Note that the root object of the animation's state cannot
be set directly, but the children can be set.

## Source

Animate/Extensions/proxy.ts:56
