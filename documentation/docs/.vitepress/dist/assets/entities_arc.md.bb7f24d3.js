import{_ as t,o as e,c as a,a as s}from"./app.20e85b2d.js";const u=JSON.parse('{"title":"aya.arc(x0, y0, x, y, angle, ratio, isdrawing, issave, uuid);","description":"","frontmatter":{},"headers":[{"level":2,"title":"aya.arc(x0, y0, x, y, angle, ratio, isdrawing, issave, uuid);","slug":"aya-arc-x0-y0-x-y-angle-ratio-is-drawing-is-save-uuid"}],"relativePath":"entities/arc.md","lastUpdated":1674740894000}'),r={name:"entities/arc.md"},n=s(`<h2 id="aya-arc-x0-y0-x-y-angle-ratio-is-drawing-is-save-uuid" tabindex="-1">aya.arc(x0, y0, x, y, angle, ratio, is_drawing, is_save, uuid); <a class="header-anchor" href="#aya-arc-x0-y0-x-y-angle-ratio-is-drawing-is-save-uuid" aria-hidden="true">#</a></h2><body><b>Specifications : </b> aya.arc is a method that takes nine (09) parameters at most (there are six of them that is required) as arguments like shown in this table: <table class="table_1"><thead><tr class="thead-row"><th class="empty-space"></th><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td class="type_style">number</td><td>x0</td><td>The abscissa of the left extremity of the radius segment, x0 pixels away from the upper left corner of the browser along the horizontal. </td></tr><tr><td class="type_style">number</td><td>y0</td><td>The ordinate of the left extremity of the radius segment, distant by y0 pixel from the upper left corner of the browser along the vertical. </td></tr><tr><td class="type_style">number</td><td>x</td><td>The abscissa of the right extremity of the radius segment, x pixels away from the upper left corner of the browser along the horizontal. </td></tr><tr><td class="type_style">number</td><td>y</td><td>The ordinate of the left extremity of the radius segment, distant by y pixel from the upper left corner of the browser along the vertical. </td></tr><tr><td class="type_style">number</td><td>angle</td><td>The angle that the arc forms with the horizontal.</td></tr><tr><td class="type_style">number</td><td>ratio</td><td>Determines the degree of opening of the pie.</td></tr><tr><td class="type_style">boolean</td><td>is_drawing</td><td>Tell to aya if the component should be drawn in the browser or not.</td></tr><tr><td class="type_style">boolean</td><td>is_save</td><td>Tell to aya if the component should be save or not.</td></tr><tr><td class="type_style">string</td><td>uuid</td><td>Specify a specific id to the component.</td></tr></tbody></table></body><p>Here is an example of how you can create an arc component. In this example, 0 as ratio means that we&#39;ll have a portion of pie chart like shape.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   var arc = aya.arc(100, 100, 300, 100, 50, 0);</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.</p>`,5),o=[n];function i(d,l,c,p,h,y){return e(),a("div",null,o)}var m=t(r,[["render",i]]);export{u as __pageData,m as default};