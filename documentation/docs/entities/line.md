## aya.line(x, y, dest_x, dest_y, is_drawing, is_save, uuid);

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
<b>Specifications : </b>  aya.line is a method that takes seven (07) parameters as arguments (but only 04 are required) like shown in this table:

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
        <td>The abscissa of the beginning of the line, x pixels away from the upper left corner of the browser along the horizontal.
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
        <td>The abscissa of the end of the line, dest_x pixels away from the upper left corner of the browser along the horizontal.
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>dest_y</td>
        <td>The abscissa of the end of the line, dest_y pixels away from the upper left corner of the browser along the horizontal.
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

Here is an example of how you can create a line component.
```js
<script>
    var line = aya.line(50, 150, 150, 100);
</script>
```
By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.