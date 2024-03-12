import{_ as a,c as i,o as s,V as n}from"./chunks/framework.Be6hJq0D.js";const E=JSON.parse('{"title":"boundAnimation()","description":"","frontmatter":{},"headers":[],"relativePath":"api/Animatable/functions/boundAnimation.md","filePath":"api/Animatable/functions/boundAnimation.md"}'),t={name:"api/Animatable/functions/boundAnimation.md"},e=n(`<p><a href="./../../">aninest</a> / <a href="./../">Animatable</a> / boundAnimation</p><h1 id="boundanimation" tabindex="-1">boundAnimation() <a class="header-anchor" href="#boundanimation" aria-label="Permalink to &quot;boundAnimation()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">boundAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">bounds</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">): </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">void</span></span></code></pre></div><p>Modifies the bounds of an object, changing what the animation is currently interpolating to. Note: you might have to call <a href="./updateAnimation.html">updateAnimation</a> after this to make sure the animation is updated, if the current state is outside the new bounds. You can also call <a href="./animationNeedsUpdate.html">animationNeedsUpdate</a> to check if the animation needs to be updated before calling <a href="./updateAnimation.html">updateAnimation</a>.</p><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./../type-aliases/RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>• <strong>anim</strong>: <a href="./../type-aliases/Animation.html"><code>Animation</code></a>&lt;<code>Animating</code>&gt;</p><p>The animation to modify</p><p>• <strong>bounds</strong>: <code>undefined</code> | <code>Partial</code>&lt;<a href="./../type-aliases/Bounds.html"><code>Bounds</code></a>&lt;<a href="./../type-aliases/PartialRecursiveAnimatable.html"><code>PartialRecursiveAnimatable</code></a>&lt;<code>Animating</code>&gt;&gt;&gt;</p><p>The new bounds to set. They can be partial and will be merged with the old bounds.</p><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>void</code></p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">const</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> anim</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> =</span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;"> createAnimation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">({ a: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">0</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> }, </span><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">getLinearInterp</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">), {</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">upper: { a: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, b: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> },</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">})</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyTo</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, { a: </span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">2</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> }) </span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// will animate out to \`a: 2\` and then bounce back to \`a: 1\`</span></span>
<span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">...</span><span style="--shiki-light:#6E9D87;--shiki-dark:#6E9D87;">// run updateAnimationInfo in a loop here</span></span>
<span class="line"><span style="--shiki-light:#345348;--shiki-dark:#D9FFE8;">modifyAnimationBounds</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">(</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">anim</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, {</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">lower: { b: </span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">-</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;">1</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> },</span></span>
<span class="line"><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">})</span></span></code></pre></div><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/9c9889e/src/Animate/Animatable.ts#L561" target="_blank" rel="noreferrer">Animate/Animatable.ts:561</a></p>`,17),h=[e];function l(p,o,r,d,k,c){return s(),i("div",null,h)}const g=a(t,[["render",l]]);export{E as __pageData,g as default};
