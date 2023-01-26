## aya.Rectangle(x,y,width,height)

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
<b>Specifications : </b>  aya.Rectangle is a method that takes foor (04) parameters as arguments like shown in this table :
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
        <td>The abscissa of the beginning of the drawing of the shape, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the beginning of the drawing of the shape, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>width</td>
        <td>The width of the rectangular shape</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>height</td>
        <td>The height of the rectangular shape</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a rectangle form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
    var rect = aya.Rectangle(100, 150, 200, 120);
    rect.draw();
</script>
```