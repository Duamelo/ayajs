---
layout: home
---
<style scoped>

body{
    background-color: #fff;
    font-family: 'Roboto', sans-serif;
}
.container{
    display: flex;
    width: 920px;
    height: auto;
    margin: 30px auto;
}
.box{
    width: 32%;
    height: auto;
    border: 1px solid #ccc;
    margin-right: 1%;
    background: white;
    border-radius: 10px;
    transition: 0.9;
}
.box:hover{
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.5);
    cursor: pointer;
}
img{
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
h3,p{
    text-align: center;
    color: rgb(104, 92, 92);
}
p{
    font-size: 15px;
    padding: 0 5px;
}
@media (max-width: 800px){
    .container{
        width: 100%;
    }
}
@media (max-width: 600px){
    .container{
        width: 85%;
        display: block;
    }
    .box{
        width: 100%;
        margin-bottom: 4%;
    }
}
</style>


<body>
<br/>
<br/>
<br/>
<br/>
    <div class="container">
      <div class="box">
        <img src="./images/game_of_life.gif" width="400px" height="100px">
      </div>
      <div class="box">
        <img src="./images/game_of_life.gif" width="400px" height="100px">
      </div>
      <div class="box">
        <img src="./images/game_of_life.gif" width="400px" height="100px">
      </div>
    </div>
  </body>