import { _uuid } from "./uuid.js";
import { Point } from "./point.js";
import { Form } from "../abstraction/form.js";

/**
 * @class Triangle
 */

class Triangle extends Form {

  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, svg, event, config)
  {

    super();

    this.uuid = uuid;

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;


    this.x3 = x3;
    this.y3 = y3;

    this.events = {};
    
    this.nativeEvent = event;

    this.config = config;

    this.c_svg = "";
    this.svg = svg;

    this.type = "triangle";

    this.children = [];

    this.offsetX = 0;
    this.offsetY = 0;

    this.scaleX = 0;
    this.scaleY = 0;

    this.angle = 0;
    
    this.centerX = 0;
    this.centerY = 0;

    this.c_points = [
      new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
    ];

    this.vertex = [
        new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
        new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
        new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
        new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
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

  addChild(child, translate, rotate){  }


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

  setRotateCenter(centerX, centerY){
    this.centerX = centerX;
    this.centerY = centerY;
  }

  setRotateAngle(angle){
    this.angle = angle;
  }

  drawVertex(){
    if(this.vertex.length == 0)
      return;
  }

  drawConnector() {
    if(this.c_points.length == 0)
      return;
  }

  drawBox(){
  }


  draw() {
      
    const ns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(ns, "path");

    if(this.angle != 0){
      var _x1, _x2, _x3, _y1, _y2, _y3, _x, _y, dx, dy;

      _x1 = this.x1  * Math.cos(this.angle) - this.y1   * Math.sin(this.angle) ;
      _y1 = this.x1  * Math.sin(this.angle) + this.y1   * Math.cos(this.angle) ;

      _x2 = this.x2   * Math.cos(this.angle) - this.y2   * Math.sin(this.angle) ;
      _y2 = this.x2   * Math.sin(this.angle) + this.y2   * Math.cos(this.angle) ;

      _x3 = this.x3    * Math.cos(this.angle) - this.y3  * Math.sin(this.angle);
      _y3 = this.x3    * Math.sin(this.angle) + this.y3  * Math.cos(this.angle);

      _x = this.centerX  * Math.cos(this.angle) - this.centerY   * Math.sin(this.angle);
      _y = this.centerX  * Math.sin(this.angle) + this.centerY   * Math.cos(this.angle);

      dx = _x - this.centerX;
      dy = _y - this.centerY;

      this.p = "M " + (_x1 - dx + this.offsetX) +  "," + (_y1 - dy + this.offsetY) + " " + "L " + (_x2 - dx + this.offsetX) + "," + (_y2 - dy + this.offsetY) + " " + "L " + (_x3 - dx + this.offsetX) + "," + (_y3 - dy + this.offsetY) + " Z";
    }
    else
      this.p = "M " + (this.x1 + this.offsetX) +  "," + (this.y1 + this.offsetY) + " " + "L " + (this.x2 + this.offsetX) + "," + (this.y2 + this.offsetY) + " " + "L " + (this.x3 + this.offsetX) + "," + (this.y3 + this.offsetY) + " Z";

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", this.p);
    this.c_svg.setAttribute("fill", this.config.form.fill);
    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);


    this.svg.appendChild(this.c_svg);

    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
    this.addEvent("mouseup", this.nativeEvent.mouseUpCb);
    this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
    this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);

  }

  removeFromDOM(){
    this.svg.removeChild(this.c_svg);

    this.children.map(({child})=>{
      child.removeFromDOM();
    });
    
    this.c_points.map((pt)=>{
      pt.removeFromDOM();
    });

    this.vertex.map((vt)=>{
      vt.removeFromDOM();
    });
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
    if(this.angle != 0){
      var _x1, _x2, _x3, _y1, _y2, _y3, _x, _y, dx, dy;

      _x1 = this.x1  * Math.cos(this.angle) - this.y1   * Math.sin(this.angle) ;
      _y1 = this.x1  * Math.sin(this.angle) + this.y1   * Math.cos(this.angle) ;

      _x2 = this.x2   * Math.cos(this.angle) - this.y2   * Math.sin(this.angle) ;
      _y2 = this.x2   * Math.sin(this.angle) + this.y2   * Math.cos(this.angle) ;

      _x3 = this.x3    * Math.cos(this.angle) - this.y3  * Math.sin(this.angle);
      _y3 = this.x3    * Math.sin(this.angle) + this.y3  * Math.cos(this.angle);

      _x = this.centerX  * Math.cos(this.angle) - this.centerY   * Math.sin(this.angle);
      _y = this.centerX  * Math.sin(this.angle) + this.centerY   * Math.cos(this.angle);

      dx = _x - this.centerX;
      dy = _y - this.centerY;

      this.p = "M " + (_x1 - dx + this.offsetX) +  "," + (_y1 - dy + this.offsetY) + " " + "L " + (_x2 - dx + this.offsetX) + "," + (_y2 - dy + this.offsetY) + " " + "L " + (_x3 - dx + this.offsetX) + "," + (_y3 - dy + this.offsetY) + " Z";
    }
    else
      this.p = "M " + (this.x1 + this.offsetX) +  "," + (this.y1 + this.offsetY) + " " + "L " + (this.x2 + this.offsetX) + "," + (this.y2 + this.offsetY) + " " + "L " + (this.x3 + this.offsetX) + "," + (this.y3 + this.offsetY) + " Z";

  this.c_svg.setAttribute("d", this.p);
  }

  resize(pos, dx, dy) {
      if (pos == 0) {
        this.x1 = dx;
        this.y1 = dy;
        this.vertex[0].x = dx;
        this.vertex[0].y = dy;
      }
      else if (pos == 1) {
        this.x2 = dx;
        this.y2 = dy;
        this.vertex[1].x = dx;
        this.vertex[1].y = dy;
      }
      else if (pos == 2) {
        this.x3 = dx;
        this.y3 = dy;
        this.vertex[2].x = dx;
        this.vertex[2].y = dy;
      }
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
export { Triangle };
