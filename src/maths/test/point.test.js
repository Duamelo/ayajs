var test = require("tape");
const Point = require("../point");



test("class Point instanciation", (t) => {
    var p1 = new Point();

    t.equal(p1.x, 0);
    t.equal(p1.y, 0);
    t.end();
});

test("class Point instanciation with specific coordinate", (t) => {
    var p = new Point(4, 6);

    t.equal(p.x, 4);
    t.equal(p.y, 6);
    t.end();
});

test("add point to another point", (t) => {
    var p1 = new Point(2,4);
    var p2 = new Point(5,6);
    p1.add(p2);
   
    t.equal(p1.x, 7);
    t.equal(p1.y, 10);
    t.end();
});

test("add scalar to a specific point", (t) => {
    var p = new Point(4, 12);

    p.addScalar(5);

    t.equal(p.x, 9);
    t.equal(p.y, 17);
    t.end();
});


test("substract scalar to a specific point", (t) => {
    var p = new Point(3, 2);

    p.subScalar(2);

    t.equal(p.x, 1);
    t.equal(p.y, 0);
    t.end();
});


test("substract two point", (t) => {
    var p1 = new Point(10, 25);
    var p2 = new Point(1, 2);

    p1.substract(p2);

    t.equal(p1.x, 9);
    t.equal(p1.y, 23);
    t.end();
})


test("scale a point", (t) => {
    var p = new Point(5, 8);

    p.putScale(0.5);

    t.equal(p.x, 2.5);
    t.equal(p.y, 4);
    t.end();
});


test("multiply two points", (t) => {
    var p1 = new Point(1,9);
    var p2 = new Point(5, 6);

    p1.multiplyBy(p2);

    t.equal(p1.x, 5);
    t.equal(p1.y, 54);
    t.end();
});


test("copy the content of another Point to this one", (t) => {
    var p =  new Point();
    var p2 = new Point(4, 16);
    
    p.copy(p2);

    t.equal(p.x, 4);
    t.equal(p.y, 16);
    t.end();
});


test("clone one point based on another", (t) => {
    var p = new Point(4, 6);

    var c_p = p.clone();

    t.equal(c_p.x, p.x);
    t.equal(c_p.y, p.y);
    t.end();
});

