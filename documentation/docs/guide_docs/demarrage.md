<style>
    body{
        width:100%;
    }
    .getstart{
        /*background: rgba(120, 120, 120, .3);*/
        padding: 15px;
        font-size: 1.6rem;
        font-weight: bold;
    }
    .demarrage-title-design{
        border-bottom:2px dashed rgba(128, 128, 128, 0.202);
        margin-bottom:500px;
    }

    .demarrage-installation-code-section{
        background: #282c34;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding:20px 20px;
        border-radius:4px;
    }

    .demarrage-installation-code-section .code-example{
        color:grey;
    }
    .code-example-getstated{
        color: rgba(250, 250, 250, 1.0);
    }
    .demarrage-installation-code-section .code-example-getstated .script{
        color:orange;
    }
     .demarrage-installation-code-section .code-example-getstated .real-script{
        margin:0 0;
        padding-left:30px;
        color:#33a7e6ca;
     }
</style>
<body>
    <div class="getstart">Let's Goo! Commençons à utiliser aya</div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated"><span class='script'><span>&lt;</span>script</span><span class='script'>></span> &nbsp;&nbsp;<p class="real-script">var aya = new aya.Init();</p><span class='script'><span>&lt;</span>script</span><span class='script'>/></span></code>
    </pre>
    <div><p>Créer un simple composant</p></div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated"><span class='script'><span>&lt;</span>script</span><span class='script'>></span> <br> var rectangle = aya.Component( <br> "rectangle",<br>  { <br>    x: 100,<br>    y: 100,<br>    width: 200,<br>    height: 100<br>  }<br>); <br><span class='script'><span>&lt;</span>script</span><span class='script'>/></span></code>
    </pre>
    <div><p>Rendre visible le composant créé</p></div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated"><span class='script'><span>&lt;</span>script</span><span class='script'>></span> <br>  <span class="real-script">document.body.append(aya.svg);</span><br><span class='script'><span>&lt;</span>script</span><span class='script'>/></span></code>
    </pre>
    <br><br>
</body>
