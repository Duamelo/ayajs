# Build complex components

In order to build more complex components, aya allows to add child shapes to a basic component.

To do this, we use the addChild method of the abstract class Form.
It takes the form, two callbacks as parameters and a boolean specifying if the form should be drawn in the svg.

The first callback defines a translation when needed, and the second a rotation.

This is what it looks like:

```js
    addChild(child, translate = null, rotate = null, drawing = false){
        if(translate != null)
            translate(this, child);
        if(rotate != null)
            rotate(this, child);
        if(drawing == true)
            child.draw();
        this.children.push({child, translate, rotate});
    }
```
We also record all component's children.

## translate(p,c)

The translation method takes two parameters: the parent component and the child.

## rotate(p,c)

The rotation method like translation takes two parameters: the parent component and the child.

```js
<script>
    var circle = aya.Component("circle", {x: 200, y: 200, r: 80});

    circle.form.addChild(aya.Text(0,0,'the text inside the rectangle shape'), 
        (p,c)=>{
            c.setOffsetX(p.x);
            c.setOffsetY(p.y);
        }, 
        (p,c)=>{}, 
        true
    );
</script>
```
Another example :


```js   
<script>
    var arc = aya.Arc(100, 50, 210, 250, 45, 3/4);

    var text = aya.Text(arc.x + 10, arc.y, "some text inside arc");

    arc.addChild(text, 
        (p,c)=>{
            c.setOffsetX(0);
            c.setOffsetY(0);
        }, 
        (p,c) =>{
            c.setRotateAngle(-90)
            c.setRotateCenter(c.x, c.y);
        }, 
        false
    );
</script>
```