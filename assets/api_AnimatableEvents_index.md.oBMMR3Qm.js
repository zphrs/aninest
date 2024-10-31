import{_ as t,c as e,o as a,V as i}from"./chunks/framework.FbKWQZfA.js";const f=JSON.parse('{"title":"AnimatableEvents","description":"","frontmatter":{},"headers":[],"relativePath":"api/AnimatableEvents/index.md","filePath":"api/AnimatableEvents/index.md"}'),n={name:"api/AnimatableEvents/index.md"},r=i('<p><a href="./../">aninest root</a> / AnimatableEvents</p><h1 id="animatableevents" tabindex="-1">AnimatableEvents <a class="header-anchor" href="#animatableevents" aria-label="Permalink to &quot;AnimatableEvents&quot;">​</a></h1><p>Various ways to attach and detach event listeners to an Animation.</p><h2 id="index" tabindex="-1">Index <a class="header-anchor" href="#index" aria-label="Permalink to &quot;Index&quot;">​</a></h2><h3 id="type-aliases" tabindex="-1">Type Aliases <a class="header-anchor" href="#type-aliases" aria-label="Permalink to &quot;Type Aliases&quot;">​</a></h3><table><thead><tr><th>Type alias</th><th>Description</th></tr></thead><tbody><tr><td><a href="./type-aliases/AnimatableListener.html">AnimatableListener</a></td><td>Listens to the animation for a specific event. All events aside from <code>update</code> return a dictionary of local values which are currently being animated.</td></tr></tbody></table><h3 id="variables" tabindex="-1">Variables <a class="header-anchor" href="#variables" aria-label="Permalink to &quot;Variables&quot;">​</a></h3><table><thead><tr><th>Variable</th><th>Description</th></tr></thead><tbody><tr><td><a href="./variables/ANIM_TYPES_WITH_VALUE.html">ANIM_TYPES_WITH_VALUE</a></td><td>List of event types which provide the values which the animation is interpolating to (or in the case of <code>end</code> the final values).</td></tr></tbody></table><h3 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h3><table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><a href="./functions/addLocalListener.html">addLocalListener</a></td><td>Adds a local listener to the animation. You can listen to the events listed in <a href="./type-aliases/AnimatableEvents.html">AnimatableEvents</a>. Animation listeners are scoped to only trigger when the current level of the animation is modified. Animation listeners are called in the order in which they were added.</td></tr><tr><td><a href="./functions/addRecursiveListener.html">addRecursiveListener</a></td><td>Adds a recursive start listener to the animation. This listener will trigger on any child modification. Animation listeners are called in the order in which they were added.</td></tr><tr><td><a href="./functions/removeLocalListener.html">removeLocalListener</a></td><td>Removes a listener from the animation</td></tr><tr><td><a href="./functions/removeRecursiveListener.html">removeRecursiveListener</a></td><td>Removes a recursive start listener from the animation</td></tr></tbody></table><h3 id="eventtypes" tabindex="-1">EventTypes <a class="header-anchor" href="#eventtypes" aria-label="Permalink to &quot;EventTypes&quot;">​</a></h3><table><thead><tr><th>Type alias, Variable</th><th>Description</th></tr></thead><tbody><tr><td><a href="./type-aliases/AnimatableEvents.html">AnimatableEvents</a></td><td>The collection of events which can be listened to on an animation. Returns <code>undefined</code></td></tr><tr><td><a href="./type-aliases/AnimatableEventsWithValue.html">AnimatableEventsWithValue</a></td><td>Animation Events which return the values which the animation is interpolating to. Only excludes the <code>update</code> event.</td></tr><tr><td><a href="./variables/BEFORE_END.html">BEFORE_END</a></td><td>Broadcasts right before the animation ends to allow for the animation to be interrupted before it ends. This is useful to create snapping, looping, or bouncing animations without triggering any <a href="./variables/END.html">END</a> events.</td></tr><tr><td><a href="./variables/BEFORE_START.html">BEFORE_START</a></td><td>Broadcasts before the animation recurses into its children to update their values. Only broadcasted if there is a local change to the animation at the level this event is attached to.</td></tr><tr><td><a href="./variables/END.html">END</a></td><td>Broadcasts at the end of an interpolation, excluding any interruptions triggered before the animation fully comes to rest, including interruptions created on the <a href="./variables/BEFORE_END.html">BEFORE_END</a> event.</td></tr><tr><td><a href="./variables/IMMUTABLE_START.html">IMMUTABLE_START</a></td><td>Same as <code>START</code> but by convention no <a href="./../Animatable/functions/modifyTo.html">modifyTo</a> calls should be made in any listeners attached to this event. This is useful for extensions which need to know when the animation is starting such as the proxy extension but which don&#39;t need to trigger any modifications to any animation states.</td></tr><tr><td><a href="./variables/INTERRUPT.html">INTERRUPT</a></td><td>Broadcasts when a new target state is set while the animation is not at its resting state yet. This event is useful for reverting any changes made to the animation state before continuing the animation. See the momentum extension for an example of this.</td></tr><tr><td><a href="./variables/START.html">START</a></td><td>Broadcasts after an animation&#39;s target state is set to a new value.</td></tr><tr><td><a href="./variables/UPDATE.html">UPDATE</a></td><td>Broadcasts every time the animation state&#39;s time is updated so long as the animation is running.</td></tr></tbody></table>',12),s=[r];function o(d,h,l,c,m,b){return a(),e("div",null,s)}const v=t(n,[["render",o]]);export{f as __pageData,v as default};