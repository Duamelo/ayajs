## aya.Line(x, y, dest_x, dest_y)

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
<b>Specifications : </b>  aya.Line is a method that takes foor (04) parameters as arguments like shown in this table:

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
        <td>The abscissa of the beginning of the line, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the beginning of the line, distant by y pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>dest_x</td>
        <td>The abscissa of the end of the line, dest_x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>dest_y</td>
        <td>The abscissa of the end of the line, dest_y pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a line form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
    var line = aya.Line(50, 150, 150, 100);
    line.draw();
</script>
```