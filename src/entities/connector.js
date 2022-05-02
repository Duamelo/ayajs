import { Point } from "./point.js";

class Connector {
  static create(type, uuid) {
    var cp = [];

    if (type == "rectangle") {
      cp = [];
      for (var i = 0; i < 4; i++) {
        cp.push(new Point(uuid, 0, 0));
      }
    } 
    else if (type == "triangle") {
      cp = [];
      for (var i = 0; i < 3; i++) {
        cp.push(new Point(uuid, 0, 0));
      }
    } 
    else if (type == "circle") {
      cp = [];
      cp.push(new Point(uuid, 0, 0));
    } 
    else if (type == "losange") {
      cp = [];
      for (var i = 0; i < 6; i++) {
        cp.push(new Point(uuid, 0, 0));
      }
    }
    return cp;
  }
}

export { Connector };
