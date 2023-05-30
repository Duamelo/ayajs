import{_ as a,o as t,c as s,a as e}from"./app.20e85b2d.js";const h=JSON.parse('{"title":"aya.Polyline(points, isdrawing, issave, uuid);","description":"","frontmatter":{},"headers":[{"level":2,"title":"aya.Polyline(points, isdrawing, issave, uuid);","slug":"aya-polyline-points-is-drawing-is-save-uuid"}],"relativePath":"entities/polyline.md","lastUpdated":1674740894000}'),n={name:"entities/polyline.md"},i=e(`<h2 id="aya-polyline-points-is-drawing-is-save-uuid" tabindex="-1">aya.Polyline(points, is_drawing, is_save, uuid); <a class="header-anchor" href="#aya-polyline-points-is-drawing-is-save-uuid" aria-hidden="true">#</a></h2><body><b>Specifications : </b> aya.polyline is a method that takes an array as arguments and three other parameters like shown in this table : <table class="table_1"><thead><tr class="thead-row"><th class="empty-space"></th><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td rowspan="1" class="type_style">array</td><td>points</td><td> An array of successive abscissa, ordinate pairs. </td></tr><tr><td class="type_style">boolean</td><td>is_drawing</td><td>Tell to aya if the component should be drawn in the browser or not.</td></tr><tr><td class="type_style">boolean</td><td>is_save</td><td>Tell to aya if the component should be save or not.</td></tr><tr><td class="type_style">string</td><td>uuid</td><td>Specify a specific id to the component.</td></tr></tbody></table></body><p>Here is an example of how you can create a polyline component.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var polyline = aya.polyline([130, 123, 234, 349, 211, 293]);</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.</p>`,5),o=[i];function l(r,p,d,c,y,_){return t(),s("div",null,o)}var g=a(n,[["render",l]]);export{h as __pageData,g as default};