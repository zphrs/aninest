import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.nQaBHiNx.js";const E=JSON.parse('{"title":"Bounds<T>","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/type-aliases/Bounds.md","filePath":"api/Animatable/type-aliases/Bounds.md"}'),t={name:"api/Animatable/type-aliases/Bounds.md"},n=e(`<p><a href="./../../">@plexigraph/aninest</a> / <a href="./../">Animatable</a> / Bounds</p><h1 id="bounds-t" tabindex="-1">Bounds&lt;T&gt; <a class="header-anchor" href="#bounds-t" aria-label="Permalink to &quot;Bounds\\&lt;T\\&gt;&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">type</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Bounds</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">T</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;: Object;</span></span></code></pre></div><p>The bounds of the animation. The animation will be loosely clamped to these bounds.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// Assuming the animation is of type {a: Vec2, b: Vec2}:</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> bounds</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> lower: { a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}, b: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} },</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> upper: { a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} }</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// note that b.y is not bounded and that b.x only has a lower bound. This is perfectly valid.</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>T</strong></p><h2 id="type-declaration" tabindex="-1">Type declaration <a class="header-anchor" href="#type-declaration" aria-label="Permalink to &quot;Type declaration&quot;">​</a></h2><h3 id="lower" tabindex="-1">lower <a class="header-anchor" href="#lower" aria-label="Permalink to &quot;lower&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">lower</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">: </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Partial</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">T</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&gt;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">;</span></span></code></pre></div><h3 id="upper" tabindex="-1">upper <a class="header-anchor" href="#upper" aria-label="Permalink to &quot;upper&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">upper</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">: </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Partial</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">T</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&gt;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">;</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L32" target="_blank" rel="noreferrer">Animate/Animatable.ts:32</a></p>`,15),l=[n];function h(p,r,k,o,d,c){return i(),a("div",null,l)}const g=s(t,[["render",h]]);export{E as __pageData,g as default};
