---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Aninest"
  text: "A nested animation library"
  tagline: typed, interruptible, extensible, and performant.
  actions:
    - theme: brand
      text: Browse API
      link: /api/
    - theme: alt
      text: View Source
      image: github
      link: "https://github.com/plexigraph/aninest"
features:
  - title: Strongly Typed
    details: Written in TypeScript with a strong type system.
    icon: { src: /typescript.svg, alt: TypeScript, width: 24, height: 24 }
  - title: Interruptible
    details: All animations are <em>smoothly</em> interruptible.
    icon: 🚦
  - title: Extensible
    details: Aninest is designed to be used with any rendering library or framework.
    icon: 🧩
  - title: Performant
    details: Aninest makes it easy to only rerender when necessary and has minimal overhead.
    icon: ⚙️
  - title: Ergonomic
    details: Aninest is designed to be easy to use and understand with strong support for ES6 destructuring.
    icon: 🛠  ️
  - title: Lightweight
    details: Coming in at just 2.19kB minified and gzipped, Aninest is incredibly lightweight.
    icon: 🪶
  - title: Fully Tree-Shakeable
    details: Tree-shakeable down to <1kB for the bare essentials. Only pay for what you import.
    icon: 🌳
  - title: Zero Dependencies
    icon: 📦❌
    details: Aninest has no runtime dependencies.
---
