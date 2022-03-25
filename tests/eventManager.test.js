var test = require("tape");
const EventManager = require("../src/eventManager");

test("array of all events is empty", (t) => {
    var ev = new EventManager();

    t.equal(ev.events instanceof Array, true);
    t.end();
});


test("add event in the EventManger", (t) => {
    var ev = new EventManager();
    var svgElement = "circle";
    e = "dragstart"; 
    callback = () => {
        console.log(`callback of the event ${e}`);
    }

    ev.add(svgElement, e, callback);

    t.equal(ev.events.length, 1);
    t.end();
});

test("")