## aya.Arc(x0, y0, x, y, angle, ratio)

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
<b>Specifications : </b>  aya.Arc is a method that takes six (06) parameters as arguments like shown in this table:

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
        <td>x0</td>
        <td>The abscissa of the left extremity of the radius segment, x0 pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y0</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y0 pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>x</td>
        <td>The abscissa of the right extremity of the radius segment, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td class="type_style">number</td>
        <td>y</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>angle</td>
        <td>The angle that the arc forms with the horizontal</td>
    </tr>
     <tr>
        <td class="type_style">number</td>
        <td>ratio</td>
        <td>Determines the degree of opening of the pie</td>
    </tr>
    </tbody>
</table>
</body> 

Here is an example of how you can create an arc form.
<p>This kind of creation, doesn't draw immediately the corresponding form into the svg document unlike for calling the Component method of Init class.</p>
In this example, 0 as ratio mean that we'll have a portion of pie chart like form.
```js
<script>
   var arc = aya.Arc(100, 100, 300, 100, 50, 0);
   arc.draw();
</script>
```