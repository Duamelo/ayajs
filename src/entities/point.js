import {events} from "../events.js";
import {_Register} from "../register.js";
import {_uuid} from "./uuid.js";

/**
 *
 * @class Point
 * @param {number} x
 * @param {number} y
 *
 */
class Point {
  constructor(uuid, x = 0, y = 0, r = 3) {

    this.ref = uuid;
    this.uuid = _uuid.generate();

    this.x = x;
    this.y = y;
    this.r = r;

    _Register.add(this);
  }

  draw(svgs) {
    var ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "circle");

    this.c_svg.setAttribute("cx", this.x);

    this.c_svg.setAttribute("cy", this.y);

    this.c_svg.setAttribute("r", this.r);

    // this.c_svg.setAttribute("class", "vertex");

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
    // this.c_svg.addEventListener("mousemove", events.mouseMoveCb);
    this.c_svg.addEventListener("mouseup", events.mouseUpCb);

    svgs.appendChild(this.c_svg);
  }

  shift(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  redraw() {
    this.c_svg.setAttribute("cx", this.x);

    this.c_svg.setAttribute("cy", this.y);
  }
}

export  {Point};
