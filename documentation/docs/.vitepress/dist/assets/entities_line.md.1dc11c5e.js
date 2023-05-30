import{_ as e,o as t,c as s,a}from"./app.20e85b2d.js";const u=JSON.parse('{"title":"aya.line(x, y, destx, desty, isdrawing, issave, uuid);","description":"","frontmatter":{},"headers":[{"level":2,"title":"aya.line(x, y, destx, desty, isdrawing, issave, uuid);","slug":"aya-line-x-y-dest-x-dest-y-is-drawing-is-save-uuid"}],"relativePath":"entities/line.md","lastUpdated":1674740894000}'),n={name:"entities/line.md"},r=a(`<h2 id="aya-line-x-y-dest-x-dest-y-is-drawing-is-save-uuid" tabindex="-1">aya.line(x, y, dest_x, dest_y, is_drawing, is_save, uuid); <a class="header-anchor" href="#aya-line-x-y-dest-x-dest-y-is-drawing-is-save-uuid" aria-hidden="true">#</a></h2><body><b>Specifications : </b> aya.line is a method that takes seven (07) parameters as arguments (but only 04 are required) like shown in this table: <table class="table_1"><thead><tr class="thead-row"><th class="empty-space"></th><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td class="type_style">number</td><td>x</td><td>The abscissa of the beginning of the line, x pixels away from the upper left corner of the browser along the horizontal. </td></tr><tr><td class="type_style">number</td><td>y</td><td>The ordinate of the beginning of the line, distant by y pixel from the upper left corner of the browser along the vertical.</td></tr><tr><td class="type_style">number</td><td>dest_x</td><td>The abscissa of the end of the line, dest_x pixels away from the upper left corner of the browser along the horizontal. </td></tr><tr><td class="type_style">number</td><td>dest_y</td><td>The abscissa of the end of the line, dest_y pixels away from the upper left corner of the browser along the horizontal. </td></tr><tr><td class="type_style">boolean</td><td>is_drawing</td><td>Tell to aya if the component should be drawn in the browser or not.</td></tr><tr><td class="type_style">boolean</td><td>is_save</td><td>Tell to aya if the component should be save or not.</td></tr><tr><td class="type_style">string</td><td>uuid</td><td>Specify a specific id to the component.</td></tr></tbody></table></body><p>Here is an example of how you can create a line component.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var line = aya.line(50, 150, 150, 100);</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.</p>`,5),d=[r];function i(o,l,p,c,y,h){return t(),s("div",null,d)}var f=e(n,[["render",i]]);export{u as __pageData,f as default};