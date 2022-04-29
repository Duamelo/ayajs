import { events } from "../events.js";
import { Connector } from "./connector.js";
/**
 * @class Circle
 */

class Circle {
  /**
   *
   * @param {string} uuid id
   * @param {number} x center abscissa
   * @param {number} y   center ordinate
   * @param {number} r radius of circle
   * @param {array} events   array of object events
   */

  constructor(uuid, x = 0, y = 0, r = 5, events = []) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
    this.r = r;
    this.events = events;
    this.c_svg = "";

    this.p_resizer = Connector.create("circle", uuid);
    this.drawResizer();
  }

  /**
   *
   * @param {DOMElement} svgs
   */

  draw(svgs) {
    var ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "circle");

    this.c_svg.setAttribute("cx", this.x);

    this.c_svg.setAttribute("cy", this.y);

    this.c_svg.setAttribute("r", this.r);

    this.c_svg.setAttribute("fill", "red");

    this.c_svg.setAttribute("stroke", "yellow");

    this.c_svg.setAttribute("stroke-width", "2.5");

    this.c_svg.setAttribute("id", this.uuid);

    svgs.appendChild(this.c_svg);

    this.p_resizer.map((p_resizer) => {
      p_resizer.draw(svgs);
    });

    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
  }

  drawResizer() {
    this.p_resizer[0].x = this.x + this.r;
    this.p_resizer[0].y = this.y;
    this.p_resizer[0].r = 5;
    console.log(this.p_resizer);
  }

  resize(deltaX) {
      // this.r += deltaX;
      // this.drawResizer();

    this.r += deltaX;
    if(this.r <= 20)
      this.r = 20;
    this.drawResizer();
    }
    

  redraw() {
    this.c_svg.setAttribute("cx", this.x);
    this.c_svg.setAttribute("cy", this.y);
    this.c_svg.setAttribute("r", this.r);

    this.p_resizer.map((p_resizer) => {
      p_resizer.redraw();
    });
  }
}

export { Circle };
