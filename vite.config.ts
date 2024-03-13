import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/aninest/",
  build: {
    // lib: {
    //   entry: "src/index.ts",
    //   name: "Aninest",
    // },
    rollupOptions: {
      output: {
        manualChunks: {
          aninest: ["src/index.ts"],
        },
      },
    },
    terserOptions: {
      // remove comments
      format: {
        comments: false,
      },
      compress: {
        booleans_as_integers: true,
        dead_code: true,
        drop_console: true,
        ecma: 2015,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
    },
    minify: "terser",
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      manifest: {
        theme_color: "#000000",
        name: "Aninest",
        short_name: "Aninest",
        description: "A fun web toy",
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
