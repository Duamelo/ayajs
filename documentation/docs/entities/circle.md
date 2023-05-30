## aya.circle(x, y, r, is_drawing, is_save, uuid);

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
<b>Specifications : </b>  aya.circle is a method that takes six parameters as arguments (but only three are required) like shown in this table:

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
        <td>
            The abscissa of the center of the circle, x pixels from the upper left corner of the browser along the horizontal line.
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>
            The ordinate of the center of the circle, distant by y pixel from the upper left corner of the browser along the vertical.
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>r</td>
        <td>The radius of the circle.</td>
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

Here is an example of how you can create a circle component.

```js
<script>
    var circle = aya.circle(100, 150, 20);
</script>
```
By default <strong>is_drawing</strong>, <strong>is_save</strong> parameters are true and <strong>uuid</strong> parameter is undefined.