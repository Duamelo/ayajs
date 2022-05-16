import { Connector } from "./connector.js";
import { events } from "../events.js";
import { _uuid } from "./uuid.js";
import { FactoryForm } from "../factoryForm.js";
import { EventManager } from "../eventManager.js";
import { _Register } from "../register.js";

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
   * @param {array of object} children 
   * @param {object} ratio 
   */

  constructor(uuid, x = 0, y = 0, width = 10, height = 10, children = [], ratio = {}, zoom = false) {

    this.uuid = uuid;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.events = new EventManager();

    this.c_svg = "";

    this.type = "rectangle";
    this.children = [];
    this.ratio = ratio;
    this.zoom = zoom;


    this.c_points = Connector.create("rectangle", this.uuid);
    this.vertex = Connector.create("rectangle", this.uuid);

    this.createChildren(children);
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


    this.drawConnector();
    this.drawVertex();

    this.c_points.map((point) => {
      point.draw(svgs);
    });

    this.vertex.map((point) => {
      point.draw(svgs);
    });


    this.children.map((child) => {
      child.draw(svgs);
    });

    this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
    this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
    this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
    this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

    this.events.create();

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

    this.drawVertex();
    this.drawConnector();

    this.c_points.map((p) => {
      p.redraw();
    });

    this.vertex.map((p) => {
      p.redraw();
    });

    this.children.map ( (child) => {
        child.redraw()
    })
  }

  resize(pos, dx, dy, param = {} ) {

    if(Object.keys(param).length > 0 && !this.zoom && Object.keys(this.ratio).length > 0){
        this.x = param.x + (this.ratio.x * param.width);
        this.y = param.y + (this.ratio.y * param.height);
        this.width = this.ratio.width * param.width;
        this.height = this.ratio.height * param.height;
    }
    else{
      if (pos == 0) {

        this.shift(dx, dy);
  
        this.width += -dx;
        this.height += -dy;
  
        this.children.map ( (child) => {
            child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
        });
      } 
      else if (pos == 1) {
  
        this.y += dy;
  
        this.width += dx;
        this.height += -dy;
  
        this.children.map ( (child) => {
          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
        });
      } 
      else if (pos == 2) {
  
        this.width += dx;
        this.height += dy;
  
        this.children.map ( (child) => {
          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
        });
      } 
      else if (pos == 3) {
  
        this.x += dx;
  
        this.width += -dx;
        this.height += dy;
  
        this.children.map ( (child) => {
          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
        });
      }
    }
  }


  createChildren(children){
    children.map( (chd) => {
      if(chd.type == "circle"){
        var abs = this.x +  (chd.ratio.x * this.width);
        var ord = this.y + (chd.ratio.y * this.height);
        var rayon = (chd.ratio.r * this.width);
        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x: abs, y: ord, r: rayon},[], chd.ratio, chd.zoom);
        this.children.push(child);
      }
      else if(chd.type == "rectangle"){
        var _x = this.x + (chd.ratio .x * this.width);
        var _y = this.y + (chd.ratio.y * this.height);
        var _width = chd.ratio.width * this.width;
        var _height = chd.ratio.height * this.height ;
        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x: _x, y: _y, width: _width, height: _height}, [], chd.ratio, chd.zoom);
        this.children.push(child);
      }
      else if(chd.type == "triangle"){
        var _x1 = this.x + (chd.ratio.p1.x * this.width);
        var _y1 = this.y + (chd.ratio.p1.y * this.height); 
      
        var _x2 = this.x + (chd.ratio.p2.x * this.width);
        var _y2 = this.y + (chd.ratio.p2.y * this.height); 

        var _x3 = this.x + (chd.ratio.p3.x * this.width);
        var _y3 = this.y + (chd.ratio.p3.y * this.height); 

        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x1: _x1, y1: _y1, x2: _x2, y2: _y2, x3: _x3, y3: _y3}, [], chd.ratio, chd.zoom);
        this.children.push(child);
      }
      else if(chd.type == "losange"){
        
      }
    });
  }
}
export { Rectangle };
