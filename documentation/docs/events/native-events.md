## Native events

By default, aya registers all created components.
This allows it to define events on them, such as mousedown, mousemove, mouseup, mouseleave, mouseover.

These events are defined on all created components, so they can be moved, resized or linked to each other.


## Add events

You can define events on your shapes or your components using the addEvent method.

Here is the method to do it:

```js
addEvent(event, callback){
    this.c_svg.addEventListener(event, callback);
    this.events[event] = callback;
}
```
For example I can define a mousedown event on a rectangle component like this:


```js
<script>
    var rec = aya.rectangle(100, 130, 200, 200);

    rec.addEvent("mousedown", ()=> {
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

For example I can delete a mousedown event on a rectangle component like this:


```js
<script>
    var rec = aya.rectangle(100, 130, 200, 200);

    rec.addEvent("mousedown", ()=> {
        console.log("this is the callback for mousedown event");
    });

    rec.deleteEvent("mousedown");
</script>
```

## Delete all events

Aya gives you the possibility to delete all your events at the same time with the deleteAllEvents method:


```js
deleteAllEvents(){
    Object.keys(this.events).map((event) => {
        this.deleteEvent(event);
    });
}
```

For example I can delete all the event (mousedown, mousemove,mouseup, mouseleave) on a rectangle component like this:

```js
<script>
    var rec = aya.rectangle(500, 200, 200, 100);

    rec.deleteAllEvents();
</script>
```
