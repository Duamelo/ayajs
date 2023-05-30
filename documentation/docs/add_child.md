# Build complex components

In order to build more complex components, aya allows to add child shapes to a basic component.

To do this, we use the addChild method that every component has.
It takes the shape, two objects as parameters and a boolean specifying if the shape should be drawn in the svg.

The first object defines a translation when needed, and the second a rotation.

This is what it looks like:

```js
addChild(child, translate = null, rotate = null, drawing = true){
    /* resizing and connection to child are not possible */
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

You should put the <strong>is_drawing</strong> parameter of the child at false otherwise the child will be rendered two times. Because the addChild method is responsible for drawing the component's children.

```js   
<script>
    var rec = aya.rectangle(100, 350, 200, 200);

    var text = aya.text(100, 100, "text example", 0, 0, 0, false);

    rec.addChild(text, {x: -10, y: -30}, {x: rec.x, y: rec.y}, true);
</script>
```