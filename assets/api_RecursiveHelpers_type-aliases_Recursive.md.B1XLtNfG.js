import{_ as e,c as s,o as a,V as i}from"./chunks/framework.FbKWQZfA.js";const E=JSON.parse('{"title":"Recursive<Base, Shape>","description":"","frontmatter":{},"headers":[],"relativePath":"api/RecursiveHelpers/type-aliases/Recursive.md","filePath":"api/RecursiveHelpers/type-aliases/Recursive.md"}'),t={name:"api/RecursiveHelpers/type-aliases/Recursive.md"},r=i('<p><a href="./../../">aninest root</a> / <a href="./../">RecursiveHelpers</a> / Recursive</p><h1 id="recursive-base-shape" tabindex="-1">Recursive&lt;Base, Shape&gt; <a class="header-anchor" href="#recursive-base-shape" aria-label="Permalink to &quot;Recursive\\&lt;Base, Shape\\&gt;&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes classy-light classy-dark vp-code"><code><span class="line"><span style="--shiki-light:#CE9409;--shiki-dark:#FFF4BA;">type</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;"> Recursive</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Base</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Shape</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">&gt;: { [P in keyof Shape]: Shape[P] extends Base ? Base : Recursive&lt;</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Base</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">, </span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">Shape</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">[</span><span style="--shiki-light:#645CEE;--shiki-dark:#A8A9F4;">P</span><span style="--shiki-light:#313233;--shiki-dark:#E9EAE4;">]&gt; };</span></span></code></pre></div><p>Generic type which allows for the recursive definition of an object which either has a value of type <code>Base</code> or a subtree of the same type.</p><h2 id="type-parameters" tabindex="-1">Type Parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type Parameters&quot;">​</a></h2><p>• <strong>Base</strong></p><p>• <strong>Shape</strong></p><h2 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h2><p><a href="https://github.com/zphrs/aninest/blob/28867544fa41eaaa86feb7a0ef492917740748d5/core/src/Animate/RecursiveHelpers.ts#L36" target="_blank" rel="noreferrer">Animate/RecursiveHelpers.ts:36</a></p>',9),p=[r];function h(n,l,c,o,d,k){return a(),s("div",null,p)}const y=e(t,[["render",h]]);export{E as __pageData,y as default};