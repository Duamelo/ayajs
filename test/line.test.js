var test = require('tape');
const Line = require('../src/entities/line');
const uuid = require('../src/entities/uuid');



test("uuid exist", (t) => {
    var ln = new Line(uuid.generate());

    t.notEqual(ln.uuid, undefined);
    t.end();
});

test("class line instanciation without parameters", (t) => {
    var ln = new Line(uuid.generate());

    t.equal(ln.x, 0);
    t.equal(ln.y, 0);
    t.equal(ln.events.length, 0);
    t.end();
});


test("class line instanciation with parameters", (t) => {
    var ln = new Line(uuid.generate(), 16, 32, [{ev: null, cb: null}]);

    t.equal(ln.x, 16);
    t.equal(ln.y, 32);
    t.equal(ln.events.length, 1);
    t.end();
});

test("path exist", (t) => {
    var ln = new Line(uuid.generate(), 16, 32, [{ev: null, cb: null}]);

    t.equal(ln.path, "");
    t.end();
})
