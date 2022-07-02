import { Form } from "../abstraction/form.js";
import { _uuid } from "./uuid.js";
import { Point } from "./point.js";

/**
 *  Class representing a rectangle form.
 * 
 * @class
 * 
 * @classdesc The rectangle object draws a rectangular shape in the Dom element svg.
 * 
 */

class Rectangle extends Form {

  /**
   * Create a rectangular shape.
   * 
   * @param { String } uuid - The unique id of the shape in the svg.
   * @param { Number } x - The abscissa of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } y - The ordinate of the beginning of the shape drawing, located at the left end of the navigator.
   * @param { Number } width - The width of the rectangular shape.
   * @param { Number } height - The height of the rectangular shape.
   */
  constructor(uuid, x = 0, y = 0, width = 10, height = 10, svg, event, config) {

    super();

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

    this.nativeEvent = event;

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
    this.svg = svg;

    this.type = "rectangle";

    /**
     * @description
     * A table listing all children of the form.
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
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
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
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
      new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
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
   * @description
   * We can build any shape by adding to a basic component children form.
   * 
   * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This form ( @extend Form) is added 
   * as a child to a component with a form.
   * @param { Function } translate - { parent, child } This function allows us to position the child relative to its parent.
   * @param {Function } rotate  - { parent, child } This function allows us to apply a rotation of the child taking into 
   * account its relative position and the center of rotation.
   */
  addChild(child, translate, rotate){
    child.setOffsetX(this.x);
    child.setOffsetY(this.y);
    translate(this, child);
    rotate(this, child);
    child.draw();
    this.children.push({child, translate, rotate});
  }


  /**
   * @description
   * 
   */
  draw() {
    const sv = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(sv, "rect");

    this.c_svg.setAttributeNS(null, "x", this.x +  this.offsetX);
    this.c_svg.setAttributeNS(null, "y", this.y +  this.offsetY);
    this.c_svg.setAttributeNS(null, "id", this.uuid);
    this.c_svg.setAttributeNS(null, "height", this.height * this.scaleY);
    this.c_svg.setAttributeNS(null, "width", this.width * this.scaleX);
    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
    this.c_svg.setAttributeNS(null, "fill", this.config.form.fill);


    this.svg.appendChild(this.c_svg);


    this.drawConnector();
    this.drawVertex();

    this.c_points.map((point) => {
      point.draw();
    });

    this.vertex.map((point) => {
      point.draw();
    });

    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
    this.addEvent("mouseup", this.nativeEvent.mouseUpCb);
    this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
    this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);
  }

  removeFromDOM(){
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

      if(this.width < this.config.form.limitWidth)
        this.width = this.config.form.limitWidth;

      if(this.height < this.config.form.limitHeight)
        this.height = this.config.form.limitHeight;

      /**
       * After resizing, we redraw the children and apply translation or rotation if necessary.
       */
      this.children.map( ({child, translate, rotate}) => {
        translate(this, child);
        rotate(this, child);
        child.redraw();
      })
  }


  /**
   * 
   * @param { Line } line - It represents an instance of line form.
   * @returns 
   */
  optimalPath(line){
    var _x, _y;
    /**
     * We determine the equation of the line passed as a parameter.
     * @var { Number } a - The slope of the line.
     * @var { Number } b - The ordinate at the origin.
     */
    var a = (line.dest_y - line.y)/(line.dest_x - line.x);
    var b = line.y - a * line.x;


    /**
     * A basic shape has 4 vertices.
     * And the vertices are indexed from 0 to 3, starting with the top left extremity and counting clockwise.
     * The equation is determined on each side of the form. _y = a * _x + b
     * The junction points of the line and forms are not important.
     * We use a and b of the line to calculate _x or _y because this is the possible intersection point of the
     * line and a specific side of the form.
     * We check that the top point belongs to the segment of the form and the line segment.
     * In addition, we base on the slope of the line to locate more precisely the correct intersection.
     * We finally return the corresponding connection point.
     */
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
              ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) ) )
        ){
            return this.c_points[i];
        }
    }
    return null;
  }
}
export { Rectangle };