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
</body>

Here is an example of how you can create a triangle component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Triangle method of Init class.</p>

```js
<script>
    var triangle = aya.Component("triangle", {x1: 50, y1: 150, x2: 150, y2: 100, x3: 200, y3: 190});
</script>
```