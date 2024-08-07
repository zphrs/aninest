<script setup lang="ts">
let { code } = defineProps({ code: { type: String, default: "asdf" } }) // html document
import { Ref, onMounted, onUnmounted, ref, watchEffect } from "vue"
import CodeMirror from "./CodeMirror.vue"
import PGSandbox from "./components/PgSandbox.vue"
import { inBrowser } from "vitepress"
const doc = ref(code)

watchEffect(() => {
  console.log(doc.value)
})

const split: Ref<HTMLElement | null> = ref(null)

const preview: Ref<HTMLElement | null> = ref(null)

function onDragStart(e: Event) {
  if (!split.value) {
    return
  }
  if (!preview.value) {
    return
  }
  console.log("drag start", preview.value)
  preview.value.style.pointerEvents = "none"
}

function onDragEnd(e: Event) {
  console.log("drag end")
  if (!split.value) {
    return
  }
  if (!preview.value) {
    return
  }
  preview.value.style.pointerEvents = ""
}
onMounted(() => {
  // listen to the event
  if (inBrowser) {
    console.log("mounted")
    window.addEventListener("pg-split-down", onDragStart)
    window.addEventListener("pg-split-up", onDragEnd)
  }
})
onUnmounted(() => {
  // remove the event listener
  if (inBrowser) {
    window.removeEventListener("pg-split-down", onDragStart)
    window.removeEventListener("pg-split-up", onDragEnd)
  }
})
</script>

<template>
  <div>
    <pg-split ref="split" >
      <span slot="first">
        <CodeMirror v-model:doc="doc" lang="html"></CodeMirror>
      </span>
      <span slot="second" ref="preview">
        <PGSandbox :html="doc" />
      </span>
    </pg-split>
  </div>
</template>

<style scoped>
div {
  height: 80vh;
}

span {
  height: 100%;
}
</style>
