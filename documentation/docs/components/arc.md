## aya.Component("arc", {x0: , y0: , x: , y: , angle: , ratio: })

<style>
.empty-space{
    visibility:hidden;
    display:inline-block;
    border:none;
}
.table_1 .thead-row,
.table_2 .thead-row {
    border-top:none;
}
.type_style{
    transform:rotate(-40deg);
}
</style>
<body>
<b>Specifications : </b>  aya.Component is a method that takes two parameters as arguments: the type of component and the corresponding properties as object.
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
        <td class="type_style">String</td>
        <td>arc</td>
        <td>component's type</td>
    </tr>
    <tr>
        <td rowspan='6' class="type_style">Object</td>
        <td>x0</td>
        <td>The abscissa of the left extremity of the radius segment, x0 pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y0</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y0 pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
    <tr>
        <td>x</td>
        <td>The abscissa of the right extremity of the radius segment, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td>angle</td>
        <td>The angle that the arc forms with the horizontal</td>
    </tr>
     <tr>
        <td>ratio</td>
        <td>Determines the degree of opening of the pie</td>
    </tr>
    </tbody>
</table>

<!-- ## attributs

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
        <td>nom du composant</td>
    </tr>
    <tr>
        <td>this.x</td>
        <td>L'abscisse du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
    <tr>
        <td>this.y</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.width</td>
        <td>largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.height</td>
        <td>largeur de la forme rectangulaire</td>
    </tr>
        <tr>
        <td>this.events</td>
        <td>Objet dictionnaire pour enregistrer les événements et leurs rappels respectifs associés au formulaire.</td>
    </tr>
    <tr>
        <td>this.nativeEvent</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.config</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.c_svg</td>
        <td>Représente l'élément svg dom créé</td>
    </tr>
     <tr>
        <td>this.svg</td>
        <td>l'élément natif 'svg' du dom</td>
    </tr>
     <tr>
        <td>this.type</td>
        <td>type de form sera crée : rectangle</td>
    </tr>
     <tr>
        <td>this.children</td>
        <td>Un tableau listant tous les enfants du formulaire.</td>
    </tr>
    <tr>
        <td>this.offsetX</td>
        <td>L'offsetX représente le décalage en x à appliquer au rectangle pour le positionner à {this. x + this.offSetX} sur l'axe des x.</td>
    </tr>
     <tr>
        <td>this.offsetY</td>
        <td>L'offsetY représente le décalage y à appliquer au rectangle pour le positionner à {this. y + this.offSetX} sur l'axe y.</td>
    </tr>
     <tr>
        <td>this.scaleX</td>
        <td>Le ScaleX représente l'échelle à appliquer à la taille de la forme sur l'axe x. forme sur l'axe des x.</td>
    </tr>
     <tr>
        <td>this.scaleY</td>
        <td>Le ScaleY représente l'échelle à appliquer à la taille de la forme sur l'axe Y</td>
    </tr>
     <tr>
        <td>this.angle</td>
        <td>Cette variable représente la valeur de l'angle de rotation à appliquer pour faire pivoter la forme. appliqué pour faire pivoter la forme.L'angle est donné en radian</td>
    </tr>
     <tr>
        <td>this.centerX</td>
        <td>Le centre de rotation est défini en définissant centerX</td>
    </tr>
     <tr>
        <td>this.centerY</td>
        <td>Le centre de rotation est défini en définissant centerY</td>
    </tr>
     <tr>
        <td>this.c_points</td>
        <td>La variable c_points représente tous les points de connexion du formulaire. Ce sont les points à partir desquels on peut établir un lien avec d'autres formulaires ayant également ces points de connexion.</td>
    </tr>
     <tr>
        <td>this.vertex</td>
        <td>La variable vertex représente l'ensemble des points à partir desquels à partir desquels nous pouvons redimensionner la forme</td>
    </tr>
    </tbody>
</table> -->
</body>

Here is an example of how you can create a arc component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Arc method of Init class.</p>
In this example, 0 as ratio mean that we'll have a portion of pie chart like form.
```sh
<script>
   var arc = aya.Component("arc", {x: 100, y: 100, x0: 300, y0: 100, angle: 50, ratio: 0});
</script>
```