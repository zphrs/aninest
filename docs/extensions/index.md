# API Reference

## Modules

| Module | Description |
| ------ | ------ |
| [Bound](Bound/index.md) | Adds bounds to an animation to ensure an animation will end within the given bounds. |
| [DeduplicatedStart](DeduplicatedStart/index.md) | Minimizes the number of start events triggered. |
| [DynamicDuration](DynamicDuration/index.md) | Makes the animation speed dynamic based on the distance between the start and end points. |
| [Loop](Loop/index.md) | Extension to loop an animation in a saw-like wave: `/|/|` |
| [Proxy](Proxy/index.md) | Makes it easier to interact with the animation state by providing a proxy object which mirrors the state of the animation. Also allows you to set the state of the animation by setting the properties of the proxy object. |
| [Reactor](Reactor/index.md) | Allows creating dependencies between properties of an animation so that when one property changes, another property will be updated as well, based on that one property's value. |
| [Snap](Snap/index.md) | Snaps the animation to predetermined points before ending. |
| [Update](Update/index.md) | Updates the animation every screen refresh, providing a subscribe function which allows listening to: - **start** - when the animation starts to be updated, - **stop** - when the animation finishes animating everything - **update** - each update frame It will only update the animation when necessary, i.e. when the animation has been started and there are still things to animate. |
