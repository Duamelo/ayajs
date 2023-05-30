## aya.triangle(x1, y1, x2, y2, x3, y3, is_drawing, is_save, uuid);

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
<b>Specifications : </b>  aya.triangle is a method that takes nine (09) parameters as arguments (but only 06 are required) like shown in this table :
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
       <tr>
        <td class="type_style">boolean</td>
        <td>is_drawing</td>
        <td>Tell to aya if the component should be drawn in the browser or not.</td>
    </tr>
      <tr>
        <td class="type_style">boolean</td>
        <td>is_save</td>
        <td>Tell to aya if the component should be save or not.</td>
    </tr>
      <tr>
        <td class="type_style">string</td>
        <td>uuid</td>
        <td>Specify a specific id to the component.</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a triangle component.

```js
<script>
    var triangle = aya.triangle(50, 150, 150, 100, 200, 190);
</script>
```
By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.