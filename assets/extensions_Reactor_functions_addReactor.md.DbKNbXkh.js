import{_ as s,c as i,o as a,V as e}from"./chunks/framework.FbKWQZfA.js";const g=JSON.parse('{"title":"addReactor()","description":"","frontmatter":{},"headers":[],"relativePath":"extensions/Reactor/functions/addReactor.md","filePath":"extensions/Reactor/functions/addReactor.md"}'),n={name:"extensions/Reactor/functions/addReactor.md"},t=e(`<p><a href="./../../">@aninest/extensions</a> / <a href="./../">Reactor</a> / addReactor</p><h1 id="addreactor" tabindex="-1">addReactor() <a class="header-anchor" href="#addreactor" aria-label="Permalink to &quot;addReactor()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">function</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> addReactor</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   reactor</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   mask</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">:</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> unmount</span></span></code></pre></div><p>Creates a dependency link between sets of properties. For example you could change the color of an object based on its position:</p><h2 id="type-parameters" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h2><p>• <strong>Animating</strong> <em>extends</em> <code>RecursiveAnimatable</code>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <code>Animation</code>&lt;<code>Animating</code>&gt;</p><p>• <strong>reactor</strong>: <code>Transform</code>&lt;<code>Animating</code>&gt;</p><p>• <strong>mask</strong>: <code>Mask</code>&lt;<code>PartialRecursive</code>&lt;<code>number</code>, <code>Animating</code>&gt;&gt;</p><p>Prevents running the reactor unnecessarily. Lets you specify which properties you don&#39;t want to react to.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>unmount</code></p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({pos: </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">ZERO_VEC2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, color: {r: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, g: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}}, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">addReactor</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, ({</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">pos</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}) </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">=&gt;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   r</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> (</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">pos</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">x</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> -</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;"> 127</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">%</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;"> 255</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   g</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> (</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">pos</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">y</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> -</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;"> 127</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">%</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;"> 255</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">   return</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {color: {</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">r</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">g</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}}</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> }, </span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> {color: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">false</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">} </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// makes sure the reactor doesn&#39;t trigger when color is modified.</span></span>
<span class="line"><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;"> // otherwise would create an endless loop of reactor calls.</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span></code></pre></div><h2 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/d10ff1271505e062a71fdb453fe27ee5103a9c80/extensions/src/reactor.ts#L49" target="_blank" rel="noreferrer">../../extensions/src/reactor.ts:49</a></p>`,17),h=[t];function l(p,k,r,d,o,c){return a(),i("div",null,h)}const y=s(n,[["render",l]]);export{g as __pageData,y as default};
