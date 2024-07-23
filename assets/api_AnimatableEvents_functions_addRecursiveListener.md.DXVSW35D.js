import{_ as s,c as i,o as a,V as e}from"./chunks/framework.BwUCzv35.js";const g=JSON.parse('{"title":"addRecursiveListener()","description":"","frontmatter":{},"headers":[],"relativePath":"api/AnimatableEvents/functions/addRecursiveListener.md","filePath":"api/AnimatableEvents/functions/addRecursiveListener.md"}'),t={name:"api/AnimatableEvents/functions/addRecursiveListener.md"},n=e(`<p><a href="./../../">aninest</a> / <a href="./../">AnimatableEvents</a> / addRecursiveListener</p><h1 id="addrecursivelistener" tabindex="-1">addRecursiveListener() <a class="header-anchor" href="#addrecursivelistener" aria-label="Permalink to &quot;addRecursiveListener()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">addRecursiveListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   type</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span></span>
<span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">   listener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">unsubscribe</span></span></code></pre></div><p>Adds a recursive start listener to the animation. This listener will trigger on any child modification. Animation listeners are called in the order in which they were added.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../../RecursiveHelpers/type-aliases/Recursive.html"><code>Recursive</code></a>&lt;<code>number</code>, <code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../../AnimatableTypes/type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>• <strong>type</strong>: <a href="./../type-aliases/AnimatableEvents.html"><code>AnimatableEvents</code></a></p><p>• <strong>listener</strong>: <a href="./../../Listeners/type-aliases/Listener.html"><code>Listener</code></a>&lt;<code>undefined</code>&gt; | <a href="./../../Listeners/type-aliases/Listener.html"><code>Listener</code></a>&lt;<a href="./../../AnimatableTypes/type-aliases/UnknownAnimation.html"><code>UnknownAnimation</code></a>&gt;</p><p>() =&gt; boolean Returns whether to remove the listener. Void or false to keep the listener.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><a href="./../../AnimatableTypes/type-aliases/unsubscribe.html"><code>unsubscribe</code></a></p><p>A function to remove the listener</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), b: </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">newVec</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">) }, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">))</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">addRecursiveListener</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;start&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, () </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">=&gt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> console</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">.</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">log</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#846905;--shiki-dark:#FFD140;">&quot;started&quot;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">)) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will trigger</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/f1bf3a3/src/Animate/AnimatableEvents.ts#L114" target="_blank" rel="noreferrer">Animate/AnimatableEvents.ts:114</a></p>`,18),r=[n];function h(l,p,k,d,o,c){return a(),i("div",null,r)}const y=s(t,[["render",h]]);export{g as __pageData,y as default};
