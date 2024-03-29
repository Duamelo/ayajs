import { Events } from "../events.js";
import { Component } from "../component.js";

/**
 * @class Lozenge
 */
class Lozenge extends Component{

/**
 * 
 * @param {string} uuid 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 */
  constructor(x = 0, y = 0, width = 10, height = 30, isdrawing = true, save = true, id = undefined, config)
  {
    super({uuid: id, isSave: save, config: config});
  
      this.x = x;
      this.y = y;

      this.width = width;
      this.height =  height;

      this.box = "";

      this.type = "lozenge";
      this.p = "";
      if (isdrawing)
        this.draw();
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

  draw() {
    const ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "path");
    this.box = document.createElementNS(ns, "path");

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

    this.vertex.map((v) => {
      v.draw();
    });

    this.c_points.map((p) => {
        p.draw();
    });

    this.box.setAttribute("id", this.uuid);
    this.box.setAttributeNS(null, "fill", this.config.box.fill);
    this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
    this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
    this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", this.p);
    this.c_svg.setAttribute("fill", this.config.shape.fill);
    this.c_svg.setAttributeNS(null, "stroke", this.config.shape.stroke);
      this.c_svg.setAttributeNS(null, "stroke-width", this.config.shape.strokeWidth);
      
      this.addEvent("mousedown", (e) => {
      Events.mousedowncb(e, this.config);
      });
      this.addEvent("mouseleave", (e) => {
          Events.mouseleavecb(e, this.config);
      });
      this.addEvent("mouseover", (e) => {
          Events.mouseovercb(e, this.config);
      });
      this.svg.appendChild(this.c_svg);
      this.svg.appendChild(this.box);
  }
    
  removeBoxFromDOM(){
    this.svg.removeChild(this.box);
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

    this.vertex.map((v) => {
      v.redraw();
    });

    this.c_points.map((p) => {
        p.redraw();
      });

    this.children.map(({child}) => {
      child.redraw();
    });

    this.addEvent("mousedown", (e) => {
      Events.mousedowncb(e)
    });
   
    this.addEvent("mouseleave", (e) => {
        Events.mouseleavecb(e);
    });
    this.addEvent("mouseover", (e) => {
        Events.mouseovercb(e);
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

    if(this.width < this.config.shape.limitWidth)
      this.width = this.config.shape.limitWidth;

     if(this.height < this.config.shape.limitHeight)
      this.height = this.config.shape.limitHeight;


    this.children.map(({child}) => {
      child.redraw();
    });
  }

  drawBox(){
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

    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((v) => {
      v.shift(dx, dy);
    });

    this.children.map ( ({child}) => {
      child.shift(dx, dy);
    }); 
  }
}

export { Lozenge };
