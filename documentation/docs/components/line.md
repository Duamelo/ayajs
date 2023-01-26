## aya.Component("line", {x: , y: dest_x: , dest_y: })


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
        <td>line</td>
        <td>component's name</td>
    </tr>
    <tr>
        <td rowspan='6' class="type_style">Object</td>
        <td>x</td>
        <td>The abscissa of the beginning of the line, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y</td>
        <td>The ordinate of the beginning of the line, distant by y pixel from the upper left corner of the browser along the vertical.</td>
    </tr>
     <tr>
        <td>dest_x</td>
        <td>The abscissa of the end of the line, dest_x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
     <tr>
        <td>dest_y</td>
        <td>The abscissa of the end of the line, dest_y pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    </tbody>
</table>

</body>

Here is an example of how you can create a line component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Line method of Init class.</p>

```js
<script>
    var line = aya.Component("line", {x: 50, y: 150, dest_x: 150, dest_y: 100});
</script>
```