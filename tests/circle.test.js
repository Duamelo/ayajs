var test = require("tape");
const Circle = require("../src/entities/circle");



/**
 * HUB uuid class
 */

class _uuid
{

    constructor()
    {

    }

    generate()
    {
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
}


global.Uuid = new _uuid();


test("class circle instanciation", (t) => {
    var c = new Circle(Uuid.generate());

    t.equal(c.x, 0);
    t.equal(c.y, 0);
    t.equal(c.r, 5);
    t.end();
});

test("class circle instanciation with specific parameters", (t) => {
    var c = new Circle(Uuid.generate(), 2, 3, 6);

    t.equal(c.x, 2);
    t.equal(c.y, 3);
    t.equal(c.r, 6);
    t.end();
});