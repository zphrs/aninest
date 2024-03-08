import { defineConfig } from "vitepress"
import typedocSidebar from "../api/typedoc-sidebar.json"
import ClassyLight from "./Classy-light-color-theme.json"
import ClassyDark from "./Classy-dark-color-theme.json"
import { type ThemeRegistrationRaw, type LanguageInput } from "shiki"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    theme: {
      light: ClassyLight as unknown as ThemeRegistrationRaw,
      dark: ClassyDark as unknown as ThemeRegistrationRaw,
    },
  },
  title: "Aninest",
  titleTemplate: " Aninest",
  description:
    "A nested animation library: typed, interruptible, extensible, and performant.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    aside: false,
    siteTitle: "Aninest",
    nav: [
      { text: "Home", link: "/" },
      { text: "API", link: "/api/" },
    ],
    sidebar: [
      {
        text: "API",
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/plexigraph/aninest",
      },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/@plexigraph/aninest",
      },
    ],
  },
})
