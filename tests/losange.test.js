 const { test } = require("tape");
 var Losange = require("../src/entities/losange");
const Point = require("../src/entities/types/point.js");


test("first pX1 coordinate should be equals {0,0}", t =>{
    let obj = new Losange({x:0, y:0});
    // var point = new point(10,20);


    t.plan(2)
    t.equal(0, obj.points.pX1.x);
    t.equal(0, obj.points.pX1.y);
    t.end();
});

test("second pX2 coordinate losange should be equals {10,10}", t =>{
    let obj =new Losange({x:50, y:0}, {x:10, y:10});
    // var point = new point(10,20);


    t.plan(2)
    t.equal(10, obj.points.pX2.x);
    t.equal(10, obj.points.pX2.y);
    t.end();
});


test("have 4 parameters of type point to have necessary information for losange creation", (t) => {
  const p1 = new Point(11, 2);
  const p2 = new Point(12, 6);
  const p3 = new Point(4, 9);
  const p4 = new Point(9, 20);

  const Losange = new Losange(p1, p2, p3, p4);
  t.equal(Losange.points.pX1 instanceof Point, true);
  t.equal(Losange.points.pX2 instanceof Point, true);
  t.equal(Losange.points.pX3 instanceof Point, true);
  t.equal(Losange.points.pX4 instanceof Point, true);
  t.end();
});



