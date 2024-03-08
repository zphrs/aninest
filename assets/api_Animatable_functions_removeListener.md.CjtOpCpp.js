import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.nQaBHiNx.js";const c=JSON.parse('{"title":"removeListener()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/removeListener.md","filePath":"api/Animatable/functions/removeListener.md"}'),t={name:"api/Animatable/functions/removeListener.md"},n=e(`<p><a href="./../../">@plexigraph/aninest</a> / <a href="./../">Animatable</a> / removeListener</p><h1 id="removelistener" tabindex="-1">removeListener() <a class="header-anchor" href="#removelistener" aria-label="Permalink to &quot;removeListener()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">removeListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   type</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">void</span></span></code></pre></div><p>Removes a listener from the animation</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>The animation object</p><p>• <strong>type</strong>: <a href="./../type-aliases/AnimatableEvents.html"><code>AnimatableEvents</code></a></p><p>&quot;start&quot;, &quot;end&quot;, &quot;bounce&quot;, &quot;interrupt&quot; - the type used to add the listener</p><p>• <strong>listener</strong>: <a href="./../../Listeners/type-aliases/Listener.html"><code>Listener</code></a>&lt;<code>Partial</code>&lt;<a href="./../type-aliases/LocalAnimatable.html"><code>LocalAnimatable</code></a>&lt;<code>Animating</code>&gt;&gt;&gt;</p><p>The listener function to remove</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>void</code></p><h2 id="see" tabindex="-1">See <a class="header-anchor" href="#see" aria-label="Permalink to &quot;See&quot;">​</a></h2><p><a href="./addLocalListener.html">addLocalListener</a> to add a listener to an animation</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// setup</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) }, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> listener</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> state</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =&gt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> console</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">log</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;started&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">state</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">addListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;start&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}}) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will trigger the listener</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">removeListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;start&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {a: {x: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">}}) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will not trigger the listener</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L380" target="_blank" rel="noreferrer">Animate/Animatable.ts:380</a></p>`,21),h=[n];function l(p,r,k,d,o,E){return a(),i("div",null,h)}const y=s(t,[["render",l]]);export{c as __pageData,y as default};
