var test = require('tape');
const Triangle = require('../src/entities/triangle');
const uuid = require('../src/maths/uuid');


test("uuid exist", (t) => {
  var tr = new Triangle(uuid.generate());

  t.notEqual(tr.uuid, undefined);
  t.end();
});


test("class triangle instanciation without parameters", (t) => {
  var tr = new Triangle(uuid.generate());

  t.equal(tr.x1, 0);
  t.equal(tr.y1, 0);
  t.equal(tr.x2, 5);
  t.equal(tr.y2, 5);
  t.equal(tr.x3, 10);
  t.equal(tr.y3, 10);
  t.equal(tr.events.length, 0);
  t.end();
});

test("class triangle instanciation with parameters", (t) => {
  var tr = new Triangle(uuid.generate(), 12,12,20,20,50,50, [{ev: null, cb: null}]);

  t.equal(tr.x1, 12);
  t.equal(tr.y1, 12);
  t.equal(tr.x2, 20);
  t.equal(tr.y2, 20);
  t.equal(tr.x3, 50);
  t.equal(tr.y3, 50);
  t.equal(tr.events.length, 1);
  t.end();
});

test("path variable exist", (t) => {
  var tr = new Triangle(uuid.generate(), 12,12,20,20,50,50);

  t.equal(tr.path, "");
  t.end();
});