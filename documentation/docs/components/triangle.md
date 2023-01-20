## aya.Component("triangle", {x1: , y1: , x2: , y2: , x3: , y3: })

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
        <td>triangle</td>
        <td>component's name</td>
    </tr>
    <tr>
        <td rowspan='6' class="type_style">Object</td>
        <td>x1</td>
        <td>The abscissa of the first vertex of the triangle, x1 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
    <tr>
        <td>y1</td>
        <td>The ordinate of the first vertex of the triangle, distant by y1 pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td>x2</td>
        <td>The abscissa of the first vertex of the triangle, x2 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
     <tr>
        <td>y2</td>
        <td>The ordinate of the first vertex of the triangle, distant by y2 pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td>x3</td>
        <td>The abscissa of the first vertex of the triangle, x3 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
     <tr>
        <td>y3</td>
        <td>The ordinate of the first vertex of the triangle, distant by y3 pixel from the upper left corner of the browser along the vertical.</td>
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
        <td>this.x1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>this.y1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>this.x2</td>
        <td>Lorem ipsum dolor sit amet</td>
    </tr>
     <tr>
        <td>this.y2</td>
        <td>Lorem ipsum dolor sit amet</td>
    </tr>
     <tr>
        <td>this.x3</td>
        <td>Lorem ipsum dolor sit amet</td>
    </tr>
     <tr>
        <td>this.y3</td>
        <td>Lorem ipsum dolor sit amet</td>
    </tr>
     <tr>
        <td>this.events</td>
        <td>La largeur de la forme rectangulaire</td>
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
        <td>this.box</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.c_svg</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.svg</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.scale</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.offsetX</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.offsetY</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.scaleX</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.scaleY</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.centerX</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.centerY</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.angle</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.children</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.c_points</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.vertex</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    </tbody>
</table> -->
</body>

Here is an example of how you can create a triangle component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Triangle method of Init class.</p>

```sh
<script>
    var triangle = aya.Component("triangle", {x1: 50, y1: 150, x2: 150, y2: 100, x3: 200, y3: 190});
</script>
```