<script setup>
import { defineProps } from "vue"
import PgSkeleton from "./pg-skeleton/PgSkeleton.vue"
import { inBrowser } from "vitepress"

if (inBrowser) {
  import("@plexigraph/plex-ui")
}
const { html, sandbox } = defineProps({
  html: { type: String },
  sandbox: { type: String, default: "allow-scripts" },
})
</script>

<template>
  <div class="parent">
    <ClientOnly>
      <template #fallback> </template>
      <div class="placeholder">
        <PgSkeleton :offset="1"></PgSkeleton>
      </div>
      <pg-sandbox-inner :html="html" :sandbox="sandbox" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.parent {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
pg-sandbox-inner {
  position: relative;
  height: 100%;
  z-index: 2;
}
</style>
