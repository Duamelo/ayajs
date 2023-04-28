import { _uuid } from "../uuid.js";
import { Point } from "./point.js";
import { Shape } from "../abstraction/shape.js";
import { config } from "../../config.js";
import { Events } from "../events.js";

/**
 *  Class representing a rectangle form.
 * 
 * @class
 * 
 * @classdesc The rectangle object draws a rectangular shape in the Dom element svg.
 * 
 */

class Rectangle extends Shape{

  /**
   * Create a rectangular shape.
   * @param { Number } x - The abscissa of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } y - The ordinate of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } width - The width of the rectangular shape.
   * @param { Number } height - The height of the rectangular shape.
   */
    constructor(uuid, x = 100, y = 100, width = 200, height = 300) {
      super();

      if (typeof x != "number")
	  throw new Error("x must be a number");
      if (typeof y != "number")
	  throw new Error("y must be a number");

      this.uuid = uuid;

      this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    /**
     * @description
     * Dictionary object to record events and their respective callbacks associated with the form.
     * 
     * @type { Object }
     */
    this.events = {};

    this.config = config;

    /**
     * @description
     * Represents the svg dom element created.
     * 
     * @type { String }
     */
    this.c_svg = "";

    /**
     * @description
     * 
     * @type { DomElement}
     */
    this.svg = this.config.svg;

    this.type = "rectangle";

    /**
     * @description
     * A table listing all children of the shape.
     * 
     * @type { Array.<(Form | null)>}
     */
    this.children = [];


    /**
     * @description
     * The offsetX represents the x-offset to be applied to the rectangle.
     * to position it at {this. x + this.offSetX} on the x-axis.
     * 
     @type { Number }
     */
     this.offsetX = 0;

    /**
     * @description
     * The offsetY represents the y-offset to be applied to the rectangle.
     * to position it at {this. y + this.offSetX} on the y-axis.
     * 
     @type { Number }
     */
    this.offsetY = 0;


    /**
     * @description
     * The ScaleX represents the scale to be applied to the size of the
     * shape on the x-axis.
     * 
     * @type { Number }
     */
    this.scaleX = 1;


    /**
     * @description
     * The ScaleX represents the scale to be applied to the size of the
     * shape on the x-axis.
     * 
     * @type { Number }
     */
    this.scaleY = 1;



    /**
     * @description
     * .This variable represents the value of the rotation angle to be
     *  applied to rotate the shape.
     * 
     * @type { Number } - The angle is given in radian.
     */
    this.angle = 0;


    /**
     * @description
     * The center of rotation is defined by defining centerX.
     * 
     * @type { Number } - centerX
     */
    this.centerX = 0;

    /**
     * @description
     * The center of rotation is defined by defining centerY.
     * 
     * @type { Number } - centerY
     */
    this.centerY = 0;


    /**
     * @description
     * The variable c_points represents all the connection 
     * points of the form. These are the points from which one 
     * can establish a link with other forms having also these 
     * connection points.
     * 
     * @type { Array<(Point | Null)> }
     */
    this.c_points = [
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
    ];

    /**
     * 
     * @description
     * The vertex variable represents the set of points from 
     * which we can resize the shape.
     * 
     * @type { Array<(Point | Null)> }
     */
    this.vertex = [
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
      new Point(this.uuid, 0, 0, 5),
    ];
  }


  /**
   * @description 
   * This method allows us to add an event to this form.
   * We record the event and the associated callback for easy removal after.
   * 
   * @param { String } event - the event
   * @param { Function } callback - {} This callback is either defined by the user when
   * adding other custom events, or a callback already defined in event.js.
   */
  addEvent(event, callback){
    this.c_svg.addEventListener(event, callback);
    this.events[event] = callback;
  }


  /**
   * *@description
   * This method allows us to delete a specific event passed as a string parameter.
   * 
   * @param { String } event - The event.
   */
  deleteEvent(event){
    var callback = this.events[event];
    this.c_svg.removeEventListener(event, callback);
    delete this.events[event];
  }

  /**
   * *@description
   * This method allows us to delete all events defined on the c_svg property.
   */
  deleteAllEvents(){
    Object.keys(this.events).map((event) => {
      this.deleteEvent(event);
    });
  }

  setStyles(o){
    if (o.fill)
      this.c_svg.setAttribute("fill", o.fill);
    if (o.stroke)
      this.c_svg.setAttribute("stroke", o.stroke);
    if (o.strokewidth)
      this.c_svg.setAttribute("stroke-width", o.strokewidth);
    if (o.fillopacity)
      this.c_svg.setAttribute("fill-opacity", o.fillopacity);
    if (o.strokeopacity)
      this.c_svg.setAttribute("stroke-opacity", o.strokeopacity);
      if (o.strokedasharray)
      this.c_svg.setAttribute("stroke-dasharray", o.strokedasharray);
    if (o.strokedashoffset)
      this.c_svg.setAttribute("stroke-dashoffset", o.strokedashoffset);
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
    this.c_svg.setAttributeNS(null, "fill", this.config.form.fill);
    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);

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
      Events.mousedowncb(e)
    });
    this.addEvent("mouseleave", (e) => {
        Events.mouseleavecb(e);
    });
    this.addEvent("mouseover", (e) => {
        Events.mouseovercb(e);
    });
  }

  makeHiddenCpoints(){
    this.c_points.map((pt) => {
      pt.c_svg.setAttribute("fill", "none");
    });
  }

  makeVisibleCpoints(){
    this.c_points.map((pt) => {
      pt.c_svg.setAttribute("fill", "black");
    });
  }

  makeHiddenVertex(){
    this.vertex.map((vt) => {
      vt.c_svg.setAttribute("fill", "none");
    });
  }

  makeVisibleVertex(){
    this.vertex.map((vt) => {
      vt.c_svg.setAttribute("fill", "black");
    });
  }

  removeChildren(){
    this.children.map(({child}) => {
        child.removeFromDOM();
    });
  }
    
  removeFromDOM(){
    this.c_points.map((pt)=>{
      pt.removeFromDOM();
    });
    this.vertex.map((vt)=>{
      vt.removeFromDOM();
    });
    this.children.map(({child}) => {
      child.removeFromDOM();
    });
    this.svg.removeChild(this.c_svg);
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

      if(this.width < this.config.form.limitWidth)
        this.width = this.config.form.limitWidth;

      if(this.height < this.config.form.limitHeight)
        this.height = this.config.form.limitHeight;

      /**
       * After resizing, we redraw the children.
       */
      this.children.map( ({child, translate, rotate}) => {
        child.redraw();
      })
  }

}
export { Rectangle };
