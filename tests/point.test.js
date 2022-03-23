const Point = require("../src/entities/types/point.js");
//require("../tests/triangle_equilateral.test").Point;
const test = require("tape");

test("verify if my class Point have two attributes define set from constructor", (t) => {
  const point = new Point(10, 12);

  //il va trouver que c'est egal donc c'est pas bon pour moi je dois corriger pour qu'il
  //trouve qu'ils ne sont pas effectivement egaux
  t.notEqual(typeof point.abscisse, "undefined");
  t.notEqual(typeof point.ordonnee, "undefined");
  t.end();
});
