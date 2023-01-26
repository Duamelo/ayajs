## aya.Triangle(x1,y1,x2,y2,x3,y3})

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
<b>Specifications : </b>  aya.Triangle is a method that takes siw (06) parameters as arguments like shown in this table :
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
        <td>x1</td>
        <td>The abscissa of the first vertex of the triangle, x1 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y1</td>
        <td>The ordinate of the first vertex of the triangle, distant by y1 pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>x2</td>
        <td>The abscissa of the first vertex of the triangle, x2 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>y2</td>
        <td>The ordinate of the first vertex of the triangle, distant by y2 pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>x3</td>
        <td>The abscissa of the first vertex of the triangle, x3 pixels away from the upper left corner of the browser along the horizontal.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>y3</td>
        <td>The ordinate of the first vertex of the triangle, distant by y3 pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a triangle form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
    var triangle = aya.Triangle(50, 150, 150, 100, 200, 190);
    triangle.draw();
</script>
```