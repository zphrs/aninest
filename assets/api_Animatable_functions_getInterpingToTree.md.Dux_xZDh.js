import{_ as s,c as i,o as a,V as e}from"./chunks/framework.BwUCzv35.js";const c=JSON.parse('{"title":"getInterpingToTree()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/getInterpingToTree.md","filePath":"api/Animatable/functions/getInterpingToTree.md"}'),t={name:"api/Animatable/functions/getInterpingToTree.md"},n=e(`<p><a href="./../../">aninest</a> / <a href="./../">Animatable</a> / getInterpingToTree</p><h1 id="getinterpingtotree" tabindex="-1">getInterpingToTree() <a class="header-anchor" href="#getinterpingtotree" aria-label="Permalink to &quot;getInterpingToTree()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getInterpingToTree</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">into</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Animating</span></span></code></pre></div><p>Gets the full state tree that the animation is currently interpolating to. If the animation is not headed to any state, it will return the current state.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../../RecursiveHelpers/type-aliases/Recursive.html"><code>Recursive</code></a>&lt;<code>number</code>, <code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../../AnimatableTypes/type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>• <strong>into</strong>: <code>object</code>= <code>{}</code></p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>Animating</code></p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, c: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getInterpingToTree</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {a: {x: 0, y: 0}, b: 0, c: 0}</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">})</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getInterpingToTree</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {a: {x: 1, y: 1}, b: 1, c: 0}</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">updateAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0.5</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getInterpingToTree</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// {a: {x: 1, y: 1}, b: 1, c: 0} - same as before update</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Animatable.ts#L573" target="_blank" rel="noreferrer">Animate/Animatable.ts:573</a></p>`,15),h=[n];function p(l,r,k,d,o,g){return a(),i("div",null,h)}const y=s(t,[["render",p]]);export{c as __pageData,y as default};