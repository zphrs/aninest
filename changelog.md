# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 3.0.0

### Changed

- Moved bounds from the main library into an extension.
  - How to refactor:

```diff
+ const { unsub: unsubBounds, update: updateBounds } = initializeBounds(anim, {})
- boundAnimation(anim, {
+ updateBounds({
    x: 0
})
```

### Added

- Extensions
- ExtensionStack
  - Lets you hot swap between behavior configurations
