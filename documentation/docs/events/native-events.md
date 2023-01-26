## Native events

By default, aya registers all created components.
This allows it to define events on them, such as mousedown, mousemove, mouseup, mouseleave, mouseover.

These events are defined on all created components.

Unlike simple shapes which cannot be moved, resized or linked to another shape.


## Add events

You can define events on your shapes or your components using the addEvent method.

Here is the method to do it:

```js
    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }
```
For example I can define a mousedown event on a rectangle jsape like this


```js
<script>
    var rec = aya.Rectangle(100, 130, 200, 200);
    rec.draw();

    rec.addEvent("mousedown", ()=> {
        console.log("this is the callback for mousedown event");
    });
</script>
```
With a component, it goes like this:


```js
<script>
   var rec = aya.Component("rectangle", {x: 500, y: 200, width: 200, height: 100});

    rec.form.addEvent("mousedown", ()=> {
        console.log("this is the callback for mousedown event");
    });
</script>
```

## Delete events

Aya gives you the possibility to delete your events with the deleteEvent method:


```js
    deleteEvent(event){
        var callback = this.events[event];
        this.c_svg.removeEventListener(event, callback);
        delete this.events[event];
    }
```

For example I can delete a mousedown event on a rectangle shape like this


```js
<script>
    var rec = aya.Rectangle(100, 130, 200, 200);
    rec.draw();

    rec.addEvent("mousedown", ()=> {
        console.log("this is the callback for mousedown event");
    });

    rec.deleteEvent("mousedown");
</script>
```
With a component, it goes like this:


```js
<script>
   var rec = aya.Component("rectangle", {x: 500, y: 200, width: 200, height: 100});

    rec.form.addEvent("mousedown", ()=> {
        console.log("this is the callback for mousedown event");
    });

    rec.form.deleteEvent("mousedown");
</script>
```