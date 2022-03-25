var test = require("tape");
const Circle = require("../src/entities/circle");



test("class circle instanciation", (t) => {
    var c = new Circle();

    t.equal(c.cx, 0);
    t.equal(c.cy, 0);
    t.equal(c.radius, 5);
    t.end();
});

test("class circle instanciation with specific parameters", (t) => {
    var c = new Circle(2, 3, 6);

    t.equal(c.cx, 2);
    t.equal(c.cy, 3);
    t.equal(c.radius, 6);
    t.end();
});