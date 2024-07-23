import{_ as s,c as e,o as a,V as i}from"./chunks/framework.BwUCzv35.js";const u=JSON.parse('{"title":"distanceSquaredBetween()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Extensions/Snap/functions/distanceSquaredBetween.md","filePath":"api/Extensions/Snap/functions/distanceSquaredBetween.md"}'),t={name:"api/Extensions/Snap/functions/distanceSquaredBetween.md"},n=i(`<p><a href="./../../../">aninest</a> / <a href="./../">Extensions/Snap</a> / distanceSquaredBetween</p><h1 id="distancesquaredbetween" tabindex="-1">distanceSquaredBetween() <a class="header-anchor" href="#distancesquaredbetween" aria-label="Permalink to &quot;distanceSquaredBetween()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">distanceSquaredBetween</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Point</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">point</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">currentState</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">number</span></span></code></pre></div><p>Measures the squared euclidean distance between the point and the currentState across the features in the point.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../../../RecursiveHelpers/type-aliases/Recursive.html"><code>Recursive</code></a>&lt;<code>number</code>, <code>unknown</code>&gt;</p><p>• <strong>Point</strong> extends <a href="./../../../RecursiveHelpers/type-aliases/PartialRecursive.html"><code>PartialRecursive</code></a>&lt;<code>number</code>, <code>Animating</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>point</strong>: <code>Point</code></p><p>An arbitrary point ex. if <code>Animating = {x: number, y: number, z: number}</code> then point could be <code>{x: number, y: number}</code></p><p>• <strong>currentState</strong>: <a href="./../../../RecursiveHelpers/type-aliases/Recursive.html"><code>Recursive</code></a>&lt;<code>number</code>, <code>Animating</code>&gt;</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>number</code></p><p>The squared euclidean distance between the point and the currentState across the features in the point.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, z: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> point</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> distSquared</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> distanceSquaredBetween</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">point</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getStateTree</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// 2</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/snap.ts#L228" target="_blank" rel="noreferrer">Animate/Extensions/snap.ts:228</a></p>`,18),r=[n];function h(p,l,d,k,o,c){return a(),e("div",null,r)}const g=s(t,[["render",h]]);export{u as __pageData,g as default};
