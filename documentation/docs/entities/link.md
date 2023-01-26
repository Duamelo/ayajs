## aya.Link(src_point, dest_point, line)

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
<b>Specifications : </b>  aya.Link is a method that takes three (03) parameters as arguments like shown in this table:

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
        <td class="type_style">Point</td>
        <td>src_point</td>
        <td>The starting point of the link.</td>
    </tr>
    <tr>
        <td class="type_style">Point</td>
        <td>dest_point</td>
        <td>The end point of the link.</td>
    </tr>
     <tr>
        <td class="type_style">Line</td>
        <td>line</td>
        <td>The line that represents the link.</td>
    </tr>
    </tbody>
</table>
</body>

<br/>
By default, aya registers every link created.
The link class exists to represent the link between two components.

Here is an example of how you can create a link between two rectangles.

```js
<script>
    var rec1 = aya.Component("rectangle", {x: 100, y: 100, width: 200, height: 100});
    var rec2 = aya.Component("rectangle", {x: 500, y: 200, width: 200, height: 100});


    var line = aya.Line(rec1.form.c_points[1].x, rec1.form.c_points[1].y, rec2.form.c_points[3].x, rec2.form.c_points[3].y);
    line.draw();
    var lk = aya.Link(rec1.form.c_points[1], rec2.form.c_points[3], line);
</script>
```