## aya.Rectangle

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
        <td>rectangle</td>
        <td>nom du composant</td>
    </tr>
    <tr>
        <td rowspan='4' class="type_style">Object</td>
        <td>x</td>
        <td>L'abscisse du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
    <tr>
        <td>y</td>
        <td>L'ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>width</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>height</td>
        <td>La hauteur de la forme rectangulaire</td>
    </tr>
    </tbody>
</table>

## attributs

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
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.height</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.events</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.nativeEvent</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.config</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.c_svg</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.svg</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.type</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.children</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.offsetX</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.offsetY</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.scaleX</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.scaleY</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.centerX</td>
        <td>La largeur de la forme rectangulaire</td>
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
        <td>this.c_points</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
     <tr>
        <td>this.scaleX</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    <tr>
        <td>this.vertex</td>
        <td>La largeur de la forme rectangulaire</td>
    </tr>
    </tbody>
</table>
</body>

## aya.Arc.addEvent

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

## aya.Arc.deleteEvent
Cette méthode nous permet de supprimer un événement spécifique passé comme paramètre de type chaîne.
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
</table>

## aya.Arc.addChild
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

redessine la forme après un événement ex: move, resize etc...
