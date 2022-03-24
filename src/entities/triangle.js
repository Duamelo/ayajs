const Forme = require("../abstraction/forme");

class Triangle extends Forme {
  constructor(p1, p2, p3) {
    super();
    this.point_1 = p1;
    this.point_2 = p2;
    this.point_3 = p3;
  }
}

module.exports = Triangle;
