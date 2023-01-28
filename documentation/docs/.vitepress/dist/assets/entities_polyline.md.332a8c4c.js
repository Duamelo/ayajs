import{_ as a,o as e,c as s,a as t}from"./app.0db8dcb2.js";const m=JSON.parse('{"title":"aya.Polyline(points)","description":"","frontmatter":{},"headers":[{"level":2,"title":"aya.Polyline(points)","slug":"aya-polyline-points"}],"relativePath":"entities/polyline.md","lastUpdated":1674740894000}'),n={name:"entities/polyline.md"},l=t(`<h2 id="aya-polyline-points" tabindex="-1">aya.Polyline(points) <a class="header-anchor" href="#aya-polyline-points" aria-hidden="true">#</a></h2><body><b>Specifications : </b> aya.Polyline is a method that takes an array as arguments like shown in this table : <table class="table_1"><thead><tr class="thead-row"><th class="empty-space"></th><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td rowspan="1" class="type_style">array</td><td>points</td><td> An array of successive abscissa, ordinate pairs. </td></tr></tbody></table></body><p>Here is an example of how you can create a polyline form. <p>This kind of creation, doesn&#39;t draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var polyline = aya.Polyline([130, 123, 234, 349, 211, 293]);</span></span>
<span class="line"><span style="color:#A6ACCD;">    polyline.draw();</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,4),o=[l];function i(p,r,c,d,y,_){return e(),s("div",null,o)}var f=a(n,[["render",i]]);export{m as __pageData,f as default};
