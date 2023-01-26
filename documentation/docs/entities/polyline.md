## aya.Polyline(points)

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
<b>Specifications : </b>  aya.Polyline is a method that takes an array as arguments like shown in this table :
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
        <td rowspan='1' class="type_style">array</td>
        <td>points</td>
        <td>
            An array of successive abscissa, ordinate pairs.
        </td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a polyline form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
    var polyline = aya.Polyline([130, 123, 234, 349, 211, 293]);
    polyline.draw();
</script>
```