import { events } from "../events.js";
import { _uuid } from "./uuid.js";
import { Point } from "./point.js";
import { config } from "../../config.js";

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
   */

  constructor(uuid, x = 0, y = 0, width = 10, height = 10) {

    this.uuid = uuid;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.events = {};

    this.c_svg = "";

    this.type = "rectangle";

    this.children = [];

    this.offsetX = 0;
    this.offsetY = 0;

    this.scaleX = 1;
    this.scaleY = 1;

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

  addEvent(event, callback){
    this.c_svg.addEventListener(event, callback);
    this.events[event] = callback;
  }

  deleteEvent(event){
    var callback = this.events[event];
    this.c_svg.removeEventListener(event, callback);
    delete this.events[event];
  }

  addChild(child, translate, rotate){
    child.setOffsetX(this.x);
    child.setOffsetY(this.y);
    translate(this, child);
    rotate(this, child);
    child.draw(svg);
    this.children.push({child, translate, rotate});
  }

  draw(svg) {
    const sv = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(sv, "rect");

    this.c_svg.setAttributeNS(null, "x", this.x +  this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y +  this.offsetY);
    this.c_svg.setAttributeNS(null, "id", this.uuid);
    this.c_svg.setAttributeNS(null, "height", this.height * this.scaleY);
    this.c_svg.setAttributeNS(null, "width", this.width * this.scaleX);
    this.c_svg.setAttributeNS(null, "stroke", config.form.stroke);
    this.c_svg.setAttributeNS(null, "stroke-width", config.form.strokeWidth);
    this.c_svg.setAttributeNS(null, "fill", config.form.fill);


    svg.appendChild(this.c_svg);


    this.drawConnector();
    this.drawVertex();

    this.c_points.map((point) => {
      point.draw(svg);
    });

    this.vertex.map((point) => {
      point.draw(svg);
    });

    this.addEvent("mousedown", events.mouseDownCb);
    this.addEvent("mouseup", events.mouseUpCb);
    this.addEvent("mouseover", events.mouseMoveCb);
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
    if(this.vertex.length == 0)
      return;
    
    this.vertex[0].x = this.x + this.offsetX;
    this.vertex[0].y = this.y + this.offsetY;

    this.vertex[1].x = this.x + this.offsetX + this.width * this.scaleX;
    this.vertex[1].y = this.y + this.offsetY ;

    this.vertex[2].x = this.x + this.offsetX + this.width  * this.scaleX;
    this.vertex[2].y = this.y + this.offsetY + this.height * this.scaleY;

    this.vertex[3].x = this.x + this.offsetX;
    this.vertex[3].y = this.y + this.offsetY + this.height * this.scaleY;
  }

  drawConnector() {
    if(this.c_points.length == 0)
      return;
    
    this.c_points[0].x = this.x +  this.offsetX  + (this.width / 2) * this.scaleX;
    this.c_points[0].y = this.y + this.offsetY ;

    this.c_points[1].x = this.x +  this.offsetX + this.width * this.scaleX;
    this.c_points[1].y = this.y + this.offsetY  + (this.height / 2) * this.scaleY;

    this.c_points[2].x = this.x + this.offsetX  + (this.width / 2) * this.scaleX;
    this.c_points[2].y = this.y + this.offsetY  + (this.height) * this.scaleY;

    this.c_points[3].x = this.x + this.offsetX ;
    this.c_points[3].y = this.y + this.offsetY + (this.height / 2) * this.scaleY;
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
    this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
    this.c_svg.setAttributeNS(null, "height", this.height * this.scaleY);
    this.c_svg.setAttributeNS(null, "width", this.width * this.scaleX);

    this.drawVertex();
    this.drawConnector();

    this.c_points.map((p) => {
      p.redraw();
    });

    this.vertex.map((p) => {
      p.redraw();
    });

    this.children.map ( ({child, translate, rotate}) => {
        translate(this, child);
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

      this.children.map( ({child, translate, rotate}) => {
        translate(this, child);
        rotate(this, child);
        child.redraw();
      })
  }


  optimalPath(line){
    var _x, _y;
    var a = (line.dest_y - line.y)/(line.dest_x - line.x);
    var b = line.y - a * line.x;

    for (var i = 0; i <= 3; i++){
        if(i % 2 == 0){
            _y = this.vertex[i].y;
            _x = (_y - b)/a;
        }
        else{
            _x = this.vertex[i].x;
            _y = a * _x + b;
        }

        if( (_x == line.x && _y == line.y) || (_x == line.dest_x && _y == line.dest_y))
          continue;

          if(((i == 0 &&  _x > this.vertex[i].x && _x < this.vertex[i+1].x) &&
              (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
              ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) ||
           ((i == 1 &&  _y > this.vertex[i].y && _y < this.vertex[i+1].y) &&
              (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
              ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) || 
           ((i == 2 &&  _x > this.vertex[i+1].x && _x < this.vertex[i].x) &&
              (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  )|| 
              ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ))) ||
           ((i == 3 &&  _y >= this.vertex[0].y && _y <= this.vertex[i].y) &&
              (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
              ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) ) )) {
            return this.c_points[i];
           }
      }
    return null;
  }

}
export { Rectangle };
