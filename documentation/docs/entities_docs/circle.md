## aya.Circle

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
        <th>Argument</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>x</td>
        <td>abscisse du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
    <tr>
        <td>y</td>
        <td>ordonnée du début du dessin de la forme, située à l'extrémité gauche du navigateur</td>
    </tr>
     <tr>
        <td>r</td>
        <td>rayon du cercle</td>
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
        <td>identifiant du composant dans le DOM</td>
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
        <td>this.r</td>
        <td>rayon du cercle</td>
    </tr>
    <tr>
        <td>this.events</td>
        <td>Objet dictionnaire pour enregistrer les événements et leurs rappels respectifs associés au formulaire.</td>
    </tr>
     <tr>
        <td>this.nativeEvent</td>
        <td>Stock les événements natifs définis par aya : mouseMove, mouseLeave, mouseUp etc</td>
    </tr>
     <tr>
        <td>this.config</td>
        <td>fichier de configuration de base fournis par aya : aya.config pour accéder à l'objet</td>
    </tr>
     <tr>
        <td>this.box</td>
        <td>stock les points délimitant la forme peu importe sa atille et son emplacement</td>
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
        <td>type de form sera crée : circle</td>
    </tr>
     <tr>
        <td>this.scale</td>
        <td>représente l'échelle à appliquer à la taille de la forme</td>
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
        <td>this.angle</td>
        <td>Cette variable représente la valeur de l'angle de rotation à appliquer pour faire pivoter la forme. appliqué pour faire pivoter la forme.L'angle est donné en radian</td>
    </tr>
     <tr>
        <td>this.children</td>
        <td>Tableau listant tous les enfants du formulaire</td>
    </tr>
     <tr>
        <td>this.c_points</td>
        <td>Variable c_points représente tous les points de connexion du formulaire. Ce sont les points à partir desquels on peut établir un lien avec d'autres formulaires ayant également ces points de connexion</td>
    </tr>
     <tr>
        <td>this.vertex</td>
        <td>La variable vertex représente l'ensemble des points à partir desquels à partir desquels nous pouvons redimensionner la forme</td>
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
