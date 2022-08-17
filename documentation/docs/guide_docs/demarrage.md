
<br><br>

<style>
    body{
        width:100%;
    }
    .getstart{
        background: rgba(120, 120, 120, .3);
        padding: 15px;
        width: 400px;
        font-size: 1.5rem;
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

</style>
<body>
    <div class="getstart">Commençons à utiliser aya.js !</div>
    <div><p>Insérons une balise de Javascript</p></div>
    <pre class="demarrage-installation-code-section">
        <code class='code-example-getstated getstart-example'>script
        </code>
    </pre>
    <div><p>Créeons une instance de aya</p></div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated">script <br> var aya = new aya.Init(); <br>script</code>
    </pre>
    <div><p>Maintenant, nous pouvons créer un composant.</p></div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated">script <br> var rectangle = aya.Component( <br> "rectangle",<br>  { <br>    x: 100,<br>    y: 100,<br>    width: 200,<br>    height: 100<br>  }<br>); <br>script</code>
    </pre>
    <div><p>Enfin, rendons le composant crée</p></div>
    <pre class="demarrage-installation-code-section">
        <code class="code-example-getstated">script <br>  document.body.append(aya.svg);<br>script</code>
    </pre>
    <br><br>
    
</body>
