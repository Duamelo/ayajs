import {Connector} from "./connector.js";
import {events} from "../events.js";
import {_uuid} from "./uuid.js";
// import jsdom from "jsdom";
// const { JSDOM } = jsdom;
// var document = new JSDOM(`<!DOCTYPE html>`).window.document;

/**
 * Rectangle class
 */

class Rectangle {
  /**
   *
   * @param {string} uuid
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {array of object} events
   */

  constructor(uuid, x = 0, y = 0, width = 10, height = 10, events = []) {
    this.uuid = uuid;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.events = events;
    this.c_svg = "";

    this.c_points = Connector.create("rectangle", uuid);
    this.vertex = Connector.create("rectangle", uuid);
    this.drawConnector();
    this.drawVertex();
  }

  draw(svgs) {
    const svgns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(svgns, "rect");

    this.c_svg.setAttributeNS(null, "x", this.x);
    this.c_svg.setAttributeNS(null, "y", this.y);
    this.c_svg.setAttributeNS(null, "id", this.uuid);
    this.c_svg.setAttributeNS(null, "height", this.height);
    this.c_svg.setAttributeNS(null, "width", this.width);
    this.c_svg.setAttributeNS(null, "stroke", "black");
    this.c_svg.setAttributeNS(null, "stroke-width", "3px");
    this.c_svg.setAttributeNS(null, "fill", "cornsilk");

    svgs.appendChild(this.c_svg);

    this.c_points.map((point) => {
      point.draw(svgs);
    });

    this.vertex.map((point) => {
      point.draw(svgs);
    });

    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
    this.c_svg.addEventListener("mouseup", events.mouseUpCb);
    this.c_svg.addEventListener("mouseover", events.mouseOverCb);
    this.c_svg.addEventListener("mouseleave", events.mouseLeaveCb);
  }

  drawVertex(){

    this.vertex[0].x = this.x;
    this.vertex[0].y = this.y; 


    this.vertex[1].x = this.x + this.width;
    this.vertex[1].y = this.y; 

    this.vertex[2].x = this.x + this.width;
    this.vertex[2].y = this.y + this.height; 


    this.vertex[3].x = this.x;
    this.vertex[3].y = this.y + this.height;
  }

  drawConnector() {
    this.c_points[0].x = this.x + this.width / 2;
    this.c_points[0].y = this.y;

    this.c_points[1].x = this.x + this.width;
    this.c_points[1].y = this.y + this.height / 2;

    this.c_points[2].x = this.x + this.width / 2;
    this.c_points[2].y = this.y + this.height;

    this.c_points[3].x = this.x;
    this.c_points[3].y = this.y + this.height / 2;
  }


  shift(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((p) => {
      p.shift(dx, dy);
    });
  }


  redraw() {
    this.c_svg.setAttribute("x", this.x);
    this.c_svg.setAttribute("y", this.y);
    this.c_svg.setAttributeNS(null, "height", this.height);
    this.c_svg.setAttributeNS(null, "width", this.width);

    this.c_points.map((p) => {
      p.redraw();
    });

    this.vertex.map((p) => {
      p.redraw();
    });
  }


  resize(pos, dx, dy){
    if(pos == 0){
      this.shift(dx, dy);

      this.width += -dx;
      this.height += -dy;

      this.drawVertex();
      this.drawConnector();

    }
    else if(pos == 1){
      this.y += dy;

      this.width += dx;
      this.height += -dy;

      this.drawVertex();
      this.drawConnector();

    }
    else if(pos == 2){
      this.width += dx;
      this.height += dy;

    
      this.drawVertex();
      this.drawConnector();

    }
    else if(pos == 3){

      this.x += dx;

      this.width += -dx;
      this.height += dy;


      this.drawVertex();
      this.drawConnector();
    }
  }
}

export {Rectangle};
