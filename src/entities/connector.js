import { Point } from "./point.js";

class Connector {
  static create(type, uuid) {
    var cp = [];

    if (type == "rectangle") {
      cp = [];
      for (var i = 0; i < 4; i++) {
        cp.push(new Point(uuid, 0, 0));
      }
    } else if (type == "triangle") {
      cp = [];
      for (var i = 0; i < 3; i++) {
        cp.push(new Point(uuid, 0, 0));
      }
    }
    return cp;
  }
}

export { Connector };
