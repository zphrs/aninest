import{_ as s,c as i,o as a,V as t}from"./chunks/framework.FbKWQZfA.js";const c=JSON.parse('{"title":"getLocalState()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/getLocalState.md","filePath":"api/Animatable/functions/getLocalState.md"}'),n={name:"api/Animatable/functions/getLocalState.md"},e=t(`<p><a href="./../../">aninest root</a> / <a href="./../">Animatable</a> / getLocalState</p><h1 id="getlocalstate" tabindex="-1">getLocalState() <a class="header-anchor" href="#getlocalstate" aria-label="Permalink to &quot;getLocalState()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">function</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   into</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">skipFrom</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> LocalAnimatable</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;</span></span></code></pre></div><p>Gets the current local state of the animation, meaning only the numbers in the topmost level of the animation. To access the local state of a child, use <code>anim.children.childName</code> as the input.</p><h2 id="type-parameters" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h2><p>• <strong>Animating</strong> <em>extends</em> <a href="./../../AnimatableTypes/type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../../AnimatableTypes/type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>The animation object</p><p>• <strong>into</strong>: <a href="./../../AnimatableTypes/type-aliases/LocalAnimatable.html"><code>LocalAnimatable</code></a>&lt;<code>Animating</code>&gt; = <code>...</code></p><p>• <strong>skipFrom</strong>: <code>boolean</code> = <code>false</code></p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../../AnimatableTypes/type-aliases/LocalAnimatable.html"><code>LocalAnimatable</code></a>&lt;<code>Animating</code>&gt;</p><p>The local state of the animation</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)}, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localState</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateA</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {x: 0, y: 0}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateB</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">b</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {x: 1, y: 1}</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> }, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">NO_INTERP</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localState</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// { b: 1 }</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateA</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// { x: 0, y: 0 }</span></span></code></pre></div><h2 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/28867544fa41eaaa86feb7a0ef492917740748d5/core/src/Animate/Animatable.ts#L334" target="_blank" rel="noreferrer">Animate/Animatable.ts:334</a></p>`,19),h=[e];function l(k,p,r,d,E,o){return a(),i("div",null,h)}const F=s(n,[["render",l]]);export{c as __pageData,F as default};