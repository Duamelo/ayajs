## aya.Component("polyline", {points: []})

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
        <td>polyline</td>
        <td>Component's type</td>
    </tr>
    <tr>
        <td rowspan='1' class="type_style">Object</td>
        <td>points</td>
        <td>
            An array of successive abscissa, ordinate pairs.
        </td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a polyline component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Polyline method of Init class.</p>

```js
<script>
    var polyline = aya.Component("polyline", {points: [130, 123, 234, 349, 211, 293]});
</script>
```