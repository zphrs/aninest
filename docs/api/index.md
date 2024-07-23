# API Reference

## Modules

| Module | Description |
| :------ | :------ |
| [Animatable](Animatable/index.md) | This module deals with creating and modifying Animations. |
| [AnimatableEvents](AnimatableEvents/index.md) | Various ways to attach and detach event listeners to an Animation. |
| [AnimatableTypes](AnimatableTypes/index.md) | A collection of types to support Animatable. |
| [Extension](Extension/index.md) | Defines the types and functions related to the most bare-bones<br />extension. |
| [ExtensionStack](ExtensionStack/index.md) | A stack of extensions that can be mounted to an animation. |
| [Extensions/Bound](Extensions/Bound/index.md) | Adds bounds to an animation to ensure an animation<br />will end within the given bounds. |
| [Extensions/DynamicDuration](Extensions/DynamicDuration/index.md) | Makes the animation speed dynamic based on the distance between the start and end points. |
| [Extensions/Loop](Extensions/Loop/index.md) | Extension to loop an animation in a saw-like wave: `/\|/\|` |
| [Extensions/Proxy](Extensions/Proxy/index.md) | Makes it easier to interact with the animation state by providing a proxy object<br />which mirrors the state of the animation.<br />Also allows you to set the state of the animation by setting the properties of the proxy object. |
| [Extensions/Snap](Extensions/Snap/index.md) | Snaps the animation to predetermined points before ending. |
| [Extensions/Update](Extensions/Update/index.md) | Updates the animation every frame, providing a subscribe function which allows<br />listening to:<br />- **start** - when the animation starts to be updated,<br />- **stop** - when the animation finishes animating everything<br />- **update** - each update frame<br />Will only update the animation when necessary, i.e. when the animation has<br />been started and there are still things to animate. |
| [Listeners](Listeners/index.md) | Generic utility functions and types for listeners to non-cascading events. |
| [Mode](Mode/index.md) | Supports creating modes which allow for the easy toggling of ExtensionStacks. |
| [RecursiveHelpers](RecursiveHelpers/index.md) | Provides general helper functions for working with recursive objects.<br />Especially useful for allowing extensions to mask out (not affect) certain<br />children of an object. |
| [Vec2](Vec2/index.md) | A collection of 2D vector math functions and a few other generic scalar operations. |
| [module:Interp](module:Interp/index.md) | Several interpolation function constructors. |
| [sleep](sleep/index.md) | Sleep for a given number of seconds, supporting await syntax. |
