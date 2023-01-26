## aya.Lozenge(x, y, width, height)

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
<b>Specifications : </b>  aya.Lozenge is a method that takes foor (04) parameters as arguments like shown in this table :
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
        <td>x</td>
        <td>The abscissa of the vertex closest to the upper left corner, x pixels away from it on the horizontal.</td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the vertex closest to the upper left corner, y pixels away from it on the vertical.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>width</td>
        <td>The width of the diagonal parallel to the horizontal</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>height</td>
        <td>The height of the diagonal parallel to the vertical</td>
    </tr>
    </tbody>
</table>

</body>

Here is an example of how you can create a lozenge form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
   var los = aya.Lozenge(100, 100, 100, 100);
   los.draw();
</script>
```