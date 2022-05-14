import test from 'tape';
import {Circle} from '../src/entities/circle.js';
import {_uuid} from '../src/entities/uuid.js';



test("uuid exist", (t) => {
    var c = new Circle(_uuid.generate());
    
    t.notEqual(c.uuid, undefined)
    t.end();
});

test("class circle instanciation without parameters", (t) => {
    var c = new Circle(_uuid.generate());

    t.equal(c.x, 0);
    t.equal(c.y, 0);
    t.equal(c.r, 5);
    t.end();
});

test("class circle instanciation with specific parameters", (t) => {
    var c = new Circle(_uuid.generate(), 2, 3, 6);

    t.equal(c.x, 2);
    t.equal(c.y, 3);
    t.equal(c.r, 6);
    t.end();
});

test("circle exist", (t) => {
    var c = new Circle(_uuid.generate(), 2, 3, 6);

    t.equal(c.c_svg, "");
    t.end();
});