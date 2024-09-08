[@aninest/extensions](../../index.md) / [Proxy](../index.md) / getStateTreeProxy

# getStateTreeProxy()

```ts
function getStateTreeProxy<Animating>(anim): object
```

Returns a proxy object that allows you to interact with the animation state
as though it were a plain object.

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **anim**: `Animation`\<`Animating`\>

## Returns

`object`

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

## Examples

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

## Defined in

[../../extensions/src/proxy.ts:125](https://github.com/zphrs/aninest/blob/8022a4b034c124b0e4bb28675a7ce9bcdf9da3b9/extensions/src/proxy.ts#L125)
