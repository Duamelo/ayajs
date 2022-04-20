var test = require("tape");
const EventManager = require("../src/eventManager").EventManager;
var nativeEvent = require("../src/eventManager").nativeEvents;


test("empty nativeEvent before adding event", (t) => {
    var ev =  EventManager;

    t.equal(nativeEvents.length, 0);
    t.end();
});

test("add event", (t) => {
    var ev = EventManager;

    ev.add("circle", "drag", null);

    t.equal(nativeEvents.length, 1);
    t.end();
});

test("remove all EventManager", (t) => {
    var ev = EventManager;
    
    nativeEvents.splice(0, nativeEvents.length);

    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);

    t.equal(nativeEvents.length, 4);
    ev.destroy();

    t.equal(nativeEvents.length, 0);
    t.end();
});

