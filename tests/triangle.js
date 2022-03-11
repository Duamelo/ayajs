var Triangle = require("../src/entities/triangle.js");

const test = require("tape");

test("verify if carre class have attribute to get dimension from constructor ", (assert) => {
  param = 0;
  form_triangle = new Triangle(param);
  assert.equal(form_triangle.dim, param, "number one and two is not same");
  assert.end();
});
