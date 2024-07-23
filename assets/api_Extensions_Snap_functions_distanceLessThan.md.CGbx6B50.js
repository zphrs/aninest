import{_ as s,c as a,o as e,V as i}from"./chunks/framework.BwUCzv35.js";const g=JSON.parse('{"title":"distanceLessThan()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Extensions/Snap/functions/distanceLessThan.md","filePath":"api/Extensions/Snap/functions/distanceLessThan.md"}'),t={name:"api/Extensions/Snap/functions/distanceLessThan.md"},n=i(`<p><a href="./../../../">aninest</a> / <a href="./../">Extensions/Snap</a> / distanceLessThan</p><h1 id="distancelessthan" tabindex="-1">distanceLessThan() <a class="header-anchor" href="#distancelessthan" aria-label="Permalink to &quot;distanceLessThan()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">distanceLessThan</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Point</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">distance</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">ShouldSnap</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Point</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&gt;</span></span></code></pre></div><p>Returns a function of whether the provided distance is smaller than the distance between the current state and an arbitrary point. Mainly meant as a utility function for <a href="./setSnapPoint.html">setSnapPoint</a>.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../../../RecursiveHelpers/type-aliases/Recursive.html"><code>Recursive</code></a>&lt;<code>number</code>, <code>unknown</code>&gt;</p><p>• <strong>Point</strong> extends <a href="./../../../RecursiveHelpers/type-aliases/PartialRecursive.html"><code>PartialRecursive</code></a>&lt;<code>number</code>, <code>Animating</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>distance</strong>: <code>number</code></p><p>The threshold euclidean distance.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../type-aliases/ShouldSnap.html"><code>ShouldSnap</code></a>&lt;<code>Animating</code>, <code>Point</code>&gt;</p><p>A function which returns whether the distance between the current state and the point is less than distance provided.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> dlt2</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> distanceLessThan</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">dlt2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}, {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, y: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// true</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/Extensions/snap.ts#L204" target="_blank" rel="noreferrer">Animate/Extensions/snap.ts:204</a></p>`,17),h=[n];function r(l,p,d,o,c,k){return e(),a("div",null,h)}const u=s(t,[["render",r]]);export{g as __pageData,u as default};