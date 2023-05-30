## aya.text(x, y, text, size, dest_x, dest_y, is_drawing);

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
<b>Specifications : </b>  aya.text is a method that takes seven (07) parameters as arguments (but only 04 are required) like shown in this table :

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
            The abscissa of the first character of the text, x pixels from the upper left corner of the browser along the horizontal line.
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>
            The ordinate of the first character of the text,, distant by y pixel from the upper left corner of the browser along the vertical.
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>text</td>
        <td>The text to be displayed.</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>size</td>
        <td>The size of the text to be displayed (By default it's 300 pixels).</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>dest_x</td>
        <td>The end abscissa of the line that represents the text support.</td>
    </tr>
         <tr>
        <td class="type_style">number</td>
        <td>dest_y</td>
        <td>The end ordinate of the line that represents the text support.</td>
    </tr>
     <tr>
        <td class="type_style">boolean</td>
        <td>is_drawing</td>
        <td>Tell to aya if the component should be drawn in the browser or not.</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a text component.
<p>If the value of size attribute is not big enough, the text will be cut.</p>

You can specify either the size parameter or the dest_x and dest_y parameters that represent the end coordinate of the text support.

```js
<script>
   var text = aya.text(100, 150, "hello world", 200);
</script>
```
By default <strong>is_drawing</strong> parameter is true.