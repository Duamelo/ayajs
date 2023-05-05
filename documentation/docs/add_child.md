# Build complex components

In order to build more complex components, aya allows to add child shapes to a basic component.

To do this, we use the addChild method of the abstract class Shape.
It takes the shape, two objects as parameters and a boolean specifying if the form should be drawn in the svg.

The first object defines a translation when needed, and the second a rotation.

This is what it looks like:

```js
addChild(child, translate = null, rotate = null, drawing = true){
    /* resizing and connection to child isn't possible */
    child.vertex = [];
    child.c_points = [];

    if(translate != null){
        child.offsetX = translate.x;
        child.offsetY = translate.y;
    }
    if(rotate != null){
        child.centerX = rotate.x;
        child.centerY = rotate.y;
        child.angle = rotate.angle;
    }       
    if(drawing == true)
        child.draw();
    this.shape.children.push({child});
}
```
We also record all component's children.


```js   
<script>
    var rec = aya.Component("rectangle", {x: 100, y: 350, width: 200, height: 200});

    var text = aya.Text(100, 100, "text example", 300);

    arc.addChild(text, {x: -10, y: -30}, {x: rec.shape.x, y: rec.shape.y}, true);
</script>
```