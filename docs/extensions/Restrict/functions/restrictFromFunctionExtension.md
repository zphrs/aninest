[@aninest/extensions](../../index.md) / [Restrict](../index.md) / restrictFromFunctionExtension

# restrictFromFunctionExtension()

```ts
function restrictFromFunctionExtension<Animating>(restriction): Extension<Animating>
```

## Type Parameters

• **Animating** *extends* `RecursiveAnimatable`\<`unknown`\>

## Parameters

• **restriction**

A function which takes in a proxy to the local animation state
which you can directly set to in order to collapse the allowed state of the
animation.

## Returns

`Extension`\<`Animating`\>

an extension which calls the restriction function

## Example

```ts
function restrictToWholeNumbersExtension() {
 return restrictFromFunctionExtension(local => {
   for (const key in local) local[key] = Math.round(local[key])
 })
}
 *
```

## Defined in

[../../extensions/src/restrict.ts:51](https://github.com/zphrs/aninest/blob/8c5d5cec878cb0688cbcb852e4de66105e356f88/extensions/src/restrict.ts#L51)
