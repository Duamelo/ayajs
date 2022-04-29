import { Connector } from "./connector.js";
import { events } from "../events.js";
import { Point } from "./point.js";
import { _uuid } from "./uuid.js";
/**
 * @class Triangle class
 */

class Triangle {
  /**
   *
   * @param {string} uuid
   * @param {abscissa starting point} x1
   * @param {ordonne starting point} y1
   * @param {LineTo this abscissa point} x2
   * @param {LineTo this ordonne point} y2
   * @param {LineTo this abscissa point} x3
   * @param {LineTo this ordonne point} y3
   * @param {array of object} events
   */
  constructor(
    uuid,
    x1 = 0,
    y1 = 0,
    x2 = 5,
    y2 = 5,
    x3 = 10,
    y3 = 10,
    events = []
  ) {
    this.uuid = uuid;

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.x3 = x3;
    this.y3 = y3;

    this.events = events;
    this.c_svg = "";
    this.p = "";

    this.c_points = Connector.create("triangle", uuid);
    this.vertex = [
      new Point(this.uuid, this.x1, this.y1, 5),
      new Point(this.uuid, this.x2, this.y2, 5),
      new Point(this.uuid, this.x3, this.y3, 5),
    ];
    this.drawConnector();
  }

  draw(svgs) {
    const ns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(ns, "path");

    this.p =
      "M " +
      this.x1 +
      "," +
      this.y1 +
      " " +
      "L " +
      this.x2 +
      "," +
      this.y2 +
      " " +
      "L " +
      this.x3 +
      "," +
      this.y3 +
      " Z";

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", this.p);
    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
    this.c_svg.setAttribute("fill", "lavenderblush");

    svgs.appendChild(this.c_svg);

    this.c_points.map((point) => {
      point.draw(svgs);
    });

    this.vertex.map((v) => {
      v.draw(svgs);
    });

    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
    this.c_svg.addEventListener("mouseup", events.mouseUpCb);
    this.c_svg.addEventListener("mouseover", events.mouseOverCb);
    this.c_svg.addEventListener("mouseleave", events.mouseLeaveCb);
  }

  drawConnector() {
    this.c_points[0].x = (this.x1 + this.x2) / 2;
    this.c_points[0].y = (this.y1 + this.y2) / 2;
    this.c_points[0].r = 5;

    this.c_points[1].x = (this.x2 + this.x3) / 2;
    this.c_points[1].y = (this.y2 + this.y3) / 2;
    this.c_points[1].r = 5;

    this.c_points[2].x = (this.x1 + this.x3) / 2;
    this.c_points[2].y = (this.y1 + this.y3) / 2;
    this.c_points[2].r = 5;
  }

  shift(dx, dy) {
    this.x1 += dx;
    this.y1 += dy;

    this.x2 += dx;
    this.y2 += dy;

    this.x3 += dx;
    this.y3 += dy;

    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((v) => {
      v.shift(dx, dy);
    });
  }

  redraw() {
    this.p =
      "M " +
      this.x1 +
      "," +
      this.y1 +
      " " +
      "L " +
      this.x2 +
      "," +
      this.y2 +
      " " +
      "L " +
      this.x3 +
      "," +
      this.y3 +
      " Z";

    this.c_svg.setAttribute("d", this.p);

    this.c_points.map((p) => {
      p.redraw();
    });
    this.vertex.map((v) => {
      v.redraw();
    });
  }

  resize(pos, dx, dy) {
    //console.log(dx + "---" + dy);
    if (pos == 0) {
      this.x1 = dx;
      this.y1 = dy;
      this.vertex[0].x = dx;
      this.vertex[0].y = dy;
      this.drawConnector();
      //console.log(this.vertex[0].x);
    } else if (pos == 1) {
      this.x2 = dx;
      this.y2 = dy;
      this.vertex[1].x = dx;
      this.vertex[1].y = dy;
      this.drawConnector();
    } else if (pos == 2) {
      this.x3 = dx;
      this.y3 = dy;
      this.vertex[2].x = dx;
      this.vertex[2].y = dy;
      this.drawConnector();
    }
  }
}

export { Triangle };
