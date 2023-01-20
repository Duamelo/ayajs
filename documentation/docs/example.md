---
layout: home
---
<style scoped>

.main-block{
    height:100px;
    width:80%;
    margin:50px auto;
   /*background:grey;*/
}
.para-with-line-above-download{
    position:relative;
    max-width:135px;
    font-size:26px;
    font-weight:bold;
    margin-top:100px;
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
.para-with-line-above-uses-cases{
  padding-top:15px;
    position:relative;
    max-width:320px;
    margin-bottom:70px;
    font-weight:bold;
    font-size:56px;

}

.para-with-line-above-download::before,
.para-with-line-above-overview:before,
.para-with-line-above-basic-usage::before,
.para-with-line-above-drawing-first-shape::before,
.para-with-line-above-next-step::before,
.para-with-line-above-uses-cases::before{
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

.use-case-block{
  margin-top:30px;
  
  display:flex;
  justify-content:space-around;
  padding:20px;
  border-radius:10px;
}

.use-case-presentation-block,
.right-use-case-presentation-block{
  width:50%;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.right-use-case-presentation-block{
  padding-left:20px;
}

.live-use-case-presentation{
  width:50%;
}

.use-case-block .use-case-presentation-block .use-case-description,
.use-case-block .right-use-case-presentation-block .use-case-description {
  padding:20px 0;
  text-align:justify;
  max-width: 80%;
}

.use-case-block .use-case-presentation-block .use-case-title,
.use-case-block .right-use-case-presentation-block .right-use-case-title{
  font-weight:bold;
  font-size:32px;
}

.live-use-case-presentation{
  display:flex;
  align-items:center;
}

@media(max-width: 688px){
    .use-case-block{
        display:block;
    }
    .live-use-case-presentation{
       width:100%;
    }
    .use-case-presentation-block,
    .right-use-case-presentation-block{
      width:100%;
    }

    .right-use-case-presentation-block{
      margin-top:20px;
  }
}

.use-case-block .use-case-presentation-block .use-case-button,
.use-case-block .right-use-case-presentation-block .use-case-button{
    padding:14.5px;
    background:#58768f1a;
    max-width:80%;
    text-align:center;
  }

  .main-footer{
    background:black;
    width:100%;
  }
  .footer{
    top: 300px;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;    
  }
  .mit_license{
    text-align:center;
    color: #969696;
  }
  .copyright{
    text-align:center;
    color: #969696;
  }
  .hr{
    position: relative;
    top: 100px;
    width: 20%;
    color: #969696;
  }
  .team{
    position: relative; 
    text-align:center;
  }
</style>
<body>

<div class="main-block">

  <!--<p class="para-with-line-above-uses-cases">Uses cases </p>-->
<br><br>
<br><br>

  <div class="use-case-block">
    <div class="use-case-presentation-block">
      <h1 class="use-case-title"> Game of life</h1>
      <p class="use-case-description">
        The <b>game of life</b> takes place on a theoretically infinite two-dimensional grid, whose cells - called "cells", by analogy with living cells - can assume two distinct states: "alive" or "dead". A cell has eight neighbors, which are the cells adjacent horizontally, vertically and diagonally.
      </p>
      <a href="https://duamelo.github.io/game_of_life/" class="use-case-button">Live preview</a>
    </div>
    <div class="live-use-case-presentation">
      <img src="./images/game_of_life.gif" width="400px" height="100px">
    </div>
  </div>
<br><br>
<br><br>

<div class="use-case-block">
    <div class="live-use-case-presentation">
      <img src="./images/flowchart.gif">
    </div>
     <div class="right-use-case-presentation-block">
      <h1 class="right-use-case-title">MBP-flowchat</h1>
      <p class="use-case-description">
        <b>MBP-flowchat</b> is an aya-based tool that allows you to perform business processes
      </p>
      <a href="#!" class="use-case-button">Live preview</a>
    </div>
</div>
  <br><br>
  <br><br>
  <hr/>
  <p class="mit_license">Released under the MIT License.</p>
  <p class="copyright">Copyright © 2022-present David DOSSEH</p>
  <br/>
</div>
</body>
