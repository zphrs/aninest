# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.6.0] - 2024-10-10

### Added

- Support for the AbortSignal to remove event listeners from an object.

## [4.5.0] - 2024-09-07

### Added

- The ability to just change interpolation function locally.

## [4.4.0] - 2024-09-01

### Added

- The ability to suppress start and interrupt listeners within a modifyTo call via the suppressListeners parameter.

### Fixed

- Edge case involving children (see [tests/childEdges.test.ts](tests/childEdges.test.ts))

## [4.3.0] - 2024-08-22

### Added

- Added `suppressListeners` as an argument to modifyTo

## [4.2.2] - 2024-08-11

### Fixed

- Fixed edge case with undefined mask

## [4.2.1] - 2024-08-08

### Fixed

- Fixed accidental unsub bug

## [4.2.0] - 2024-08-08

### Fixed

- Made the function `animationNeedsUpdate` public.

## [4.1.1] - 2024-08-08

### Fixed

- Fixed edge case about unsubscribing recursive events

## [4.1.0] - 2024-08-08

### Fixed

- Made sure `getProgress` was exported.

## [4.0.2] - 2024-08-04

### Fixed

- Again made sure all types were exported.

## [4.0.1] - 2024-08-04

### Fixed

- Made sure types were exported

## [4.0.0] - 2024-08-04

### Removed

- All extensions from the core library and moved them into @aninest/extensions

## [3.0.0] - 2024-07-13

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
