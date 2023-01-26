## aya.Component("rectangle", {x: , y: , width: , height: })

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
        <td>rectangle</td>
        <td>component's type</td>
    </tr>
    <tr>
        <td rowspan='4' class="type_style">Object</td>
        <td>x</td>
        <td>The abscissa of the beginning of the drawing of the shape, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y</td>
        <td>The ordinate of the beginning of the drawing of the shape, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td>width</td>
        <td>The width of the rectangular shape</td>
    </tr>
     <tr>
        <td>height</td>
        <td>The height of the rectangular shape</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a rectangle component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Rectangle method of Init class.</p>

```js
<script>
    var rect = aya.Component("rectangle", {x: 100, y: 150, width: 200, height: 120});
</script>
```