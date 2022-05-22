import { EventManager } from "../eventManager.js";
import { events } from "../events.js";
import { Point } from "./point.js";
import { _uuid } from "./uuid.js";

/**
 * @class Losange
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

    constructor(uuid, x1 = 0, y1 = 0, x2 = 0, y2 = 0)
    {
        this.uuid = uuid;

        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.x3 = this.x1;
        this.y3 = this.y1 + (this.y2 - this.y1)*2;

        this.x4 = this.x1 - (this.x2 - this.x1);
        this.y4 = this.y2;

        this.h_diagonal = this.x2 - this.x4;
        this.v_diagonal = this.y3 - this.y1;

        this.c_svg = "";
        this.box = "";
        this.type = "losange";


        this.children = [];

        this.events = new EventManager();
        
        this.c_points = [
          new Point(this.uuid,0,0),
          new Point(this.uuid,0,0),
          new Point(this.uuid,0,0),
          new Point(this.uuid,0,0),
        ];

        this.vertex = [
          new Point(this.uuid, 0, 0),
          new Point(this.uuid, 0, 0),
          new Point(this.uuid, 0, 0),
          new Point(this.uuid, 0, 0),
        ];

    }

  draw(svgs) {
    const ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "path");
    this.box = document.createElementNS(ns, "path");

    var p = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2} L ${this.x3} ${this.y3} L ${this.x4} ${this.y4} Z`;

    this.box.setAttribute("id", this.uuid);
    this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
    this.box.setAttributeNS(null, "stroke-width", "1px");
    this.box.setAttributeNS(null, "fill", "none");
    this.box.setAttribute("stroke-dasharray", "4");

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", p);
    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
    this.c_svg.setAttribute("fill", "lavenderblush");

    svgs.appendChild(this.c_svg);
    svg.appendChild(this.box);

    this.drawVertex();
    this.drawConnector();

    this.c_points.map((point) => {
        point.draw(svgs);
      });

    this.vertex.map((v) => {
        v.draw(svgs);
      });
    
    this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
    this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
    this.events.add(this.c_svg, "mouseover", events.mouseOverCb);

    this.events.create();
  }

  drawVertex(){
    this.vertex[0].x = this.x1 - ( (this.x2 - this.x4) / 2);
    this.vertex[0].y = this.y1;

    this.vertex[1].x = this.x1 + ( (this.x2 - this.x4) / 2);
    this.vertex[1].y = this.y1;

    this.vertex[2].x = this.x2;
    this.vertex[2].y = this.y3;

    this.vertex[3].x = this.x4;
    this.vertex[3].y = this.y3;
  }

  drawConnector() {
    this.c_points[0].x = this.x1;
    this.c_points[0].y = this.y1;

    this.c_points[1].x = this.x2;
    this.c_points[1].y = this.y2;

    this.c_points[2].x = this.x3;
    this.c_points[2].y = this.y3;

    this.c_points[3].x = this.x4;
    this.c_points[3].y = this.y4;
  }

  resize(pos, dx, dy, param = {}) {

    if(Object.keys(param).length > 0){

    }
    else {
      if(pos == 0){
        this.x1 += dx;
        this.y1 += dy;

        this.x3 = this.x1;
        this.y3 = this.y1 + (this.y2 - this.y1)*2;

        this.x4 = this.x1 - (this.x2 - this.x1);
        this.y4 = this.y2;
      }
      else if(pos == 1){

        this.x1 += dx;
        this.y1 += dy;

        this.x3 = this.x1;
        this.y3 = this.y1 + (this.y2 - this.y1)*2;

        this.x2 = this.x1 + (this.x1 - this.x4);
        this.y2 = this.y4;
      }
      else if(pos == 2){
        this.x1 += dx;
        this.y1 += -dy;

        this.x3 = this.x1;
        this.y3 = this.y1 + (this.y2 - this.y1)*2;

        this.x2 = this.x1 + (this.x1 - this.x4);
        this.y2 = this.y4;
      }
      else if(pos == 3){
        this.x1 += dx;
        this.y1 += -dy;

        this.x3 = this.x1;
        this.y3 = this.y1 + (this.y2 - this.y1)*2;

        this.x4 = this.x1 - (this.x2 - this.x1);
        this.y4 = this.y2;
      }
    }
  }

  redraw() {

    var p = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2} L ${this.x3} ${this.y3} L ${this.x4} ${this.y4} Z`;

    this.drawVertex();
    this.drawConnector();
    this.drawBox();

    this.c_svg.setAttribute("d", p);

    this.c_points.map((p) => {
        p.redraw();
      });
      this.vertex.map((v) => {
        v.redraw();
      });
  }

  drawBox(){

    /* dessin du contour de la forme sous forme de carré */

    var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
              L ${this.c_points[0].x} ${this.c_points[0].y} 
              L ${this.vertex[1].x}   ${this.vertex[1].y} 
              L ${this.c_points[1].x} ${this.c_points[1].y}
              L ${this.vertex[2].x}   ${this.vertex[2].y}
              L ${this.c_points[2].x} ${this.c_points[2].y} 
              L ${this.vertex[3].x}   ${this.vertex[3].y} 
              L ${this.c_points[3].x} ${this.c_points[3].y} Z`;

    this.box.setAttribute("d", p);
  }

  shift(dx, dy) {
    this.x1 += dx;
    this.y1 += dy;

    this.x2 += dx;
    this.y2 += dy;

    this.x3 += dx;
    this.y3 += dy;

    this.x4 += dx;
    this.y4 += dy;

    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((v) => {
      v.shift(dx, dy);
    });
  }

  createChildren(children){
    children.map( (chd) => {

    });
  }

}

export { Losange };