const Triangle = require("../src/entities/triangle_equilateral.js");
const Point = require("../src/entities/types/point.js");

const test = require("tape");
test("have 3 parameters of type point to have necessary information for triangle creation", (t) => {
  const p1 = new Point(11, 2);
  const p2 = new Point(12, 6);
  const p3 = new Point(4, 9);

  const triangle = new Triangle(p1, p2, p3);
  t.equal(triangle.point_1 instanceof Point, true);
  t.equal(triangle.point_2 instanceof Point, true);
  t.equal(triangle.point_3 instanceof Point, true);
  t.end();
});
