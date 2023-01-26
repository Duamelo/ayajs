import{_ as s,o as a,c as n,a as l}from"./app.160d44bb.js";const i=JSON.parse('{"title":"Build complex components","description":"","frontmatter":{},"headers":[{"level":2,"title":"translate(p,c)","slug":"translate-p-c"},{"level":2,"title":"rotate(p,c)","slug":"rotate-p-c"}],"relativePath":"add_child.md"}'),p={name:"add_child.md"},o=l(`<h1 id="build-complex-components" tabindex="-1">Build complex components <a class="header-anchor" href="#build-complex-components" aria-hidden="true">#</a></h1><p>In order to build more complex components, aya allows to add child shapes to a basic component.</p><p>To do this, we use the addChild method of the abstract class Form. It takes the form, two callbacks as parameters and a boolean specifying if the form should be drawn in the svg.</p><p>The first callback defines a translation when needed, and the second a rotation.</p><p>This is what it looks like:</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">addChild</span><span style="color:#A6ACCD;">(child</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> translate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> rotate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> drawing </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">translate</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#82AAFF;">translate</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">rotate</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#82AAFF;">rotate</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">child</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">drawing</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">child</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">draw</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">children</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">child</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">translate</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">rotate</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>We also record all component&#39;s children.</p><h2 id="translate-p-c" tabindex="-1">translate(p,c) <a class="header-anchor" href="#translate-p-c" aria-hidden="true">#</a></h2><p>The translation method takes two parameters: the parent component and the child.</p><h2 id="rotate-p-c" tabindex="-1">rotate(p,c) <a class="header-anchor" href="#rotate-p-c" aria-hidden="true">#</a></h2><p>The rotation method like translation takes two parameters: the parent component and the child.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var circle = aya.Component(&quot;circle&quot;, </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">x: </span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y: </span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r: </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    circle.form.addChild(aya.Text(0,0,&#39;the text inside the rectangle shape&#39;), </span></span>
<span class="line"><span style="color:#A6ACCD;">        (p,c)=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setOffsetX</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x);</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setOffsetY</span><span style="color:#A6ACCD;">(p</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">y);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">, </span></span>
<span class="line"><span style="color:#A6ACCD;">        (p,c)=&gt;</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">, </span></span>
<span class="line"><span style="color:#A6ACCD;">        true</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>Another example :</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    var arc = aya.Arc(100, 50, 210, 250, 45, 3/4);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    var text = aya.Text(arc.x + 10, arc.y, &quot;some text inside arc&quot;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    arc.addChild(text, </span></span>
<span class="line"><span style="color:#A6ACCD;">        (p,c)=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setOffsetX</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setOffsetY</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">, </span></span>
<span class="line"><span style="color:#A6ACCD;">        (p,c) =&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRotateAngle</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">90</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRotateCenter</span><span style="color:#A6ACCD;">(c</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">y);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">, </span></span>
<span class="line"><span style="color:#A6ACCD;">        false</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,14),e=[o];function t(c,r,y,F,D,A){return a(),n("div",null,e)}var d=s(p,[["render",t]]);export{i as __pageData,d as default};
