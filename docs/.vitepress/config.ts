import { defineConfig } from "vitepress"
import coreSidebar from "../api/typedoc-sidebar.json"
import extensionSidebar from "../extensions/typedoc-sidebar.json"
import ClassyLight from "./Classy-light-color-theme.json"
import ClassyDark from "./Classy-dark-color-theme.json"
import { type ThemeRegistrationRaw, type LanguageInput } from "shiki"
import { withPwa } from "@vite-pwa/vitepress"

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    markdown: {
      theme: {
        light: ClassyLight as unknown as ThemeRegistrationRaw,
        dark: ClassyDark as unknown as ThemeRegistrationRaw,
      },
    },
    vite: {
      optimizeDeps: {
        exclude: ["@plegigraph/plex-ui", "@codemirror/*"],
      },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => {
            return tag.startsWith("pg-")
          },
        },
      },
    },
    title: "Aninest",
    titleTemplate: " Aninest",
    description:
      "A nested animation library: typed, interruptible, extensible, and performant.",
    themeConfig: {
      search: {
        provider: "local",
      },
      // https://vitepress.dev/reference/default-theme-config
      aside: false,
      siteTitle: "Aninest",
      nav: [
        { text: "Home", link: "/" },
        { text: "API", link: "/api/" },
      ],
      sidebar: [
        {
          text: "Core API",
          items: coreSidebar,
        },
        {
          text: "Extension API",
          items: extensionSidebar,
        },
      ],
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/zphrs/aninest",
        },
        {
          icon: "npm",
          link: "https://www.npmjs.com/package/aninest",
        },
      ],
    },
    pwa: {
      registerType: "autoUpdate",
      strategies: "generateSW",
      manifest: {
        theme_color: "#000000",
        name: "Aninest",
        short_name: "Aninest",
        description:
          "A nested animation library: typed, interruptible, extensible, and performant.",
        icons: [
          {
            src: "icons-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "icons-256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "icons-512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        background_color: "#000000",
        display: "standalone",
      },
      workbox: {
        sourcemap: true,
      },
    },
  })
)
