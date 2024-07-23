import{_ as s,c as a,o as i,V as e}from"./chunks/framework.BwUCzv35.js";const g=JSON.parse('{"title":"Bounds<Animating>","description":"","frontmatter":{},"headers":[],"relativePath":"api/Extensions/Bound/type-aliases/Bounds.md","filePath":"api/Extensions/Bound/type-aliases/Bounds.md"}'),n={name:"api/Extensions/Bound/type-aliases/Bounds.md"},t=e(`<p><a href="./../../../">aninest</a> / <a href="./../">Extensions/Bound</a> / Bounds</p><h1 id="bounds-animating" tabindex="-1">Bounds&lt;Animating&gt; <a class="header-anchor" href="#bounds-animating" aria-label="Permalink to &quot;Bounds\\&lt;Animating\\&gt;&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">type</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Bounds</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;: PartialFullBounds&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">PartialRecursiveAnimatable</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;&gt;;</span></span></code></pre></div><p>The bounds of the animation, which means that all values within the bounds are optional, including the the <code>upper</code> and <code>lower</code> objects. The animation will be loosely clamped to these bounds.</p><h2 id="see" tabindex="-1">See <a class="header-anchor" href="#see" aria-label="Permalink to &quot;See&quot;">​</a></h2><p><a href="./../functions/setupBoundsLayer.html">setupBoundsLayer</a> for how to apply bounds to an animation.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// Assuming the animation is of type {a: Vec2, b: Vec2}:</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> bounds</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> PartialRecursiveBounds</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;{</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">a</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Vec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">b</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Vec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}&gt; </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">=</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> lower: { a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}, b: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} },</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> upper: { a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} }</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../../../AnimatableTypes/type-aliases/UnknownRecursiveAnimatable.html"><code>UnknownRecursiveAnimatable</code></a></p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/bound.ts#L62" target="_blank" rel="noreferrer">Animate/Extensions/bound.ts:62</a></p>`,12),h=[t];function l(p,k,o,r,d,E){return i(),a("div",null,h)}const u=s(n,[["render",l]]);export{g as __pageData,u as default};
