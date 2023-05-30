## aya.link(src_id, dest_id, userconfig = {});

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
<b>Specifications : </b>  aya.link is a method that takes three (03) parameters as arguments like shown in this table:

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
        <td>src_id</td>
        <td>The id of the source component.</td>
    </tr>
    <tr>
        <td class="type_style">String</td>
        <td>dest_id</td>
        <td>The id of the source component.</td>
    </tr>
     <tr>
        <td class="type_style">Object</td>
        <td>userconfig</td>
        <td>Local configuration of the link.</td>
    </tr>
    </tbody>
</table>
</body>

<br/>
By default, aya registers every link created.
The link class exists to represent the link between two components.

Here is an example of how you can create a link between two rectangles.
Here we specified the extremities of the link in the userconfig object.

```js
<script>
    var rec1 = aya.rectangle(100, 100, 200, 100);
    var rec2 = aya.rectangle(500, 200, 200, 100);

    var lk = aya.link(rec1.uuid, rec2.uuid, {end_start: "triangle", end_dest: "triangle"});
</script>
```