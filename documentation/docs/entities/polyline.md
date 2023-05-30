## aya.Polyline(points, is_drawing, is_save, uuid);

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
<b>Specifications : </b>  aya.polyline is a method that takes an array as arguments and three other parameters like shown in this table :
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

Here is an example of how you can create a polyline component.
```js
<script>
    var polyline = aya.polyline([130, 123, 234, 349, 211, 293]);
</script>
```
By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.