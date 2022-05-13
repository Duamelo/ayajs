import { Connector } from "./connector.js";
import { events } from "../events.js";
import { _uuid } from "./uuid.js";
import { EventManager } from "../eventManager.js";
import { _Register } from "../register.js";

/**
 * @class Triangle
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
  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, children = [], ratio = {}, zoom = false )
  {
    this.uuid = uuid;

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.x3 = x3;
    this.y3 = y3;

    this.events = new EventManager();

    this.c_svg = "";
    this.p = "";

    this.type = "triangle";
    this.ratio = ratio;
    this.zoom = zoom;

    this.children = [];

    this.c_points = Connector.create("triangle", this.uuid);
    this.vertex = Connector.create("triangle", this.uuid);

    this.createChildren(children);
    _Register.add(this);
  }

  draw(svgs) {
    const ns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(ns, "path");

    this.p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";


    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", this.p);
    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
    this.c_svg.setAttribute("fill", "lavenderblush");

    svgs.appendChild(this.c_svg);


    this.drawConnector();
    this.drawVertex();

    this.c_points.map((point) => {
      point.draw(svgs);
    });

    this.vertex.map((v) => {
      v.draw(svgs);
    });

    // this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
    // this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
    // this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
    // this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

    // this.events.create();
  }

  drawVertex(){
    this.vertex[0].x = this.x1;
    this.vertex[0].y = this.y1;
    this.vertex[0].r = 3;

    this.vertex[1].x = this.x2 ;
    this.vertex[1].y = this.y2 ;
    this.vertex[1].r = 3;

    this.vertex[2].x =  this.x3;
    this.vertex[2].y =  this.y3;
    this.vertex[2].r = 3;
  }

  drawConnector() {
    this.c_points[0].x = (this.x1 + this.x2) / 2;
    this.c_points[0].y = (this.y1 + this.y2) / 2;
    this.c_points[0].r = 3;

    this.c_points[1].x = (this.x2 + this.x3) / 2;
    this.c_points[1].y = (this.y2 + this.y3) / 2;
    this.c_points[1].r = 3;

    this.c_points[2].x = (this.x1 + this.x3) / 2;
    this.c_points[2].y = (this.y1 + this.y3) / 2;
    this.c_points[2].r = 3;
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
    this.p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";

    this.c_svg.setAttribute("d", this.p);

    this.c_points.map((p) => {
      p.redraw();
    });
    this.vertex.map((v) => {
      v.redraw();
    });
  }

  resize(pos, dx, dy, param = {}) {

    if(param.parent == "rectangle"){
      if(Object.keys(this.ratio).length > 0){

        (this.zoom == false) ? 
          this.shift(dx,dy):
        undefined ;
      }
    }
    else{
      if (pos == 0) {
        this.x1 = dx;
        this.y1 = dy;
        this.vertex[0].x = dx;
        this.vertex[0].y = dy;
        this.drawConnector();
      } 
      else if (pos == 1) {
        this.x2 = dx;
        this.y2 = dy;
        this.vertex[1].x = dx;
        this.vertex[1].y = dy;
        this.drawConnector();
      }
      else if (pos == 2) {
        this.x3 = dx;
        this.y3 = dy;
        this.vertex[2].x = dx;
        this.vertex[2].y = dy;
        this.drawConnector();
      }
  
    }
  }


  createChildren(children){
    children.map( (chd) => {

    });
  }
}
export { Triangle };
