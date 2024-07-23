import{_ as t,c as e,o as a,V as l}from"./chunks/framework.BwUCzv35.js";const b=JSON.parse('{"title":"AnimatableTypes","description":"","frontmatter":{},"headers":[],"relativePath":"api/AnimatableTypes/index.md","filePath":"api/AnimatableTypes/index.md"}'),i={name:"api/AnimatableTypes/index.md"},n=l('<p><a href="./../">aninest</a> / AnimatableTypes</p><h1 id="animatabletypes" tabindex="-1">AnimatableTypes <a class="header-anchor" href="#animatabletypes" aria-label="Permalink to &quot;AnimatableTypes&quot;">​</a></h1><p>A collection of types to support Animatable.</p><h2 id="index" tabindex="-1">Index <a class="header-anchor" href="#index" aria-label="Permalink to &quot;Index&quot;">​</a></h2><h3 id="type-aliases" tabindex="-1">Type Aliases <a class="header-anchor" href="#type-aliases" aria-label="Permalink to &quot;Type Aliases&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Type alias</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./type-aliases/UnknownAnimation.html">UnknownAnimation</a></td><td style="text-align:left;">Convenient way to write <code>Animation&lt;UnknownRecursiveAnimatable&gt;</code>.<br>Usually used to cast an animation to this more generic type.</td></tr><tr><td style="text-align:left;"><a href="./type-aliases/UnknownRecursiveAnimatable.html">UnknownRecursiveAnimatable</a></td><td style="text-align:left;">Convenient way to write <code>RecursiveAnimatable&lt;unknown&gt;</code>,<br>usually used to extend a generic type.</td></tr><tr><td style="text-align:left;"><a href="./type-aliases/unsubscribe.html">unsubscribe</a></td><td style="text-align:left;">-</td></tr></tbody></table><h3 id="construction" tabindex="-1">Construction <a class="header-anchor" href="#construction" aria-label="Permalink to &quot;Construction&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Type alias</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./type-aliases/Animation.html">Animation</a></td><td style="text-align:left;">The animation object. This is a recursive type, meaning that it can <br>contain other animations.</td></tr></tbody></table><h3 id="state-types" tabindex="-1">State Types <a class="header-anchor" href="#state-types" aria-label="Permalink to &quot;State Types&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Type alias</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./type-aliases/Animatable.html">Animatable</a></td><td style="text-align:left;">The local state of the animation, meaning only the numbers in the topmost <br>level of the animation.</td></tr><tr><td style="text-align:left;"><a href="./type-aliases/LocalAnimatable.html">LocalAnimatable</a></td><td style="text-align:left;">A local slice of the Animatable type.</td></tr><tr><td style="text-align:left;"><a href="./type-aliases/PartialRecursiveAnimatable.html">PartialRecursiveAnimatable</a></td><td style="text-align:left;">A subtree of the Animatable type.</td></tr><tr><td style="text-align:left;"><a href="./type-aliases/RecursiveAnimatable.html">RecursiveAnimatable</a></td><td style="text-align:left;">The generic type of the animation state.</td></tr></tbody></table>',10),s=[n];function r(o,d,h,y,c,m){return a(),e("div",null,s)}const f=t(i,[["render",r]]);export{b as __pageData,f as default};