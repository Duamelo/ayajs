## aya.Arc(x0, y0, x, y, angle, ratio)

<style>
.empty-space{
    visibility:hidden;
    display:inline-block;
    border:none;
}
.table_1 .thead-row {
    border-top:none;
}
.type_style{
    transform:rotate(-40deg);
}
</style>
<body>
<b>Specifications : </b>  aya.Arc is a method that takes six (06) parameters as arguments like shown in this table:

<table class='table_1'>
    <thead>
    <tr class="thead-row">
        <th class="empty-space"></th>
        <th>Argument</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="type_style">number</td>
        <td>x0</td>
        <td>The abscissa of the left extremity of the radius segment, x0 pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y0</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y0 pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>x</td>
        <td>The abscissa of the right extremity of the radius segment, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>angle</td>
        <td>The angle that the arc forms with the horizontal</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>ratio</td>
        <td>Determines the degree of opening of the pie</td>
    </tr>
    </tbody>
</table>

<!-- ## attributs -->
<!--
<table class='table_2'>
    <thead>
    <tr class="thead-row">
        <th>Attribut</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>this.uuid</td>
        <td>identifiant de la forme</td>
    </tr>
    <tr>
        <td>this.x0</td>
        <td>abscisse du point de départ</td>
    </tr>
    <tr>
        <td>this.y0</td>
        <td>ordonnée du point de départ</td>
    </tr>
     <tr>
        <td>this.x</td>
        <td>abscisse du point d'arrivé</td>
    </tr>
    <tr>
        <td>this.y</td>
        <td>ordonnée du point de départ</td>
    </tr>
     <tr>
        <td>this.angle</td>
        <td>en degré pour donner ni'mporte quelle courbure désirée à son arc</td>
    </tr>
    <tr>
        <td>this.ratio</td>
        <td>ajoute une précision afin de faire exactement 1/4 de cercle, 1/8 de cercle etc...</td>
    </tr>
     <tr>
        <td>this.svg</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.event</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.config</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    </tbody>
</table>
 -->
</body> 

<!-- ## aya.Arc.addEvent -->
<!-- 
Cette méthode nous permet d'ajouter un événement à ce formulaire ; nous enregistrons l'événement et le callback associé pour pouvoir le retirer facilement après
<table class='table_3'>
    <thead>
    <tr class="thead-row">
        <th>Argument</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>event</td>
        <td>l'événement</td>
    </tr>
    <tr>
        <td>callback</td>
        <td>Ce callback est soit défini par l'utilisateur lors de l'ajout d'autres événements personnalisés, soit un callback déjà défini dans event.js</td>
    </tr>
    </tbody>
</table>
 -->
<!-- ## aya.Arc.deleteEvent -->

<!-- Cette méthode nous permet de supprimer un événement spécifique passé comme paramètre de type chaîne.
<table class='table_4'>
    <thead>
        <tr class="thead-row">
            <th>Argument</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>event</td>
            <td>l'élévenement</td>
        </tr>
    </tbody>
</table> -->

<!-- ## aya.Arc.addChild -->
<!-- 
Nous pouvons construire n'importe quelle forme en ajoutant à un composant de base des enfants de forme
<table class='table_4'>
    <thead>
    <tr class="thead-row">
        <th>Argument</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>child</td>
        <td>Ce formulaire ( @extend Form) est ajouté comme enfant à un composant avec un formulaire.</td>
    </tr>
    <tr>
        <td>translate</td>
        <td> { parent, child } Cette fonction nous permet de positionner l'enfant par rapport à son parent</td>
    </tr>
    <tr>
        <td>rotate</td>
        <td> { parent, enfant } Cette fonction nous permet d'appliquer une rotation de l'enfant en prenant en compte compte de sa position relative et du centre de rotation</td>
    </tr>
    </tbody>
    </table>

## aya.Circle.draw

draw déssine le cercle avec les paramètres spécifiés

## aya.Circle.removeFromDOM

 supprime l'élément du DOM

## aya.circle.redraw

redessine la forme après un événement ex: move, resize etc... -->


Here is an example of how you can create an arc form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>
In this example, 0 as ratio mean that we'll have a portion of pie chart like form.
```sh
<script>
   var arc = aya.Arc(100, 100, 300, 100, 50, 0);
   arc.draw();
</script>
```