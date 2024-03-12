import{_ as t,c as e,o as a,V as l}from"./chunks/framework.Be6hJq0D.js";const y=JSON.parse('{"title":"Vec2","description":"","frontmatter":{},"headers":[],"relativePath":"api/Vec2/index.md","filePath":"api/Vec2/index.md"}'),n={name:"api/Vec2/index.md"},r=l('<p><a href="./../">aninest</a> / Vec2</p><h1 id="vec2" tabindex="-1">Vec2 <a class="header-anchor" href="#vec2" aria-label="Permalink to &quot;Vec2&quot;">​</a></h1><p>A collection of 2D vector math functions and a few other generic scalar operations.</p><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>Vectors are represented as <code>{x: number, y: number}</code> and are meant to be immutable, following a functional programming style.</p><h2 id="index" tabindex="-1">Index <a class="header-anchor" href="#index" aria-label="Permalink to &quot;Index&quot;">​</a></h2><h3 id="type-aliases" tabindex="-1">Type Aliases <a class="header-anchor" href="#type-aliases" aria-label="Permalink to &quot;Type Aliases&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Type alias</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./type-aliases/Vec2.html">Vec2</a></td><td style="text-align:left;">A 2D vector.</td></tr></tbody></table><h3 id="variables" tabindex="-1">Variables <a class="header-anchor" href="#variables" aria-label="Permalink to &quot;Variables&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Variable</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./variables/zeroVec2.html">zeroVec2</a></td><td style="text-align:left;">A 2D vector with x and y set to 0.</td></tr></tbody></table><h3 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Function</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="./functions/addVec.html">addVec</a></td><td style="text-align:left;">Adds two vectors together, returning a new vector.</td></tr><tr><td style="text-align:left;"><a href="./functions/bezier.html">bezier</a></td><td style="text-align:left;">Performs a bezier interpolation between two vectors by a time value.</td></tr><tr><td style="text-align:left;"><a href="./functions/clamp.html">clamp</a></td><td style="text-align:left;">Clamps a value between a minimum and maximum value.</td></tr><tr><td style="text-align:left;"><a href="./functions/copy.html">copy</a></td><td style="text-align:left;">Duplicates the vector.</td></tr><tr><td style="text-align:left;"><a href="./functions/cross.html">cross</a></td><td style="text-align:left;">Calculates the cross product of two vectors.</td></tr><tr><td style="text-align:left;"><a href="./functions/distanceTo.html">distanceTo</a></td><td style="text-align:left;">Calculates the distance between two vectors.</td></tr><tr><td style="text-align:left;"><a href="./functions/distanceTo2.html">distanceTo2</a></td><td style="text-align:left;">Calculates the squared distance between two vectors.</td></tr><tr><td style="text-align:left;"><a href="./functions/divScalar.html">divScalar</a></td><td style="text-align:left;">Divides a vector <code>v</code> by a scalar <code>s</code> immutably.</td></tr><tr><td style="text-align:left;"><a href="./functions/divVec.html">divVec</a></td><td style="text-align:left;">Performs component-wise division of <code>v1</code> / <code>v2</code> immutably.</td></tr><tr><td style="text-align:left;"><a href="./functions/dot.html">dot</a></td><td style="text-align:left;">Calculates the dot product of two vectors.</td></tr><tr><td style="text-align:left;"><a href="./functions/lerp.html">lerp</a></td><td style="text-align:left;">Performs a linear interpolation between two vectors by a time value.</td></tr><tr><td style="text-align:left;"><a href="./functions/lerpFunc.html">lerpFunc</a></td><td style="text-align:left;">Lerps between a and b by t.</td></tr><tr><td style="text-align:left;"><a href="./functions/mag.html">mag</a></td><td style="text-align:left;">Calculates the magnitude of a vector.</td></tr><tr><td style="text-align:left;"><a href="./functions/magSquared.html">magSquared</a></td><td style="text-align:left;">Squares the magnitude of a vector.</td></tr><tr><td style="text-align:left;"><a href="./functions/mapVec.html">mapVec</a></td><td style="text-align:left;">Calls a function func on each component of a vector,<br>creating a new vector from the result of each function call.</td></tr><tr><td style="text-align:left;"><a href="./functions/mulScalar.html">mulScalar</a></td><td style="text-align:left;">Multiplies a vector <code>v</code> by a scalar <code>s</code> immutably.</td></tr><tr><td style="text-align:left;"><a href="./functions/mulVec.html">mulVec</a></td><td style="text-align:left;">Does component-wise multiplication of two vectors immutably.</td></tr><tr><td style="text-align:left;"><a href="./functions/newVec2.html">newVec2</a></td><td style="text-align:left;">Vec2 Constructor</td></tr><tr><td style="text-align:left;"><a href="./functions/normalize.html">normalize</a></td><td style="text-align:left;">Returnes a normalized version of the vector.</td></tr><tr><td style="text-align:left;"><a href="./functions/rotate.html">rotate</a></td><td style="text-align:left;">Rotates a vector by an angle in radians.</td></tr><tr><td style="text-align:left;"><a href="./functions/rotateAround.html">rotateAround</a></td><td style="text-align:left;">Rotates a vector around a pivot point by an angle in radians.</td></tr><tr><td style="text-align:left;"><a href="./functions/subVec.html">subVec</a></td><td style="text-align:left;">Subtracts v2 from v1 immutably.</td></tr><tr><td style="text-align:left;"><a href="./functions/vecToIter.html">vecToIter</a></td><td style="text-align:left;">Converts a vector to an array.<br>Useful for spreading into function arguments.</td></tr></tbody></table>',12),i=[r];function o(d,s,c,f,h,u){return a(),e("div",null,i)}const x=t(n,[["render",o]]);export{y as __pageData,x as default};
