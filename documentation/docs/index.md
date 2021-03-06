---
layout: home

hero:
  name: ayajs
  text: amazing and fast library for creating diagrams.
  tagline: Lorem ipsum...
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Duamelo/ayajs
---
<style scoped>

.main-block{
    height:100px;
    width:80%;
    margin:0 auto;
   /*background:grey;*/
}
.para-with-line-above-download{
    position:relative;
    max-width:135px;
    font-size:26px;
    font-weight:bold;
}
.para-with-line-above-overview{
  position:relative;
    max-width:80px;
    margin-bottom:20px;
    font-weight:bold;
}

.para-with-line-above-basic-usage{
 position:relative;
    max-width:100px;
    margin-bottom:20px;
    font-weight:bold;
}

.para-with-line-above-drawing-first-shape{
 position:relative;
    max-width:200px;
    margin-bottom:20px;
    font-weight:bold;
}

.para-with-line-above-next-step{
 position:relative;
    max-width:80px;
    margin-bottom:20px;
    font-weight:bold;
}

.para-with-line-above-download::before,
.para-with-line-above-overview:before,
.para-with-line-above-basic-usage::before,
.para-with-line-above-drawing-first-shape::before,
.para-with-line-above-next-step::before{
    content:'';
    position:absolute;
    height: 3px;
    width:100%;
    background:black;
    top:-10px;
    left:0;
}

.inst{
background:#41DF811F;
width:100%;
padding-top:20px;
}

.divider{
  position:relative;
  display:flex;
  justify-content:center;
  width :100%;
  margin:30px 0px;
}
.divider::before{
   content:'';
    position:absolute;
    height: 1px;
    width:40%;
    background:rgba(0, 0, 0, 0.309);
    top:12px;
    left:5%;
}
.divider::after{
   content:'';
    position:absolute;
    height: 1px;
    width:40%;
    background:rgba(0, 0, 0, 0.309);
    top:12px;
    right:5%;
}

ul{
list-style-type: none;
width:70%;
margin-bottom:50px;
}
ul li::before {
  content: "\2022";
  color: #41df80d7;
  font-weight: bold;
  display: inline-block;
  margin-left:-20px;
  position:absolute;
}
ul li{
  margin-left:20px;
}
ul li h2{
  font-size:16px;
  font-weight:bold;
}
ul .overview-list{
  margin-bottom:20px;
}


.basic-usage-para,
.drawing-para,
.next-step-para
{
  margin-bottom:50px;
}

.big-test{
   margin-bottom:50px;
}


</style>


<body>
<div class="main-block">
  <p class="para-with-line-above-download">Download </p>
  <br>
  <p>via NPM</p>
  <pre class="inst">
  npm install aya js
  </pre>
  <p class="divider">or</p>

  <p> get CDN</p>
  <pre class="inst">
  https://cdn.jsdelivr.net/npm/aya.min.js
  </pre>
  <br><br>
  <p class="para-with-line-above-overview">Overview </p>

  <ul >
    <li class="overview-list">
      <h2>Focus on Vector Shapes</h2>
      <p>ayajs is deeply inspired by draw.io. As a result, ayajs aims to make the creation and animation of flat shapes easier and more concise</p>
    </li>
    <li class="overview-list">
      <h2>Focus on Vector Shapes</h2>
      <p>ayajs is deeply inspired by draw.io. As a result, ayajs aims to make the creation and animation of flat shapes easier and more concise</p>
    </li>
    <li class="overview-list">
      <h2>Focus on Vector Shapes</h2>
      <p>ayajs is deeply inspired by draw.io. As a result, ayajs aims to make the creation and animation of flat shapes easier and more concise</p>
    </li>
  </ul>
  <p class="para-with-line-above-basic-usage">Basic Usage </p>
  <p class="basic-usage-para">In order to start any of these demos you'll want to download two.js and add it to your HTML document. Once downloaded add this tag to the When you visit the page, you should be able to open up the console and type Two. If this returns a function (and not an error) then you're ready to begin!</p>
  <p class="para-with-line-above-drawing-first-shape">Drawing Your First shape </p>
  <p class="drawing-para">Before we get into all the fancy animating it's good to get a feel for how to make shapes in two.js. In order to do this we need to have an instance of two. This sets up a dom element that contains either an svg or canvas element to add to the webpage. The two object has a scene which holds all shapes as well as methods for creating shapes.</p>
<div class="big-test">
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNzpjjB" data-preview="true" data-user="marieangeleslie-the-selector" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/marieangeleslie-the-selector/pen/WNzpjjB">
  Untitled</a> by MarieAngeLeslie (<a href="https://codepen.io/marieangeleslie-the-selector">@marieangeleslie-the-selector</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

</div>
   <p class="para-with-line-above-next-step">Next Step</p>
  <p class="next-step-para">Now that you got a quick glimpse into some of the functionality two.js offers, check out the official and community examples to see what else you can do. These examples range from showing off specific features of the library to using the library in other environments, like React and Angular.
Looking for more information on a specific property? Then head over to the documentation which outlines all of the library's public features.
Haven't found what you're looking for? Then ask a question on our GitHub page.</p>
<p class="project-credits-para">Project credits</p>
<br><br>
</div>
</body>





