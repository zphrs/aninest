<script setup>
import { onMounted, ref, useTemplateRef, watchEffect } from "vue"
import Editor from "./Editor.vue"
import { cssLayer } from "@aninest/extensions"
import { createAnimation, modifyTo } from "aninest"
import { EaseIn } from "@aninest/extensions/lib/css/interp"
import code from "./code"
let element = useTemplateRef("element")
// Watch for changes to the element and apply the CSS layer
const bgAnimation = createAnimation({
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    space: "rgb",
  },
})
onMounted(() => {
  console.log("Mounted element:", element.value)
  if (element.value) {
    let layer = cssLayer(element.value, {
      cubicBezier: { c1: { x: 1, y: 0 }, c2: { x: 0, y: 1 } },
      duration: 10,
    })
    const unmount = layer.mount(bgAnimation)
    modifyTo(bgAnimation, {
      backgroundColor: {
        r: 0,
        g: 255,
        b: 0,
      },
    })
    setTimeout(() => {
      modifyTo(bgAnimation, {
        backgroundColor: {
          r: 0,
          g: 0,
          b: 255,
        },
      })
    }, 5000)
    return () => {
      unmount()
    }
  }
})
</script>

<template>
  <Editor :code="code" />
</template>