var test = require("tape");
const Events = require("../src/events");


test("empty nativeEvent before adding event", (t) => {
    var ev = new Events();

    t.equal(ev.nativeEvents.length, 0);
    t.end();
});

test("add event", (t) => {
    var ev = new Events();

    ev.add("circle", "drag", null);

    t.equal(ev.nativeEvents.length, 1);
    t.end();
});

test("remove all events", (t) => {
    var ev = new Events();

    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);
    ev.add("circle", "drag", null);

    t.equal(ev.nativeEvents.length, 4);
    ev.destroy();

    t.equal(ev.nativeEvents.length, 0);
    t.end();
});

