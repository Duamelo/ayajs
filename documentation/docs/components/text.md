## aya.Component("text", {x: , y: , text: " ", size: })

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
        <td>text</td>
        <td>component's type</td>
    </tr>
    <tr>
        <td rowspan='4' class="type_style">Object</td>
        <td>x</td>
        <td>
            The abscissa of the first character of the text, x pixels from the upper left corner of the browser along the horizontal line.
        </td>
    </tr>
    <tr>
        <td>y</td>
        <td>
            The ordinate of the first character of the text, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td>text</td>
        <td>The text to be displayed</td>
    </tr>
     <tr>
        <td>size</td>
        <td>The size of the text to be displayed</td>
    </tr>
    </tbody>
</table>
</body>


Here is an example of how you can create a text component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Text method of Init class.</p>

```js
<script>
   var text = aya.Component("text", {x: 100, y: 150, text: "hello world", size: 200});
</script>
```