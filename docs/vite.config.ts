import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  base: "/aninest/",
  plugins: [
    VitePWA({
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
    }),
  ],
})
