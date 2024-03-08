import{_ as i,c as a,o as s,a4 as t}from"./chunks/framework.nQaBHiNx.js";const g=JSON.parse('{"title":"Animation<Animating>","description":"","frontmatter":{},"headers":[],"relativePath":"Animatable/type-aliases/Animation.md","filePath":"Animatable/type-aliases/Animation.md"}'),n={name:"Animatable/type-aliases/Animation.md"},e=t('<p><a href="./../../">@plexigraph/aninest</a> / <a href="./../">Animatable</a> / Animation</p><h1 id="animation-animating" tabindex="-1">Animation&lt;Animating&gt; <a class="header-anchor" href="#animation-animating" aria-label="Permalink to &quot;Animation\\&lt;Animating\\&gt;&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">type</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Animation</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;: AnimationWithoutChildren&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt; &amp; Object;</span></span></code></pre></div><p>The animation object. This is a recursive type, meaning that it can contain other animations.</p><h2 id="type-declaration" tabindex="-1">Type declaration <a class="header-anchor" href="#type-declaration" aria-label="Permalink to &quot;Type declaration&quot;">​</a></h2><h3 id="children" tabindex="-1">children <a class="header-anchor" href="#children" aria-label="Permalink to &quot;children&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">readonly</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> children</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">: { [</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">P</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> in</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> keyof</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">]: </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">[</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">P</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">] </span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">extends</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> number</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> ?</span><span style="--shiki-light:#413900;--shiki-dark:#CE9409;"> undefined</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;"> :</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;"> Animation</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">RecursiveAnimatable</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&lt;</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">Animating</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">[</span><span style="--shiki-light:#2D27A4;--shiki-dark:#CFD3FF;">P</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">]</span><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">&gt;&gt;</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;"> };</span></span></code></pre></div><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><p>• <strong>Animating</strong> extends <a href="./RecursiveAnimatable.html"><code>RecursiveAnimatable</code></a>&lt;<code>unknown</code>&gt;</p><h2 id="source" tabindex="-1">Source <a class="header-anchor" href="#source" aria-label="Permalink to &quot;Source&quot;">​</a></h2><p><a href="https://github.com/plexigraph/aninest/blob/6141dee/src/Animate/Animatable.ts#L72" target="_blank" rel="noreferrer">Animate/Animatable.ts:72</a></p>',11),h=[e];function l(p,r,k,d,o,c){return s(),a("div",null,h)}const m=i(n,[["render",l]]);export{g as __pageData,m as default};
