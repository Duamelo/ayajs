import { Events } from "../events.js";
import { Component } from "../component.js";

/**
 *  Class representing a rectangle form.
 * 
 * @class
 * 
 * @classdesc The rectangle object draws a rectangular shape in the Dom element svg.
 * 
 */

class Rectangle extends Component{

  /**
   * Create a rectangular shape.
   * @param { Number } x - The abscissa of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } y - The ordinate of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } width - The width of the rectangular shape.
   * @param { Number } height - The height of the rectangular shape.
   * @param { Number } id - The id of the rectangular shape.
   * @param { Boolean } save - Boolean that tell if the shape should be recorded in _Register.
   */
    constructor(x = 100, y = 100, width = 200, height = 300, isdrawing = true, save = true, id, config) {
      super({uuid: id, isSave: save, config: config});

      this.x = x;
      this.y = y;

      this.width = width;
      this.height = height;

      this.type = "rectangle";
      if (isdrawing)
        this.draw();
}


  arroundCorners(rx = 3, ry = 3){
    this.c_svg.setAttributeNS(null, "rx", rx);
    this.c_svg.setAttributeNS(null, "ry", ry);
  }

  /**
   * @description
   * 
   */
  draw() {
    const sv = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(sv, "rect");

    this.c_svg.setAttributeNS(null, "id", this.uuid);
    this.c_svg.setAttributeNS(null, "x", this.x +  this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y +  this.offsetY);
    this.c_svg.setAttributeNS(null, "width", this.width * this.scaleX);
    this.c_svg.setAttributeNS(null, "height", this.height * this.scaleY);
    this.c_svg.setAttributeNS(null, "fill", this.config.shape.fill);
    this.c_svg.setAttributeNS(null, "stroke", this.config.shape.stroke);
    this.c_svg.setAttributeNS(null, "stroke-width", this.config.shape.strokeWidth);

    this.svg.appendChild(this.c_svg);

    this.drawConnector();
    this.drawVertex();

    this.c_points.map((point) => {
      point.draw();
    });

    this.vertex.map((point) => {
      point.draw();
    });

    this.children.map(({child}) =>{
      child.draw();
    });

    this.addEvent("mousedown", (e) => {
      Events.mousedowncb(e, this.config)
    });
    this.addEvent("mouseleave", (e) => {
        Events.mouseleavecb(e, this.config);
    });
    this.addEvent("mouseover", (e) => {
        Events.mouseovercb(e, this.config);
    });
  }

  /**
   * @description
   * The drawVertex function simply calculates the position of each vertex according to the specificity of the shape.
   */
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

  /**
   * @description
   * The drawConnector function simply calculates the position of each
   * connection point according to the specificity of the shape.
   * 
   * @returns { void }
   */
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

  /**
   * @description
   * The shift function allows to apply a decalage of the shape during the mousemove or the resize.
   * 
   * @param { Number } dx
   * @param { Number } dy 
   */

  shift(dx, dy) {
    this.x += dx;
    this.y += dy;

    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((p) => {
      p.shift(dx, dy);
    });

    this.children.map(({child}) => {
      child.shift(dx, dy);
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

    this.children.map(({child}) => {
        child.redraw();
    });
  }

  /**
   * To resize a shape, we base it on the position of the top on which the
   * mousedown was triggered, and the offsets dx and dy.
   */
  resize(pos, dx, dy) {

      if (pos == 0) {

        this.shift(dx, dy);  
   
        this.width += -dx;
        this.height += -dy;
  
      } 
      else if (pos == 1) {
        this.shift(0, dy);

        this.width += dx;
        this.height += -dy;
      } 
      else if (pos == 2) {
        this.width += dx;
        this.height += dy;  
      } 
      else if (pos == 3) {
        this.shift(dx, 0);

        this.width += -dx;
        this.height += dy;
      }

      if(this.width < this.config.shape.limitWidth)
        this.width = this.config.shape.limitWidth;

      if(this.height < this.config.shape.limitHeight)
        this.height = this.config.shape.limitHeight;

      /**
       * After resizing, we redraw the children.
       */
      this.children.map(({child}) => {
        child.redraw();
      })
  }

}
export { Rectangle };
