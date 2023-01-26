## aya.Text(x,y,text,size)

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
<b>Specifications : </b>  aya.Text is a method that takes four (04) parameters as arguments like shown in this table :

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
            The ordinate of the first character of the text,, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>text</td>
        <td>The text to be displayed</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>size</td>
        <td>The size of the text to be displayed</td>
    </tr>
    </tbody>
</table>
</body>


Here is an example of how you can create a text form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>

```js
<script>
   var text = aya.Text(100, 150, "hello world", 200);
   text.draw();
</script>
```