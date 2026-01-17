<script setup lang="ts">
import { EditorView, minimalSetup } from "codemirror"
import {
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  rectangularSelection,
  crosshairCursor,
  ViewUpdate,
} from "@codemirror/view"
import type { Extension } from "@codemirror/state"
import { foldGutter } from "@codemirror/language"
import { indentMore, indentLess } from "@codemirror/commands"
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
} from "vue"
const CodeMirrorEditor = ref<HTMLElement | null>(null)
import { classyTheme } from "./CodeMirror"
import {
  expandAbbreviation,
  abbreviationTracker,
} from "@emmetio/codemirror6-plugin"
const { lang } = defineProps({
  lang: { type: String, default: "txt" },
})

const doc = defineModel("doc", { type: String, default: "asdf" })

const isFocused = defineModel("focused", { type: Boolean, default: false })

let editor = ref<EditorView | undefined>(undefined)

async function getLanguageExtension(lang: string) {
  if (lang == "txt") {
    return undefined
  } else if (lang == "js") {
    const { javascript } = await import("@codemirror/lang-javascript")
    return javascript()
  } else if (lang == "html" || lang == "svg") {
    const { html } = await import("@codemirror/lang-html")
    return html()
  } else if (lang == "css") {
    const { css } = await import("@codemirror/lang-css")
    return css()
  } else if ((lang = "svelte")) {
    const { svelte } = await import("@replit/codemirror-lang-svelte")
    return svelte()
  }
}

async function setupView(CodeMirrorEditor: HTMLElement) {
  console.log("CodeMirrorEditor")
  let extensionArr: Extension[] = []
  if (lang == "html" || lang == "svg" || lang == "css" || lang == "svelte") {
    console.log("emmet")
    extensionArr = extensionArr.concat([
      keymap.of([
        {
          key: "Tab",
          run: expandAbbreviation,
        },
      ]),
      abbreviationTracker(),
    ])
  }
  extensionArr = extensionArr.concat([
    minimalSetup,
    lineNumbers(),
    highlightActiveLineGutter(),
    foldGutter({
      markerDOM: (o: boolean) => {
        const from = o ? "right" : "down"
        const to = o ? "down" : "right"
        let parent = document.createElement("div")
        parent.style.width = "1rem"
        parent.style.height = "1rem"
        return parent // TODO: use arrow svg instead
      },
    }),
    rectangularSelection(),
    crosshairCursor(),
    classyTheme,
    keymap.of([
      {
        key: "Tab",
        run: indentMore,
      },
      {
        key: "Shift-Tab",
        run: indentLess,
      },
      {
        key: "Ctrl-]",
        run: indentMore,
      },
      {
        key: "Ctrl-[",
        run: indentLess,
      },
    ]),
    EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        doc.value = update.state.doc.toString()
      }
    }),
    EditorView.lineWrapping,
  ])
  const langExt = await getLanguageExtension(lang)
  if (langExt) {
    extensionArr.push(langExt)
  }
  editor.value = new EditorView({
    extensions: extensionArr,
    parent: CodeMirrorEditor,
    doc: doc.value,
  })
  return editor
}

watchEffect(() => {
  if (CodeMirrorEditor.value) {
    setupView(CodeMirrorEditor.value)
  }
})

const onDestroy = () => {
  // remove editor from dom
  if (editor.value) {
    editor.value.destroy()
  }
}

onBeforeUnmount(onDestroy)
</script>

<template>
  <div
    class="cme"
    ref="CodeMirrorEditor"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  />
</template>

<style scoped>
.cme {
  max-height: calc(100vh - 5.5rem);
  min-height: min(15rem, calc(100vh - 10rem));
  overflow: auto;
  background: #040421;
}
</style>
