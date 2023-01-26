## aya.Image(x, y, width, height, path)

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
<b>Specifications : </b>  aya.Image is a method that takes six (05) parameters as arguments like shown in this table:
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
        <td>The abscissa of the upper left corner of the image, x pixels away from the upper left corner of the browser along the horizontal</td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the upper left corner of the image, y pixels away from the upper left corner of the browser along the horizontal</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>width</td>
        <td>The width of the image</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>height</td>
        <td>The height of the image</td>
    </tr>
     <tr>
        <td class="type_style">string</td>
        <td>path</td>
        <td>The path to retrieve the image from the file system</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a image form.
```js
<script>
    var img = aya.Image(230, 245, 30,30, "icons/decorator.png");
    img.draw();
</script>
```