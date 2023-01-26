## aya.Component("arc", {x0: , y0: , x: , y: , angle: , ratio: })

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
        <td>arc</td>
        <td>component's type</td>
    </tr>
    <tr>
        <td rowspan='6' class="type_style">Object</td>
        <td>x0</td>
        <td>The abscissa of the left extremity of the radius segment, x0 pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y0</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y0 pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
    <tr>
        <td>x</td>
        <td>The abscissa of the right extremity of the radius segment, x pixels away from the upper left corner of the browser along the horizontal
        </td>
    </tr>
    <tr>
        <td>y</td>
        <td>The ordinate of the left extremity of the radius segment, distant by y pixel from the upper left corner of the browser along the vertical
        </td>
    </tr>
     <tr>
        <td>angle</td>
        <td>The angle that the arc forms with the horizontal</td>
    </tr>
     <tr>
        <td>ratio</td>
        <td>Determines the degree of opening of the pie</td>
    </tr>
    </tbody>
</table>
</body>

Here is an example of how you can create a arc component.
<p>This kind of creation, draw immediately the corresponding form into the svg document unlike for calling the Arc method of Init class.</p>
In this example, 0 as ratio mean that we'll have a portion of pie chart like form.

```js
<script>
   var arc = aya.Component("arc", {x: 100, y: 100, x0: 300, y0: 100, angle: 50, ratio: 0});
</script>
```