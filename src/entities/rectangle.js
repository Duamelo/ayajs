import { events } from "../events.js";
import { _uuid } from "./uuid.js";
import { EventManager } from "../eventManager.js";
import { Point } from "./point.js";

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

  constructor(uuid, x = 0, y = 0, width = 10, height = 10) {

    this.uuid = uuid;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.events = new EventManager();

    this.c_svg = "";

    this.type = "rectangle";

    this.children = [];

    this.offsetX = 0;
    this.offsetY = 0;

    this.scaleX = 0;
    this.scaleY = 0;

    this.angle = 0;
    this.centerX = 0;
    this.centerY = 0;


    this.c_points = [
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
    ];

    this.vertex = [
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
      new Point(this.uuid, 0, 0),
    ];
  }


  addChild(child, scale, rotate){
    scale(this, child);
    rotate(this, child);
    child.setOffsetX(this.x);
    child.setOffsetY(this.y);
    child.draw(svg);
    this.children.push({child, scale, rotate});
  }

  draw(svgs) {
    const svgns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(svgns, "rect");

    this.c_svg.setAttributeNS(null, "x", this.x + this.scaleX + this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y + this.scaleY + this.offsetY);
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

  setRotateCenter(centerX, centerY){
    this.centerX = centerX;
    this.centerY = centerY;
  }

  setRotateAngle(angle){
    this.angle = angle;
  }

  setOffsetX(x){
    this.offsetX = x;
  }

  setOffsetY(y){
    this.offsetY = y;
  }

  setScaleX(x){
    this.scaleX = x;
  }

  setScaleY(y){
    this.scaleY = y;
  }

  getOffsetX(){
    return this.offsetX;
  }

  getOffsetY(){
    return this.offsetY;
  }

  getScaleX(){
    return this.scaleX;
  }

  getScaleY(){
    return this.scaleY;
  }

  getWidth(){
    return this.width;
  }

  getHeight(){
    return this.height;
  }


  drawVertex(){
    this.vertex[0].x = this.x + this.offsetX + this.scaleX;
    this.vertex[0].y = this.y + this.offsetY + this.scaleY;

    this.vertex[1].x = this.x + this.offsetX + this.scaleX + this.width;
    this.vertex[1].y = this.y + this.offsetY + this.scaleY;

    this.vertex[2].x = this.x + this.offsetX + this.scaleX + this.width;
    this.vertex[2].y = this.y + this.offsetY + this.scaleY + this.height;

    this.vertex[3].x = this.x + this.offsetX + this.scaleX ;
    this.vertex[3].y = this.y + this.offsetY + this.scaleY + this.height;
  }

  drawConnector() {
    this.c_points[0].x = this.x +  this.offsetX + this.scaleX + this.width / 2;
    this.c_points[0].y = this.y + this.offsetY + this.scaleY;

    this.c_points[1].x = this.x +  this.offsetX + this.scaleX + this.width;
    this.c_points[1].y = this.y + this.offsetY + this.scaleY + this.height / 2;

    this.c_points[2].x = this.x + this.offsetX + this.scaleX + this.width / 2;
    this.c_points[2].y = this.y + this.offsetY + this.scaleY + this.height;

    this.c_points[3].x = this.x + this.offsetX + this.scaleX;
    this.c_points[3].y = this.y + this.offsetY + this.scaleY + this.height / 2;
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
    // console.log(this);
    this.c_svg.setAttributeNS(null, "x", this.x + this.scaleX + this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y + this.scaleY + this.offsetY);
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

    this.children.map ( ({child, scale, rotate}) => {
        scale(this, child);
        rotate(this, child);
        child.redraw();
    });
  }

  resize(pos, dx, dy) {

      if (pos == 0) {

        this.shift(dx, dy);
  
        this.width += -dx;
        this.height += -dy;
  
      } 
      else if (pos == 1) {
  
        this.y += dy;
  
        this.width += dx;
        this.height += -dy;
  
      } 
      else if (pos == 2) {
  
        this.width += dx;
        this.height += dy;
  
      } 
      else if (pos == 3) {
  
        this.x += dx;
  
        this.width += -dx;
        this.height += dy;
  
      }

      this.children.map( ({child, scale, rotate}) => {
        scale(this, child);
        rotate(this, child);
        child.redraw();
      })
  }



}
export { Rectangle };
