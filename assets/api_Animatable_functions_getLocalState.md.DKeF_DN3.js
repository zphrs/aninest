import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.nQaBHiNx.js";const c=JSON.parse('{"title":"getLocalState()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/getLocalState.md","filePath":"api/Animatable/functions/getLocalState.md"}'),e={name:"api/Animatable/functions/getLocalState.md"},n=t(`<p><a href="./../../">@plexigraph/aninest</a> / <a href="./../">Animatable</a> / getLocalState</p><h1 id="getlocalstate" tabindex="-1">getLocalState() <a class="header-anchor" href="#getlocalstate" aria-label="Permalink to &quot;getLocalState()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">LocalAnimatable</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Animating</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&gt;</span></span></code></pre></div><p>Gets the current local state of the animation, meaning only the numbers in the topmost level of the input animation. To access the local state of a child, use <code>anim.children.childName</code> as the input.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>The animation object</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../type-aliases/LocalAnimatable.html"><code>LocalAnimatable</code></a>&lt;<code>Animating</code>&gt;</p><p>The local state of the animation</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)}, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localState</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateA</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {x: 0, y: 0}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateB</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">b</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {x: 1, y: 1}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> *</span></span></code></pre></div><h2 id="example-1" tabindex="-1">Example <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> }, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">NO_INTERP</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localState</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// { b: 1 }</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> localStateA</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> getLocalState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">a</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// { x: 0, y: 0 }</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L557" target="_blank" rel="noreferrer">Animate/Animatable.ts:557</a></p>`,18),h=[n];function l(k,p,r,d,E,o){return a(),i("div",null,h)}const F=s(e,[["render",l]]);export{c as __pageData,F as default};
