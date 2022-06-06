import { EventManager } from "../eventManager.js";
import { events } from "../events.js";
import { Point } from "./point.js";
import { _uuid } from "./uuid.js";

/**
 * @class Losange
 */


class Losange {

/**
 * 
 * @param {string} uuid 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 */

  constructor(uuid, x = 0, y = 0, width = 10, height = 30)
  {
      this.uuid = uuid;

      this.x = x;
      this.y = y;

      this.width = width;
      this.height =  height;

      this.events = new EventManager();

      this.c_svg = "";
      this.box = "";

      this.type = "losange";
      this.p = "";

      this.scaleX = 1;
      this.scaleY = 1;

      this.offsetX = 0;
      this.offsetY = 0;
  
      this.angle = 0;

      this.centerX = 0;
      this.centerY = 0;

      this.children = [];

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

  addChild(child, translate, rotate){
    child.setOffsetX(this.x);
    child.setOffsetY(this.y);
    translate(this, child);
    rotate(this, child);
    child.draw(svg);
    this.children.push({child, translate, rotate});
  }


  drawVertex(){
    if(this.vertex.length == 0)
      return;

    this.vertex[0].x = this.x + this.offsetX - (this.width / 2 * this.scaleX) ;
    this.vertex[0].y = this.y + this.offsetY;

    this.vertex[1].x = this.x + this.offsetX +  (this.width / 2 * this.scaleX);
    this.vertex[1].y = this.y + this.offsetY;

    this.vertex[2].x = this.x + this.offsetX + (this.width/2 * this.scaleX);
    this.vertex[2].y = this.y + this.offsetY + this.height * this.scaleY;

    this.vertex[3].x = this.x + this.offsetX - (this.width/2  * this.scaleX);
    this.vertex[3].y = this.y + this.offsetY + (this.height * this.scaleY);
  }

  drawConnector() {
    if(this.c_points.length == 0)
      return;
    
    this.c_points[0].x = this.x + this.offsetX;
    this.c_points[0].y = this.y + this.offsetY;

    this.c_points[1].x = this.x + this.offsetX + (this.width/2 * this.scaleX);
    this.c_points[1].y = this.y + this.offsetY + (this.height/2 * this.scaleY);

    this.c_points[2].x = this.x + this.offsetX;
    this.c_points[2].y = this.y + this.offsetY + (this.height * this.scaleY);

    this.c_points[3].x = this.x + this.offsetX - (this.width/2 * this.scaleX);
    this.c_points[3].y = this.y + this.offsetY + (this.height/2 * this.scaleY);
  }

  draw(svg) {
    const ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "path");
    this.box = document.createElementNS(ns, "path");

    this.redraw();

    this.box.setAttribute("id", this.uuid);
    this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
    this.box.setAttributeNS(null, "stroke-width", "1px");
    this.box.setAttributeNS(null, "fill", "none");
    this.box.setAttribute("stroke-dasharray", "4");

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", this.p);
    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
    this.c_svg.setAttribute("fill", "lavenderblush");

    svg.appendChild(this.c_svg);
    svg.appendChild(this.box);
    
    this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
    this.events.add(this.c_svg, "mouseup", events.mouseUpCb);

    this.events.create();
  }

  redraw() {

    if(this.angle != 0){
      var __x, __y, _x, _y, dx, dy;

      __x = this.x  * Math.cos(this.angle) - this.y   * Math.sin(this.angle) ;
      __y = this.x  * Math.sin(this.angle) + this.y   * Math.cos(this.angle) ;


      _x = this.centerX  * Math.cos(this.angle) - this.centerY   * Math.sin(this.angle);
      _y = this.centerX  * Math.sin(this.angle) + this.centerY   * Math.cos(this.angle);

      dx = _x - this.centerX;
      dy = _y - this.centerY;

      this.p = `M ${__x - dx + this.offsetX} ${__y - dy + this.offsetY}  L ${__x - dx  + this.offsetX + (this.width/2 * this.scaleX)} ${__y - dy + this.offsetY + (this.height/2 * this.scaleY)}  L ${__x - dx + this.offsetX} ${ __y - dy + this.offsetY + (this.height * this.scaleY)}  L ${ __x - dx + this.offsetX - (this.width/2 * this.scaleX)} ${ __y - dy + this.offsetY + (this.height/2 * this.scaleY)}Z`;
    }
    else
      this.p = `M ${this.x + this.offsetX} ${this.y + this.offsetY}  L ${this.x + this.offsetX + (this.width/2 * this.scaleX)} ${this.y + this.offsetY + (this.height/2 * this.scaleY)}  L ${this.x + this.offsetX} ${this.y + this.offsetY + (this.height * this.scaleY)}  L ${this.x + this.offsetX - (this.width/2 * this.scaleX)} ${this.y + this.offsetY + (this.height/2 * this.scaleY)}Z`;

    this.drawVertex();
    this.drawConnector();
    this.drawBox();

    this.c_svg.setAttribute("d",this.p);

    this.c_points.map((p) => {
        p.redraw();
      });

      this.vertex.map((v) => {
      v.redraw();
    });

    this.children.map( ({child, translate, rotate}) => {
      translate(this, child);
      rotate(this, child);
      child.redraw();
    })
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

  drawBox(){

    /* dessin du contour de la forme sous forme de carré */
    if(this.c_points.length == 0 || this.vertex.length == 0)
      return;
    
    var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
              L ${this.c_points[0].x } ${this.c_points[0].y} 
              L ${this.vertex[1].x }   ${this.vertex[1].y} 
              L ${this.c_points[1].x } ${this.c_points[1].y}
              L ${this.vertex[2].x }   ${this.vertex[2].y}
              L ${this.c_points[2].x } ${this.c_points[2].y} 
              L ${this.vertex[3].x }   ${this.vertex[3].y} 
              L ${this.c_points[3].x } ${this.c_points[3].y} Z`;

    this.box.setAttribute("d", p);
  }

  shift(dx, dy) {
    this.x += dx;
    this.y += dy;

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

export { Losange };