## aya.Component("lozenge", {x: , y: , width: , height: })

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
        <td>lozenge</td>
        <td>component's name</td>
    </tr>
    <tr>
        <td rowspan='6' class="type_style">Object</td>
        <td>x</td>
        <td>The abscissa of the vertex closest to the upper left corner, x pixels away from it on the horizontal.</td>
    </tr>
    <tr>
        <td>y</td>
        <td>The ordinate of the vertex closest to the upper left corner, y pixels away from it on the vertical.</td>
    </tr>
     <tr>
        <td>width</td>
        <td>The width of the diagonal parallel to the horizontal</td>
    </tr>
     <tr>
        <td>height</td>
        <td>The height of the diagonal parallel to the vertical</td>
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
        <td>this.x</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>this.y</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>this.width</td>
        <td>Lorem ipsum dolor sit amet</td>
    </tr>
     <tr>
        <td>this.height</td>
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
        <td>this.c_svg</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>this.svg</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.box</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.type</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.p</td>
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

Here is an example of how you can create a lozenge component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Lozenge method of Init class.</p>

```sh
<script>
   var los = aya.Component("lozenge", {x: 100, y: 100, width: 100, height: 100});
</script>
```