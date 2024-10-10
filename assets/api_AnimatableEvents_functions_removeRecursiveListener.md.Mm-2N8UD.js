import{_ as s,c as i,o as a,V as e}from"./chunks/framework.FbKWQZfA.js";const g=JSON.parse('{"title":"removeRecursiveListener()","description":"","frontmatter":{},"headers":[],"relativePath":"api/AnimatableEvents/functions/removeRecursiveListener.md","filePath":"api/AnimatableEvents/functions/removeRecursiveListener.md"}'),t={name:"api/AnimatableEvents/functions/removeRecursiveListener.md"},n=e(`<p><a href="./../../">aninest</a> / <a href="./../">AnimatableEvents</a> / removeRecursiveListener</p><h1 id="removerecursivelistener" tabindex="-1">removeRecursiveListener() <a class="header-anchor" href="#removerecursivelistener" aria-label="Permalink to &quot;removeRecursiveListener()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">function</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> removeRecursiveListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   type</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> void</span></span></code></pre></div><p>Removes a recursive start listener from the animation</p><h2 id="type-parameters" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h2><p>• <strong>Animating</strong> <em>extends</em> <a href="./../../AnimatableTypes/type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../../AnimatableTypes/type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>• <strong>type</strong>: | <code>&quot;beforeStart&quot;</code> | <code>&quot;start&quot;</code> | <code>&quot;end&quot;</code> | <code>&quot;interrupt&quot;</code> | <code>&quot;beforeEnd&quot;</code></p><p>• <strong>listener</strong>: <a href="./../../Listeners/type-aliases/Listener.html"><code>Listener</code></a>&lt;<a href="./../../AnimatableTypes/type-aliases/Animation.html"><code>Animation</code></a>&lt;<a href="./../../AnimatableTypes/type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<a href="./../../AnimatableTypes/type-aliases/Animatable.html"><code>Animatable</code></a>&gt;&gt;&gt;</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>void</code></p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// setup</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) }, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> listener</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> () </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">=&gt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> console</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">log</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;started&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">addRecursiveListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;start&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will trigger the listener</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">removeRecursiveListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;start&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will not trigger the listener</span></span></code></pre></div><h2 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/0970e35cce1ccab01b8ce4df8a59f00baff5cfda/core/src/Animate/AnimatableEvents.ts#L155" target="_blank" rel="noreferrer">Animate/AnimatableEvents.ts:155</a></p>`,16),h=[n];function l(p,k,r,d,E,o){return a(),i("div",null,h)}const y=s(t,[["render",l]]);export{g as __pageData,y as default};