import { Connector } from "./connector.js";
import { events } from "../events.js";
import { Point } from "./point.js";
import { _uuid } from "./uuid.js";
/**
 * @class Losange class
 */


class Losange {

    /**
     * @param {string} uuid
     * @param {abscissa starting point} x1
     * @param {ordonne starting point} y1
     * @param {LineTo this abscisse point}x2
     * @param {LineTo this ordonne point} y2
     * @param {LineTo this abscisse point}x3
     * @param {LineTo this ordonne point} y3
     * @param {LineTo this ordonne point} x4
     * @param {LineTo this ordonne point} y4
     * @param {array of object} events
     */

    constructor(uuid, x1 = 200, y1 = 300, x2 = 100, y2 = 400, x3 = 200, y3 = 500, x4 = 300, y4 = 400, events = [] )
    {
        this.uuid = uuid;

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.x3 = x3;
        this.y3 = y3;

        this.x4 = x4;
        this.y4 = y4;

        this.c_svg = "";
        this.p = "";
        this.horizontal_diagonal_center;
        this.vertical_diagonal_center;

        this.events = events;
        
        this.c_points = Connector.create("losange", uuid);
        this.vertex = [
            new Point(this.uuid, this.x1, this.y1, 5),
            new Point(this.uuid, this.x2, this.y2, 5),
            new Point(this.uuid, this.x3, this.y3, 5),
            new Point(this.uuid, this.x4, this.y4, 5),
        ];
        this.drawConnector();
    }


    
  draw(svgs) {
    const ns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(ns, "path");

    this.p = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2} L ${this.x3} ${this.y3} L ${this.x4} ${this.y4} Z`;
     

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

  drawVertex(){
    this.vertex[0].x = this.x1;
    this.vertex[0].y = this.y1;

    this.vertex[1].x = this.x2;
    this.vertex[1].y = this.y2;

    this.vertex[2].x = this.x3;
    this.vertex[2].y = this.y3;

    this.vertex[3].x = this.x4;
    this.vertex[3].y = this.y4;
  }

  drawConnector() {
    this.c_points[0].x = (this.x1 + this.x2) / 2;
    this.c_points[0].y = (this.y1 + this.y2) / 2;
    this.c_points[0].r = 5;

    this.c_points[1].x = (this.x2 + this.x3) / 2;
    this.c_points[1].y = (this.y2 + this.y3) / 2;
    this.c_points[1].r = 5;

    this.c_points[2].x = (this.x3 + this.x4) / 2;
    this.c_points[2].y = (this.y3 + this.y4) / 2;
    this.c_points[2].r = 5;

    this.c_points[3].x = (this.x4 + this.x1) / 2;
    this.c_points[3].y = (this.y4 + this.y1) / 2;
    this.c_points[3].r = 5;

    this.c_points[4].x = (this.x2 + this.x4) / 2;
    this.c_points[4].y = (this.y2 + this.y4) / 2;
    this.c_points[4].r = 5;

    this.c_points[5].x = (this.x1 + this.x3) / 2;
    this.c_points[5].y = (this.y1 + this.y3) / 2;
    this.c_points[5].r = 5;
  }

  resize(pos, delta) {
      if(pos == 3) {
        this.x4   +=  delta;
        this.x2   -=  delta;
        this.y1   -=  delta;
        this.y3   +=  delta;
        this.drawVertex();
        this.drawConnector();
      }
      else if(pos == 0){
        this.y1   +=  delta;
        this.x2   +=  delta;
        this.y3   -=  delta;
        this.x4   -=  delta;
        this.drawVertex();
        this.drawConnector();
      } 
      else if(pos == 2) {
        this.y1   -=  delta;
        this.x2   -=  delta;
        this.y3   +=  delta;
        this.x4   +=  delta;
        this.drawVertex();
        this.drawConnector();
      }else if(pos == 1){
        this.x4   -=  delta;
        this.x2   +=  delta;
        this.y1   +=  delta;
        this.y3   -=  delta;
        this.drawVertex();
        this.drawConnector();
      }

  }

  redraw() {
    this.p = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2} L ${this.x3} ${this.y3} L ${this.x4} ${this.y4} Z`;

    this.c_svg.setAttribute("d", this.p);

    this.c_points.map((p) => {
        p.redraw();
      });
      this.vertex.map((v) => {
        v.redraw();
      });
  }

}

export { Losange };