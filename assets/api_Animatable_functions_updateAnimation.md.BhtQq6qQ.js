import{_ as a,c as e,o as t,V as i}from"./chunks/framework.Be6hJq0D.js";const k=JSON.parse('{"title":"updateAnimation()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/updateAnimation.md","filePath":"api/Animatable/functions/updateAnimation.md"}'),n={name:"api/Animatable/functions/updateAnimation.md"},s=i('<p><a href="./../../">@plexigraph/aninest</a> / <a href="./../">Animatable</a> / updateAnimation</p><h1 id="updateanimation" tabindex="-1">updateAnimation() <a class="header-anchor" href="#updateanimation" aria-label="Permalink to &quot;updateAnimation()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">updateAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">dt</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">boolean</span></span></code></pre></div><p>Moves forward in the animation by a certain amount of time.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>The animation object</p><p>• <strong>dt</strong>: <code>number</code></p><p>The time to increment the animation by. Must be positive. If negative or zero then no-op.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>boolean</code></p><p>whether the animation needs to be updated again</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/2f19e55/src/Animate/Animatable.ts#L601" target="_blank" rel="noreferrer">Animate/Animatable.ts:601</a></p>',16),o=[s];function r(p,h,l,d,c,m){return t(),e("div",null,o)}const A=a(n,[["render",r]]);export{k as __pageData,A as default};