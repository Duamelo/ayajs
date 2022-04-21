const t = require("tap");
const Circle = require("../src/entities/circle");
const uuid = require("../src/entities/uuid");



t.test("uuid exist", (t) => {
    var c = new Circle(uuid.generate());
    
    t.not(c.uuid, undefined)
    t.end();
});

t.test("class circle instanciation without parameters", (t) => {
    var c = new Circle(uuid.generate());

    t.equal(c.x, 0);
    t.equal(c.y, 0);
    t.equal(c.r, 5);
    t.end();
});

t.test("class circle instanciation with specific parameters", (t) => {
    var c = new Circle(uuid.generate(), 2, 3, 6);

    t.equal(c.x, 2);
    t.equal(c.y, 3);
    t.equal(c.r, 6);
    t.end();
});

t.test("circle exist", (t) => {
    var c = new Circle(uuid.generate(), 2, 3, 6);

    t.equal(c.circle, "");
    t.end();
});