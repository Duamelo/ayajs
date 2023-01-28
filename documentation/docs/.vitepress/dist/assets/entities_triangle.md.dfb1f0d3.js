import{_ as t,o as e,c as a,a as r}from"./app.0db8dcb2.js";const x=JSON.parse('{"title":"aya.Triangle(x1,y1,x2,y2,x3,y3})","description":"","frontmatter":{},"headers":[{"level":2,"title":"aya.Triangle(x1,y1,x2,y2,x3,y3})","slug":"aya-triangle-x1-y1-x2-y2-x3-y3"}],"relativePath":"entities/triangle.md","lastUpdated":1674740894000}'),s={name:"entities/triangle.md"},n=r(`<h2 id="aya-triangle-x1-y1-x2-y2-x3-y3" tabindex="-1">aya.Triangle(x1,y1,x2,y2,x3,y3}) <a class="header-anchor" href="#aya-triangle-x1-y1-x2-y2-x3-y3" aria-hidden="true">#</a></h2><body><b>Specifications : </b> aya.Triangle is a method that takes siw (06) parameters as arguments like shown in this table : <table class="table_1"><thead><tr class="thead-row"><th class="empty-space"></th><th>Argument</th><th>Description</th></tr></thead><tbody><tr><td class="type_style">number</td><td>x1</td><td>The abscissa of the first vertex of the triangle, x1 pixels away from the upper left corner of the browser along the horizontal.</td></tr><tr><td class="type_style">number</td><td>y1</td><td>The ordinate of the first vertex of the triangle, distant by y1 pixel from the upper left corner of the browser along the vertical.</td></tr><tr><td class="type_style">number</td><td>x2</td><td>The abscissa of the first vertex of the triangle, x2 pixels away from the upper left corner of the browser along the horizontal.</td></tr><tr><td class="type_style">number</td><td>y2</td><td>The ordinate of the first vertex of the triangle, distant by y2 pixel from the upper left corner of the browser along the vertical.</td></tr><tr><td class="type_style">number</td><td>x3</td><td>The abscissa of the first vertex of the triangle, x3 pixels away from the upper left corner of the browser along the horizontal.</td></tr><tr><td class="type_style">number</td><td>y3</td><td>The ordinate of the first vertex of the triangle, distant by y3 pixel from the upper left corner of the browser along the vertical.</td></tr></tbody></table></body><p>Here is an example of how you can create a triangle form. <p>This kind of creation, doesn&#39;t draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p></p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var triangle = aya.Triangle(50, 150, 150, 100, 200, 190);</span></span>
<span class="line"><span style="color:#A6ACCD;">    triangle.draw();</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,4),l=[n];function o(i,d,p,c,h,y){return e(),a("div",null,l)}var _=t(s,[["render",o]]);export{x as __pageData,_ as default};
