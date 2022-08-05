(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.aya = {}));
})(this, (function (exports) { 'use strict';

	var config =  {
	    svg : {
	        fill : "white",
	    },
	    form : {
	        stroke : "black",
	        fill : "white",
	        strokeOpacity : "1",
	        strokeWidth : "1px",
	        fillOpacity : "1",
	        limitWidth: 20,
	        limitHeight: 20
	    },

	    arc : {
	        stroke : "black",
	        fill : "white",
	        strokeOpacity : "1",
	        strokeWidth : "1px",
	        fillOpacity : "1",
	        limitWidth: 20,
	        limitHeight: 20
	    },

	    box : {
	        stroke : "black",
	        strokeWidth : "1px",
	        fill : "none",
	        strokeDasharray : "4"
	    },

	    point : {
	        fill  : "black",
	        strokeWidth : "1pt",
	        radius : 3,
	    },

	    line : {
	        fill : "black",
	        ends : {
	            start : { type : "circle"},
	            dest : { type : "triangle"}
	        }
	    },

	    text : {
	        fill : "black",
	        fillOpacity : "100",
	        stroke : "black",
	        strokeWidth : "0.5pt",
	        strokeOpacity : 100,
	        strokeDasharray : 10.5,
	        strokeDashoffset : 10.5,
	    }
	};

	var store = {};

	class _Register
	{
	    static add(object) {
	        store[object.uuid] = object;
	    }

	    static find(uuid){
	        return store[uuid];
	    }

	    static clear(uuid){
	        delete store[uuid];
	    }
	    
	    static findAllLink(component){
	        var result = [];
	        Object.keys(store).map((id) => {
	            var obj = _Register.find(id);
	            if(obj.type == "link"){
	                if(component.uuid == obj.source.ref || component.uuid == obj.destination.ref)
	                    result.push(obj);
	            }
	        });
	        return result;
	    }

	    static findAllComponents(){
	        var result = [];
	        Object.keys(store).map((id) => {
	            var obj = _Register.find(id);
	            if(obj instanceof Component)
	                result.push(obj);
	        });
	        return result;
	    }
	}

	class _uuid
	{
	    static generate()
	    {
	        return Math.random().toString(36).substring(2, 15) +
	        Math.random().toString(36).substring(2, 15);
	    }
	}

	/**
	 *
	 * @class Point
	 * @param {number} x
	 * @param {number} y
	 *
	 */

	class Point {
	  constructor(uuid, x = 0, y = 0, r = 5, svg, event, config) {

	    this.ref = uuid;
	    this.uuid = _uuid.generate();

	    this.x = x;
	    this.y = y;
	    this.r = r;

	    this.scale = 1;

	    this.events = {};
	    this.nativeEvent = event;
	    this.config = config;

	    this.type = "point";

	    this.c_svg = "";
	    this.svg = svg;

	    _Register.add(this);
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
	 
	  setScale(sc){
	    this.scale = sc;
	  }

	  getScale(){
	    return this.scale;
	  }

	  draw() {
	    var ns = "http://www.w3.org/2000/svg";

	    this.c_svg = document.createElementNS(ns, "circle");

	    this.c_svg.setAttribute("id", this.uuid);

	    this.c_svg.setAttribute("cx", this.x);

	    this.c_svg.setAttribute("cy", this.y);

	    this.c_svg.setAttribute("r", this.config.point.radius * this.scale);

	    // this.c_svg.setAttribute("class", "point");
	    this.c_svg.setAttribute("class", "hidden_point");

	    
	    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    this.addEvent("mouseover", (e)=>{
	      this.r += 4;
	      this.c_svg.setAttribute("r", this.r);
	    });
	    this.addEvent("mouseleave", (e)=>{
	      this.r = this.config.point.radius;
	      this.c_svg.setAttribute("r", this.r);
	    });

	    this.svg.appendChild(this.c_svg);
	  }

	  removeFromDOM(){
	    this.svg.removeChild(this.c_svg);
	  }

	  shift(dx, dy) {
	    this.x += dx;
	    this.y += dy;
	  }

	  redraw() {
	    this.c_svg.setAttribute("cx", this.x);
	    this.c_svg.setAttribute("cy", this.y);
	    this.c_svg.setAttribute("r", this.config.point.radius * this.scale);
	  }
	}

	/**
	 * Abstract class representing a generic prototype for all forms
	 * 
	 * @abstract 
	 * 
	 * @class Form
	 *  
	 */
	class Form
	{
	    addEvent(event, callback) {

	    };

	    deleteEvent(event){

	    }

	    addChild(child, translate, rotate){

	    }

	    setOffsetX(x){
	        
	    }

	    setOffsetY(y){

	    }

	    setScaleX(x){

	    }

	    setScaleY(y){

	    }

	    getOffsetX(){

	    }

	    getOffsetY(){

	    }

	    getScaleX(){

	    }

	    getScaleY(){

	    }

	    setRotateCenter(centerX, centerY){

	    }

	    setRotateAngle(angle){

	    }


	    drawVertex(){

	    }

	    drawConnector() {

	    }

	    drawBox(){

	    }

	    draw(svg){

	    };

	    removeFromDOM(){

	    }


	    redraw(){

	    };

	    shift(dx, dy){

	    }

	    resize(pos, dx, dy){

	    };

	    optimalPath(line){

	    };
	}

	/**
	 * @class Circle
	 */
	class Circle extends Form {
	    /**
	     * 
	     * @param {string} uuid 
	     * @param {number} x 
	     * @param {number} y 
	     * @param {number} r 
	     */
	    constructor(uuid, x = 0, y = 0, r = 5, svg, event, config){

	        super();

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;
	        this.r = r;

	        this.events = {};

	        this.nativeEvent = event;

	        this.config = config;

	        this.box = "";

	        this.c_svg = "";

	        this.svg = svg;

	        this.type = "circle";

	        this.scale = 1;

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.angle = 0;
	  
	        this.children = [];
	      
	        this.c_points = [
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config)
	        ];

	        this.vertex = [
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid,0, 0, 3, this.svg, this.nativeEvent, this.config)
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

	    addChild(child, translate = null, rotate = null, drawing = false){
	        if(translate != null)
	            translate(this, child);
	        if(rotate != null)
	            rotate(this, child);
	        if(drawing == true)
	            child.draw();
	        this.children.push({child, translate, rotate});
	    }
	  
	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	        this.vertex[0].x = this.x + this.offsetX - this.r * this.scale;
	        this.vertex[0].y = this.y + this.offsetY - this.r * this.scale;
	    
	        this.vertex[1].x = this.x + this.offsetX + this.r * this.scale;
	        this.vertex[1].y = this.y + this.offsetY - this.r * this.scale;

	        this.vertex[2].x = this.x + this.offsetX + this.r * this.scale;
	        this.vertex[2].y = this.y + this.offsetY + this.r * this.scale;
	    
	        this.vertex[3].x = this.x + this.offsetX - this.r * this.scale;
	        this.vertex[3].y = this.y + this.offsetY + this.r * this.scale;
	    }
	    
	    drawConnector() {
	        if(this.c_points.length == 0)
	            return;
	        this.c_points[0].x = this.x + this.offsetX;
	        this.c_points[0].y = this.y + this.offsetY - this.r * this.scale;

	        this.c_points[1].x = this.x + this.offsetX + this.r * this.scale;
	        this.c_points[1].y = this.y + this.offsetY;

	        this.c_points[2].x = this.x + this.offsetX;
	        this.c_points[2].y = this.y + this.offsetY + this.r * this.scale;

	        this.c_points[3].x = this.x + this.offsetX - this.r * this.scale;
	        this.c_points[3].y = this.y + this.offsetY;
	    }

	    drawBox(){
	        if(this.vertex.length > 0 && this.c_points.length >0){
	            var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
            L ${this.c_points[0].x} ${this.c_points[0].y} 
            L ${this.vertex[1].x}   ${this.vertex[1].y} 
            L ${this.c_points[1].x} ${this.c_points[1].y}
            L ${this.vertex[2].x}   ${this.vertex[2].y}
            L ${this.c_points[2].x} ${this.c_points[2].y} 
            L ${this.vertex[3].x}   ${this.vertex[3].y} 
            L ${this.c_points[3].x} ${this.c_points[3].y} Z`;

	            this.box.setAttribute("d", p);
	        }
	    }
	    
	    draw(){
	        var ns="http://www.w3.org/2000/svg";

	        this.box = document.createElementNS(ns, "path");
	        this.c_svg = document.createElementNS(ns,"circle");

	        this.c_svg.setAttribute("id", this.uuid);

	        this.c_svg.setAttribute("cx", (this.x + this.offsetX));

	        this.c_svg.setAttribute("cy", (this.y + this.offsetY));

	        this.c_svg.setAttribute("r", (this.r * this.scale));
	        

	        this.c_svg.setAttribute("fill", this.config.form.fill);

	        this.c_svg.setAttribute("stroke", this.config.form.stroke);

	    
	        this.c_svg.setAttribute("stroke-width", this.config.form.strokeWidth);
	    
	      
	        /** draw box */
	        this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
	        this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
	        this.box.setAttributeNS(null, "fill", this.config.box.fill);
	        this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

	        
	        this.svg.appendChild(this.c_svg);
	        this.svg.appendChild(this.box);

	        this.drawVertex();
	        this.drawConnector();
	        // this.drawBox();

	        this.c_points.map((point) => {
	            point.draw();
	        });

	        this.vertex.map((point) => {
	            point.draw();
	        });

	        this.children.map( ({child, translate, rotate}) => {
	            translate(this, child);
	            rotate(this, child);
	            child.redraw();
	        });

	        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	        this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
	        this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);
	    }

	    removeBoxFromDOM(){
	        this.svg.removeChild(this.box);
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.box);
	        this.svg.removeChild(this.c_svg);
	        this.children.map(({child}) => {
	            child.removeFromDOM();
	        });
	    }
	    
	    shift(dx, dy){
	        this.x += dx;
	        this.y += dy;
	    }

	    redraw(){
	        this.c_svg.setAttribute("cx", (this.x + this.offsetX));
	        this.c_svg.setAttribute("cy", (this.y + this.offsetY));
	        this.c_svg.setAttribute("r", (this.r * this.scale));

	        this.drawConnector();
	        this.drawVertex();
	        // this.drawBox();

	        this.vertex.map((vert) => {
	            vert.redraw();
	        });

	        this.c_points.map( (point) => {
	            point.redraw();
	        });

	        this.children.map( ({child, translate, rotate}) => {
	            translate(this, child);
	            rotate(this, child);
	            child.redraw();
	        });
	    }

	    resize(pos, dx, dy){
	        if(pos == 0)
	            this.r += -dx;
	        else if(pos == 1)
	            this.r += dx;
	        else if(pos == 2)
	            this.r += dx;
	        else
	            this.r -= dx;

	        this.children.map( ({child, translate, rotate}) => {
	            translate(this, child);
	            rotate(this, child);
	            child.redraw();
	        });
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

	    setScale(sc){
	        this.scale = sc;
	    }
	    getOffsetX(){
	        return this.offsetX;
	    }

	    getOffsetY(){
	        return this.offsetY;
	    }

	    getScale(){
	        return this.scale;
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
	            else {
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
	                // return this.c_points[i];
	                return i;
	               }
	          }
	        return null;
	      }
	}

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
	  addChild(child, translate = null, rotate = null, drawing = true){
	    // child.setOffsetX(this.x);
	    // child.setOffsetY(this.y);
	    if(translate != null)
	      translate(this, child);
	    if(rotate != null)
	      rotate(this, child);
	    if(drawing == true)
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

	    this.children.map(({child}) =>{
	      child.draw();
	    });

	    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    this.addEvent("mouseup", this.nativeEvent.mouseUpCb);
	    this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
	    this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);
	  }

	  removeFromDOM(){
	    this.svg.removeChild(this.c_svg);
	    this.children.map(({child}) =>{
	      child.removeFromDOM();
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
	      });
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
	        else {
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
	            // return this.c_points[i];
	            return i;
	        }
	    }
	    return null;
	  }
	}

	/**
	 * @class Link
	 */
	class Link
	{
	    constructor(src_point, dest_point, line = undefined)
	    {
	       this.uuid = _uuid.generate();
	       
	       /* référence sur les points de connexions*/
	       this.source = src_point;
	       this.destination = dest_point;
	       this.line = line;
	       this.type = "link";
	       _Register.add(this);
	    }

	    redraw(){
	        var source = _Register.find(this.source.ref), destination = _Register.find(this.destination.ref);
	        // var dx = 10, dy = 10;
	       

	        if(this.line != null){

	            var i_src = source.form.optimalPath(this.line);
	            var i_dest = destination.form.optimalPath(this.line);
	            var source_point = source.form.c_points[i_src];
	            var dest_point = destination.form.c_points[i_dest];
	    
	            if(source_point)
	                this.source = source_point;
	            if(dest_point)
	                this.destination = dest_point;


	            this.line.x = this.source.x;
	            this.line.y = this.source.y;
	            
	            this.line.dest_x = this.destination.x;
	            this.line.dest_y = this.destination.y;
	            console.log(this.line);
	            var dy = 10;
	            {
	                 if(i_src == 0 ){
	                   if(i_dest == 3){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                   }

	                    if(i_dest == 1){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                     }
	                    if(i_dest == 2){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = (this.y + this.dest_y) / 2;

	                        this.line.c3.x = this.dest_x;
	                        this.line.c3.y = this.line.c2.y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                    }
	                 }
	                 if(i_src == 1){
	                    if(i_dest == 3){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = (this.x + this.dest_y)/2;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.line.c2;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                   }

	                    if(i_dest == 2){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.dest_x;
	                        this.line.c3.y = this.y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                     }
	                    if(i_dest == 0){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.dest_x;
	                        this.line.c3.y = this.y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                    }
	                 }
	                 if(i_src == 2){
	                     if(i_dest == 3){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                   }

	                    if(i_dest == 1){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                     }
	                    if(i_dest == 0){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = (this.y + this.x)/2;

	                        this.line.c3.x = this.dest_x;
	                        this.line.c3.y = this.line.c2.y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                    }
	                 }
	                 if(i_src == 3){
	                    if(i_dest == 1){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = (this.x + this.dest_x) / 2;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.line.c2.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                   }

	                    if(i_dest == 2){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y;
	                     }
	                    if(i_dest == 0){
	                        this.line.c1.x = this.x;
	                        this.line.c1.y = this.y;

	                        this.line.c2.x = this.x;
	                        this.line.c2.y = this.y;

	                        this.line.c3.x = this.x;
	                        this.line.c3.y = this.dest_y;

	                        this.line.c4.x = this.dest_x;
	                        this.line.c4.y = this.dest_y + dy;
	                    }
	                 }
	            }

	            console.log(this.line.c1.x + " " + this.line.c1.y); 
	    
	            this.line.c_svg.setAttribute("fill", "none");
	            this.line.redraw();
	        }

	    }
	}

	class Events {

	  static setup = (svg, id_svg, config)=>{
	    var id;
	    var cp;
	    var dx, dy;
	    var state = "";
	    var deltaX, deltaY;
	    var line = "";
	    var source;
	    var lk;
	    var pos;
	    var svg = svg;
	    var id_svg = id_svg;
	    var config = config;
	  
	    return {
	      mouseDownCb: function mousedowncb(e) {
	  
	        dx = e.offsetX;
	        dy = e.offsetY;
	  
	        id = e.srcElement.id;
	  
	        cp = _Register.find(id);
	        console.log(cp);
	  
	        // Only the points have the ref property to refer to form that instantiates them.
	        // In source we have the component instance created.
	        if (id != this.id_svg)
	          source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;
	  
	        if(cp == undefined)
	          return;
	        if(cp.form != undefined)
	          lk = _Register.findAllLink(cp);
	        console.log("lk");
	        console.log(lk);


	        // The displacement of the form is triggered when the mousedown is done on the form, and neither on the point nor the svg.
	        if ((cp != undefined && cp.ref == undefined) )
	            state = "moving";
	        else {
	          // Resizing is triggered when the mousedown takes place on one of the summits.
	          if (  (source.form.vertex != undefined) && (pos = source.form.vertex.indexOf(cp)) >= 0) {
	            state = "resizing";
	            dx = e.offsetX;
	            dy = e.offsetY;
	            cp = _Register.find(cp.ref);
	            if(cp.type != 'line')
	              lk = _Register.findAllLink(cp);

	          }
	          else {
	            /**
	             * If the mousedown was not done on the svg, neither on a top nor on the form, then it was certainly done on a connection point.
	             * In this case, we start tracing a link.
	             */
	            state = "drawing_link";
	            console.log("state = drawing_link");

	            id = _uuid.generate();
	            if (cp != source) {
	              line = new Line( id_svg, svg, null, config, id, cp.x, cp.y);
	              line.draw();
	            }
	          }
	        }
	      },
	      mouseMoveCb: function movecb(e) {

	        if (state == "moving") {

	          console.log("state = moving");
	  
	          deltaX = e.offsetX - dx;
	          deltaY = e.offsetY - dy;
	  
	          dx = e.offsetX;
	          dy = e.offsetY;

	          // Ensure cp is a component
	          var sink;
	          if(cp.form != undefined){
	            lk.map((link) => {
	              cp.form.c_points.map( (point) => {
	                if(point == link.source)
	                  ;
	                else if(point == link.destination)
	                  sink = point;
	              });
	              if(sink) {
	                console.log("dest");
	                console.log(sink);
	                link.line.dest_x += deltaX;
	                link.line.dest_y += deltaY;

	                link.redraw();
	              }
	              else {
	                link.line.x += deltaX;
	                link.line.y += deltaY;

	                link.redraw();
	              }
	            });
	            cp.form.shift(deltaX, deltaY);
	            cp.form.redraw();
	            lk.map( (link) => {
	              link.redraw();
	            });
	          }
	        }
	        else if (state == "drawing_link") {
	          line.dest_x = e.clientX;
	          line.dest_y = e.clientY;
	          line.redraw();
	        }
	        else if (state == "resizing") {
	            deltaX = e.offsetX - dx;
	            deltaY = e.offsetY - dy;
	  
	            dx = e.offsetX;
	            dy = e.offsetY;
	  
	            source.form.resize(pos, deltaX, deltaY);
	            source.form.redraw();
	  
	            lk.map( (link ) => {
	              link.redraw();
	            });
	        }
	      },
	      mouseUpCb: function mouseupcb(e) {
	        if (state == "drawing_link") {
	          id = e.srcElement.id;
	          var pnt = _Register.find(id);
	          
	          if (pnt != undefined && pnt.ref != undefined) {
	            line.dest_x = pnt.x;
	            line.dest_y = pnt.y;
	  
	            var link = new Link(cp, pnt, line);
	            link.redraw();
	          }
	          else if (id == id_svg || pnt.ref == undefined) {
	            var ref = document.getElementById(line.uuid);
	            line.children.map( ({child}) => {
	              var rf = document.getElementById(child.uuid);
	              rf.remove();
	            });
	            line.vertex.map( (point) => {
	              var rf = document.getElementById(point.uuid);
	              rf.remove();
	            });
	            ref.remove();
	          }
	        }
	        // else if(state == "resizing" && source.type == 'line'){
	        //   console.log("mouseup");
	        //   id = e.srcElement.id;

	        //   var pnt = _Register.find(id);

	        //   if(pnt.ref){/* this is a form's connection point*/
	        //     var cp = _Register.find(pnt.ref);
	        //     console.log("pnt.ref != undefined");

	        //     if(point.x == source.form.x){
	        //       console.log("source.form.x == point.x");
	        //       source.form.x = pnt.x;
	        //       source.form.y = pnt.y;
	        //     }
	        //     else if(point.x == source.form.dest_x){
	        //       console.log("source.form.dest_x == point.x");
	        //       source.form.dest_x = pnt.x;
	        //       source.form.dest_y = pnt.y;
	        //     }
	        //     new Link(point, pnt, source.form).redraw();
	        //   }
	        // }
	        state = "";
	      },
	      mouseOverCb: function mouseovercb(e){

	        id = e.srcElement.id;
	  
	        var local_cp = _Register.find(id);

	        if(local_cp == undefined)
	          return;
	        if(local_cp.form.type == "line"){
	          local_cp.form.c_svg.setAttribute("class", "move");
	          local_cp.form.vertex.map((vt) =>{
	            vt.c_svg.setAttribute("class", "default");
	          });
	        }
	        else {
	          if(local_cp.form != undefined){
	            local_cp.form.c_svg.setAttribute("class", "move");
	            local_cp.form.c_points.map( (point) => {
	              point.c_svg.setAttribute("class", "show_point");
	            });
	            local_cp.form.vertex.map( (vertex, index) => {
	              vertex.c_svg.setAttribute("class", "show_point");
	              if(index == 0)
	                vertex.c_svg.setAttribute("class", "resize_left_top");
	              else if(index == 1)
	                vertex.c_svg.setAttribute("class", "resize_right_top");
	              else if(index == 2)
	                vertex.c_svg.setAttribute("class", "resize_right_bottom");
	              else if(index == 3)
	                vertex.c_svg.setAttribute("class", "resize_left_bottom");
	            });
	          }
	        }
	        

	       
	      },
	      mouseLeaveCb: function mouseleavecb(e){

	          var components = _Register.findAllComponents();

	          components.map( async (component) => {
	            setTimeout(()=> {
	              component.form.c_points.map( (point) => {
	                point.c_svg.setAttribute("class", "hidden_point");
	              });
	              component.form.vertex.map( (vertex) => {
	                vertex.c_svg.setAttribute("class", "hidden_point");
	              });
	            }, 5000);
	          });
	      }
	    }
	  }
	}

	/**
	 * @class Line
	 */

	class Line extends Form {

	    /**
	     * 
	     * @param {String} id_svg 
	     * @param {DomElement} svg 
	     * @param {Function} event 
	     * @param {Object} config 
	     * @param {String} uuid 
	     * @param {Number} x 
	     * @param {Number} y 
	     * @param {Number} dest_x 
	     * @param {Number} dest_y 
	     */
	    constructor(id_svg, svg, event, config, uuid, x=0, y=0, dest_x = x, dest_y = y){

	        super();

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;
	        
	        this.dest_x = dest_x;
	        this.dest_y = dest_y;

	        this.c1 = {x : this.x, y : this.y};
	        this.c2 = {x : this.x, y : this.y};
	        this.c3 = {x : this.x, y : this.y};
	        this.c4 = {x : this.x, y : this.y};

	        this.events = {};

	        this.config = config;

	        this.svg = svg;

	        this.id_svg = id_svg;

	        this.nativeEvent = event || Events.setup(this.svg, this.id_svg, this.config);

	        this.c_svg = "";
	        this.type = "line";

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.scaleX = 1;
	        this.scaleY = 1;
	    
	        this.angle = 0;

	        this.children = [];

	        this.vertex = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        ];
	        this.c_points = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        ];


	        if(this.config.line != undefined && Object.keys(this.config.line.ends.start).length > 0){
	            var child = FactoryForm.createForm(_uuid.generate(), this.config.line.ends.start.type, {}, this.svg, this.nativeEvent, this.config);
	            if(this.config.line.ends.start.type == 'triangle'){
	                this.addChild(child, (p, c) => {
	                    c.x2 = this.x;
	                    c.y2 = this.y;

	                    c.x1 = this.x - 8;
	                    c.y1 = this.y - 3;

	                    c.x3 = this.x - 8;
	                    c.y3 = this.y + 3;

	                },  (p, c) => {
	                    c.setRotateCenter(c.x2, c.y2);
	                    c.setRotateAngle(p.calculateAngle() - Math.PI);
	                } );
	            }
	                
	            else if(this.config.line.ends.start.type == 'circle')
	                this.addChild(child, (p, c) => {
	                    c.setOffsetX(p.x - 5);
	                    c.setOffsetY(p.y);
	                },  (p, c) => {
	                    c.setRotateCenter(c.x, c.y);
	                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
	                } );
	            else
	                this.addChild(child, (p, c) => {
	                    c.setOffsetX(p.x - this.config.line.ends.start.props.height/2);
	                    c.setOffsetY(p.y - this.config.line.ends.start.props.height/2);
	                },  (p, c) => {
	                    c.setRotateCenter(c.x, c.y);
	                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
	                } );
	        }

	        if(this.config.line != undefined && Object.keys(this.config.line.ends.dest).length > 0){
	            var child = FactoryForm.createForm(_uuid.generate(), this.config.line.ends.dest.type, { x1 :this.dest_x - 8, y1: this.dest_y - 2, x2 : this.dest_x, y2 : this.dest_y, x3 : this.dest_x - 8, y3 :this.dest_y + 2}, this.svg, this.nativeEvent, this.config);
	            if(this.config.line.ends.dest.type == 'triangle'){
	                this.addChild(child, (p, c) => {
	                    
	                    c.x2 = this.dest_x;
	                    c.y2 = this.dest_y;

	                    c.x1 = this.dest_x - 8;
	                    c.y1 = this.dest_y - 3;

	                    c.x3 = this.dest_x - 8;
	                    c.y3 = this.dest_y + 3;

	                },  (p, c) => {
	                    c.setRotateCenter(c.x2, c.y2);
	                    c.setRotateAngle(p.calculateAngle());
	                } );
	            }
	            else {
	                this.addChild(child, (p, c) => {
	                    c.setOffsetX(p.x - this.config.line.ends.dest.props.height/2);
	                    c.setOffsetY(p.y - this.config.line.ends.dest.props.height/2);
	                },  (p, c) => {
	                    c.setRotateCenter(c.x, c.y);
	                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
	                } );
	            }
	        }
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
	        child.vertex = [];
	        child.c_points = [];
	        translate(this, child);
	        rotate(this, child);
	        child.draw();
	        this.children.push({child, translate, rotate});
	    }
	    
	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	        
	        this.vertex[0].x = this.x + this.offsetX;
	        this.vertex[0].y = this.y + this.offsetY;

	        this.vertex[1].x = (this.dest_x + this.offsetX) * this.scaleX;
	        this.vertex[1].y = (this.dest_y + this.offsetY) * this.scaleY;
	    }

	    drawConnector(){
	        if(this.c_points.length == 0)
	            return;
	    }

	    drawBox(){
	        return;
	    }

	    draw(){
	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	         this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " 
	         + (this.c1.x + this.offsetX) + ","+ (this.c1.y + this.offsetY) + " "
	         + (this.c2.x + this.offsetX) + ","+ (this.c2.y + this.offsetY)  + " " 
	         + (this.c3.x + this.offsetX) + ","+ (this.c3.y + this.offsetY)  + " " 
	         + (this.c4.x + this.offsetX) + ","+ (this.c4.y + this.offsetY)  + " "
	         + (this.dest_x + this.offsetX )  + "," + (this.dest_y + this.offsetY);

	        //this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", this.p);
	        this.c_svg.setAttribute("fill", this.config.form.fill);
	        this.c_svg.setAttribute("stroke", this.config.form.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);

	        this.svg.appendChild(this.c_svg);

	        this.drawVertex();

	        this.c_points.map((point) => {
	            point.draw();
	        });

	        this.vertex.map( (vertex) => {
	            vertex.draw();
	        });

	        this.children.map( ({child}) =>{
	            if(child.type == 'triangle')
	                child.c_svg.setAttribute("fill", "black");
	            child.c_svg.setAttribute("fill", "black");
	        });
	        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	        this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
	        this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.c_svg);
	    }


	    shift(dx,dy){
	        this.x += dx;
	        this.y += dy;

	        this.dest_x += dx;
	        this.dest_y += dy;
	    }

	    updateLine(){

	    }

	    redraw(){
	        this.drawVertex();

	        this.vertex.map( (vertex) => {
	            vertex.redraw();
	        });

	        //var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);
	        var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " 
	         + (this.c1.x + this.offsetX) + ","+ (this.c1.y + this.offsetY) + " "
	         + (this.c2.x + this.offsetX) + ","+ (this.c2.y + this.offsetY)  + " " 
	         + (this.c3.x + this.offsetX) + ","+ (this.c3.y + this.offsetY)  + " " 
	         + (this.c4.x + this.offsetX) + ","+ (this.c4.y + this.offsetY)  + " "
	         + (this.dest_x + this.offsetX )  + "," + (this.dest_y + this.offsetY);
	        this.c_svg.setAttribute("d", p);

	        this.children.map ( ({child, translate, rotate}) => {
	            translate(this, child);
	            rotate(this, child);
	            child.redraw();
	        });
	    }

	    calculateAngle(){
	        var angle = 0;
	        
	        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);
	        if(this.dest_x == this.x)
	            angle = -Math.PI/2;
	        if(pente == 0)
	            angle = 0;
	        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
	            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
	            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
	            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
	            angle =   Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );

	        return angle;
	    }

	    resize(pos, dx, dy){
	        if(pos == 0){
	            this.x += dx;
	            this.y += dy;
	        }
	        else {
	            this.dest_x += dx;
	            this.dest_y += dy;
	        }

	        this.children.map ( ({child, translate, rotate}) => {
	            translate(this, child);
	            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
	            rotate(this, child);
	            child.redraw();
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

	    getRotateAngle(){
	       return  this.angle;
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

	    optimalPath(){
	        
	    }
	}

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
	    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
	    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
	    this.c_svg.setAttribute("fill", this.config.form.fill);


	    this.svg.appendChild(this.c_svg);

	    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    this.addEvent("mouseup", this.nativeEvent.mouseUpCb);
	    this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
	    this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);

	  }

	  removeFromDOM(){
	    this.svg.removeChild(this.c_svg);
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
	        else {
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

	/**
	 * @class Lozenge
	 */


	class Lozenge extends Form{

	/**
	 * 
	 * @param {string} uuid 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 */

	  constructor(uuid, x = 0, y = 0, width = 10, height = 30, svg, event, config)
	  {
	      super();
	  
	      this.uuid = uuid;

	      this.x = x;
	      this.y = y;

	      this.width = width;
	      this.height =  height;

	      this.events = {};
	      
	      this.nativeEvent = event;
	      
	      this.config = config;

	      this.c_svg = "";
	      this.svg = svg;
	      this.box = "";

	      this.type = "lozenge";
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
	        new Point(this.uuid,0,0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid,0,0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid,0,0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid,0,0, 5, this.svg, this.nativeEvent, this.config),
	      ];

	      this.vertex = [
	        new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
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


	  addChild(child, translate = null, rotate = null, drawing = true){
	    child.setOffsetX(this.x);
	    child.setOffsetY(this.y);
	    if(translate != null)
	      translate(this, child);
	    if(rotate != null)
	      rotate(this, child);
	    if(drawing)
	      child.draw();
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
	    // this.drawBox();

	    this.c_svg.setAttribute("d",this.p);

	    this.vertex.map((v) => {
	      v.draw();
	    });

	    this.c_points.map((p) => {
	        p.draw();
	    });

	    this.box.setAttribute("id", this.uuid);
	    this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
	    this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
	    this.box.setAttributeNS(null, "fill", this.config.box.fill);
	    this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.setAttribute("d", this.p);
	    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
	    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
	    this.c_svg.setAttribute("fill", this.config.form.fill);

	    this.svg.appendChild(this.c_svg);
	    this.svg.appendChild(this.box);
	    
	    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    this.addEvent("mouseup", this.nativeEvent.mouseUpCb);
	    this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
	    this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);

	  }

	  removeFromDOM(){
	    this.svg.removeChild(this.box);
	    this.svg.removeChild(this.c_svg);
	    this.children.map(({child})=>{
	      child.removeFromDOM();
	    });
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
	    // this.drawBox();

	    this.c_svg.setAttribute("d",this.p);

	    this.vertex.map((v) => {
	      v.redraw();
	    });

	    this.c_points.map((p) => {
	        p.redraw();
	      });

	    this.children.map( ({child, translate, rotate}) => {
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

	    if(this.width < this.config.form.limitWidth)
	      this.width = this.config.form.limitWidth;

	     if(this.height < this.config.form.limitHeight)
	      this.height = this.config.form.limitHeight;


	    this.children.map( ({child, translate, rotate}) => {
	      translate(this, child);
	      rotate(this, child);
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
	        else {
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
	            // return this.c_points[i];
	            return i;
	           }
	      }
	    return null;
	  }
	}

	/**
	 * @class Polyline
	 */

	class Polyline extends Form {
	    constructor(uuid, points = [], svg, event, config){

	        super();

	        this.uuid = uuid;

	        this.x = points[0];
	        this.y = points[1];

	        this.dest_x = points[points.length - 2];
	        this.dest_y = points[points.length - 1];

	        this.points = points;

	        this.events = {};
	        
	        this.nativeEvent = event;
	        
	        this.config = config;

	        this.c_svg = "";
	        this.svg = svg;
	        this.type = "polyline";

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.scaleX = 1;
	        this.scaleY = 1;
	    
	        this.angle = 0;

	        this.children = [];

	        this.vertex = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        ];
	        this.c_points = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
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

	    addChild(child, translate = null, rotate = null, drawing = true){
	        child.vertex = [];
	        child.c_points = [];
	        if(translate != null)
	            translate(this, child);
	        if(rotate != null)
	            rotate(this, child);
	        if(drawing == true)
	            child.draw();
	        this.children.push({child, translate, rotate});
	    }
	    
	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	    }

	    drawConnector(){
	        if(this.c_points.length == 0)
	            return;
	    }

	    drawBox(){
	    }

	    draw(){
	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'polyline');

	        var path = "";
	        for(var i = 0; i < this.points.length; i++){
	            if(i % 2 == 0)
	                path += this.points[i] + ",";
	            else
	                path += this.points[i] + " ";
	        }
	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("fill", this.config.form.fill);
	        this.c_svg.setAttribute("stroke", this.config.form.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
	        this.c_svg.setAttribute("points", path);

	        this.svg.appendChild(this.c_svg);

	        this.drawVertex();

	        this.c_points.map((point) => {
	            point.draw();
	        });

	        this.vertex.map( (vertex) => {
	            vertex.draw();
	        });

	        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.c_svg);
	        this.children.map(({child}) =>{
	            child.removeFromDOM();
	        });
	    }


	    shift(dx,dy){
	    }

	    redraw(){
	        this.drawVertex();
	        this.vertex.map( (vertex) => {
	            vertex.redraw();
	        });

	        var path = "" + this.points.map((pt, index) => {
	        }) + " ";

	        this.c_svg.setAttribute("point", path);

	        this.children.map ( ({child, translate, rotate}) => {
	            if(translate != null)
	                translate(this, child);
	            if(rotate != null)
	                rotate(this, child);
	            child.redraw();
	        });
	    }

	    calculateAngle(){
	        var angle;
	        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);

	        if(pente == 0)
	            angle = 0;
	        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
	            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
	            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
	            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
	            angle =   Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );

	        return angle;
	    }

	    resize(pos, dx, dy){
	        if(pos == 0){
	            this.x += dx;
	            this.y += dy;
	        }
	        else {
	            this.dest_x += dx;
	            this.dest_y += dy;
	        }
	        this.children.map ( ({child, translate, rotate}) => {
	            translate(this, child);
	            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
	            rotate(this, child);
	            child.redraw();
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

	    getRotateAngle(){
	       return  this.angle;
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

	    optimalPath(){

	    }
	}

	/**
	 * @class Arc
	 */

	class Arc extends Form {
	    /**
	     * 
	     * @param {string} uuid 
	     */
	    constructor(uuid, x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2, svg, event, config){

	        super();

	        this.uuid = uuid;

	        this.x0 = x0;
	        this.y0= y0;

	        this.x = x;
	        this.y= y;

	        this.angle = angle;

	        this.offsetX0 = 0;
	        this.offsetY0 = 0;

	        this.offsetX = 0;
	        this.offsetY = 0;


	        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
	        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

	        this.events = {};

	        this.nativeEvent = event;

	        this.config = config;


	        this.c_svg = "";
	        this.svg = svg;

	        this.type = "arc";


	        this.scaleX = 1;
	        this.scaleY = 1;

	        this.radius = Math.sqrt (((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * ((this.x + this.offsetX) - (this.x0  + this.offsetX0)) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * ((this.y + this.offsetY) - (this.y0 + this.offsetY0)));
	        this.ratio = ratio;

	        this.children = [];

	        this.vertex = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	        ];
	        this.c_points = [
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
	            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
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

	    addChild(child, translate = null, rotate = null, draw = true){
	        child.vertex = [];
	        child.c_points = [];
	        child.setOffsetX(this.x);
	        child.setOffsetY(this.y);
	        if(translate != null)
	            translate(this, child);
	        if(rotate != null)
	            rotate(this, child);
	        if(draw == true)
	            child.draw();
	        this.children.push({child, translate, rotate});
	    }
	    
	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	    }

	    drawConnector(){
	        if(this.c_points.length == 0)
	            return;
	    }

	    draw(){
	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
	        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

	        this.p = "M" + ( this.x0 == this.x ? this.x0 : 
	              ( ( this.x0 + this.ratio * (this.x - this.x0) ) ) ) + " " + 
	        ( this.x0 == this.x ? this.y0 + this.ratio * (this.y - this.y0) : ( (this.y - this.y0) / (this.x - this.x0) ) *  ( ( this.x0 + this.ratio * (this.x - this.x0) )  ) + (this.y0 - (( (this.y - this.y0) / (this.x - this.x0) ) * this.x0))) + " " +
	        " L" + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + 
	        this.dest_x + " " + this.dest_y  + " L " +  
	        ( this.dest_x - (1 - this.ratio) *(this.dest_x - this.x0) ) + " " +
	         (((this.dest_y - this.y0)/(this.dest_x - this.x0)) * ( this.dest_x - (1 - this.ratio) *(this.dest_x - this.x0) ) + (this.y0 - ((this.dest_y - this.y0)/(this.dest_x - this.x0)) * this.x0)) ;

	        // this.p = "M" + (this.x0 + this.ratio * this.radius) + " " + (this.y0 + this.ratio * this.radius) + " " +  " L" + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y  + " L " +  (this.x0 + this.ratio * this.radius) + " " + (this.y0 + this.ratio * this.radius) ;
	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("fill", this.config.arc.fill);
	        this.c_svg.setAttribute("stroke", this.config.arc.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.arc.strokeWidth);
	        this.c_svg.setAttribute("d", this.p);

	        this.svg.appendChild(this.c_svg);

	        this.c_points.map((point) => {
	            point.draw();
	        });

	        this.vertex.map( (vertex) => {
	            vertex.draw();
	        });

	        this.addEvent("mouseover", () =>{
	            this.c_svg.setAttribute("class", "move");
	        });
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.c_svg);
	        this.children.map( ({child}) =>{
	            child.removeFromDOM();
	        });
	    }

	    shift(dx,dy){
	        this.x0 += dx;
	        this.y0 += dy;

	        this.x += dx;
	        this.y += dy;
	    }


	    redraw(){
	        this.drawVertex();
	        this.vertex.map( (vertex) => {
	            vertex.redraw();
	        });

	        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
	        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

	        this.p = "M " + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y;
	        this.c_svg.setAttribute("d", this.p);

	        this.children.map ( ({child, translate, rotate}) => {
	            translate(this, child);
	            rotate(this, child);
	            child.redraw();
	        });
	    }

	    calculateAngle(x, y, dest_x, dest_y){
	        var angle;
	        var pente = (dest_y - y) / (dest_x - x);
	        if(dest_x == x)
	            angle = -Math.PI/2;
	        if(pente == 0)
	            angle = 0;
	        if( pente >= 0 && (x < dest_x && y < dest_y))
	            angle = Math.asin( (Math.sqrt( Math.pow((x - x), 2) + Math.pow((y - dest_y), 2)) ) / ( Math.sqrt( Math.pow((x - dest_x), 2) + Math.pow((y - dest_y), 2))) );
	        else if(pente >= 0 && (x > dest_x && y > dest_y))
	            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((x - x), 2) + Math.pow((dest_y - y), 2)) ) / ( Math.sqrt( Math.pow((x - dest_x), 2) + Math.pow((y - dest_y), 2))) );
	        else if( pente <= 0 && (x < dest_x && y > dest_y))
	            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((x - x), 2) + Math.pow((dest_y - y), 2)) ) / ( Math.sqrt( Math.pow((x - dest_x), 2) + Math.pow((y - dest_y), 2))) );
	        else if(pente <= 0 && (x > dest_x && y < dest_y))
	            angle =   Math.PI -  Math.asin( (Math.sqrt( Math.pow((x - x), 2) + Math.pow((dest_y - y), 2)) ) / ( Math.sqrt( Math.pow((x - dest_x), 2) + Math.pow((y - dest_y), 2))) );
	        return angle;
	    }

	    resize(pos, dx, dy){
	        if(pos == 0){
	            this.x += dx;
	            this.y += dy;
	        }
	        else {
	            this.dest_x += dx;
	            this.dest_y += dy;
	        }
	        this.children.map ( ({child, translate, rotate}) => {
	            translate(this, child);
	            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
	            rotate(this, child);
	            child.redraw();
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

	    setOffsetX0(x){
	        this.offsetX0 = x;
	    }

	    setOffsetY0(y){
	        this.offsetY0 = y;
	    }

	    setScaleX(x){
	        this.scaleX = x;
	    }

	    setScaleY(y){
	        this.scaleY = y;
	    }

	    getRotateAngle(){
	       return  this.angle;
	    }

	    getOffsetX(){
	        return this.offsetX;
	    }

	    getOffsetY(){
	        return this.offsetY;
	    }

	    getOffsetX0(){
	        return this.offsetX0;
	    }

	    getOffsetY0(){
	        return this.offsetY0;
	    }

	    getScaleX(){
	        return this.scaleX;
	    }

	    getScaleY(){
	        return this.scaleY;
	    }


	    optimalPath(){

	    }
	}

	class Group{
	    /**
	     * 
	     * @param {string} uuid 
	     */

	    constructor(uuid, svg, event, config){

	        this.uuid = uuid;

	        this.events = {};
	        this.nativeEvent = event;
	        this.config = config;

	        this.c_svg = "";
	        this.svg = svg;

	        this.type = "group";

	        /**
	         * @description
	         * .This variable represents the value of the rotation angle to be
	         *  applied to rotate the group.
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

	        this.c_svg = "";

	        this.children = [];
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

	    addShape(children = []){
	        children.map( (child) =>{
	            this.children.push(child);
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

	    draw(){
	        const svgns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(svgns, "g");

	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("fill", this.config.form.fill);
	        this.c_svg.setAttribute("stroke", this.config.form.stroke);

	        this.children.map((child) => {
	            this.c_svg.appendChild(child.c_svg);
	        });
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

	        this.svg.appendChild(this.c_svg);
	        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
	    }

	    redraw(){
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
	        // this.c_svg.setAttribute("transform", "translate(0, 0)");
	    }

	    removeFromDOM(){
	        this.children.map( (child) =>{
	            console.log(child);
	            child.removeFromDOM();
	        });
	        this.svg.removeChild(this.c_svg);
	    }
	}

	/**
	 * @class
	 * 
	 * @description
	 * 
	 */
	class Text{
	    constructor(uuid, x = 0, y = 0, text = "text", svg, event, config){

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;

	        this.text = text;

	        this.type = 'text';

	        this.svg = svg;
	        this.c_svg = "";

	        this.events = {};
	        this.nativeEvent = event;

	        this.config = config;

	        this.offsetX = 0;
	        this.offsetY = 0;

	        this.centerX = 0;
	        this.centerY = 0;

	        this.parentWidth = 0;
	        this.parentHeight = 0;

	        this.parentX = 0;
	        this.parentY = 0;

	        this.angle = 0;

	        this.tspan = "";
	        this.title = "";
	    };


	    addEvent(event, callback){
	        this.c_svg.addEventListener(event, callback);
	        this.events[event] = callback;
	    }
	    
	    deleteEvent(event){
	        var callback = this.events[event];
	        this.c_svg.removeEventListener(event, callback);
	        delete this.events[event];
	    }


	    setRotateCenter(centerX, centerY){
	        this.centerX = centerX;
	        this.centerY = centerY;
	    }

	    setRotateAngle(angle){
	        this.angle = angle;
	    }

	    draw(){
	        const svgns = "http://www.w3.org/2000/svg";

	        this.c_svg = document.createElementNS(svgns, "text");
	        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
	        this.c_svg.setAttributeNS(null, "id", this.uuid);
	        this.c_svg.setAttributeNS(null, "fill", this.config.text.fill);
	        this.c_svg.setAttributeNS(null, "stroke", this.config.text.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.text.strokeWidth);
	        this.c_svg.setAttributeNS(null, "fill-opacity", this.config.text.fillOpacity);
	        this.c_svg.setAttributeNS(null, "stroke-dasharray", this.config.text.strokeDasharray);
	        this.c_svg.setAttributeNS(null, "stroke-dashoffset", this.config.text.strokeDashoffset);
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

	        // this.tspan = document.createElementNS(svgns, "tspan");
	        this.title = document.createElementNS(svgns, "title");

	        this.title.textContent = this.text;
	        // this.tspan.textContent = this.text;

	        this.c_svg.textContent = this.text;
	        // this.c_svg.appendChild(this.tspan);
	        this.c_svg.appendChild(this.title);

	        // this.updateWidthText();
	        this.svg.appendChild(this.c_svg);
	    }

	    updateWidthText(marge =  5){
	        var subString = "", isSoLong = false;
	        // lenght of text in pixels  || 6 pixels wide by 8 pixels high. 
	        var validLength = this.parentWidth + this.parentX - this.offsetX;
	        var deltaLength =( validLength < (this.text.length * 6) ) ? (validLength / 6) : 0;

	        if(deltaLength == 0){
	            marge = 0;
	            subString = this.text.substring(0,(this.text.length));
	        }
	        else {
	            subString = this.text.substring(0,(deltaLength  - marge));
	            isSoLong  = true;
	        }

	        if(isSoLong)
	            subString = subString.concat('...');

	        this.tspan.textContent = subString;
	        this.title.textContent = this.text;
	    }

	    shift(dx, dy){
	        this.x += dx;
	        this.y += dy;
	    }
	    
	    removeFromDOM(){
	        // this.title.textContent = "";
	        // this.tspan.textContent = "";
	        this.c_svg.textContent = "";
	    }

	    redraw(){
	        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
	        // this.updateWidthText();
	    }

	    setOffsetX(x){
	        this.offsetX = x;
	    }

	    setOffsetY(y){
	        this.offsetY = y;
	    }

	    setText(text){
	        this.text = text;
	    }

	    getOffsetX(){
	        return this.offsetX;
	    }

	    getOffsetY(){
	        return this.offsetY;
	    }

	    getParentWidth(){
	        return this.parentWidth;
	    }

	    setParentWidth(width){
	        this.parentWidth = width;
	    }

	    getParentHeight(){
	        return this.parentHeight;
	    }

	    setParentHeight(height){
	        this.parentHeight = height;
	    }

	    setParentX(x){
	        this.parentX = x;
	    }

	    setParentY(y){
	        this.parentY = y;
	    }
	}

	/**
	 * @class FactoryForm
	 */


	class FactoryForm
	{
	    /**
	     * 
	     * @param {*} uuid 
	     * @param {*} type 
	     * @param {*} props 
	     * @param {*} svg 
	     * @param {*} events 
	     * @param {*} config 
	     * @returns 
	     */
	   static createForm(uuid, type, props = {}, svg, events, config)
	    {
	        if(type == "circle")
	            return new Circle(uuid, props.x, props.y, props.r, svg, events, config);
	        else if(type == "rectangle")
	            return new Rectangle(uuid, props.x, props.y, props.width, props.height, svg, events, config);
	        else if(type == "line")
	            return new Line(0,svg, events, config, uuid, props.x, props.y, props.dest_x, props.dest_y);
	        else if(type == "triangle")
	            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, svg, events, config);
	        else if(type == "lozenge")
	            return new Lozenge(uuid, props.x, props.y, props.width, props.height, svg, events, config);
	        else if(type == "polyline")
	            return new Polyline(uuid, props.points, svg, events, config);
	        else if(type == "arc")
	            return new Arc(uuid, props.x0, props.y0, props.x, props.y, props.angle, props.ratio, svg, events, config);
	        else if(type == "group")
	            return new Group(uuid, svg, events, config);
	        else if(type == "text")
	            return new Text(uuid, props.x, props.y, props.text, svg, events, config);
	    }
	}

	class Component
	{
	    /**
	     * 
	     * @param {*} type 
	     * @param {*} props 
	     * @param {*} svg 
	     * @param {*} events 
	     * @param {*} config 
	     */
	    constructor( type, props, svg, events, config)
	    {
	        this.uuid = _uuid.generate();
	        this.type = type;
	        this.form = FactoryForm.createForm(this.uuid, type, props, svg, events, config);
	        _Register.add(this);
	        this.form.draw();
	    }
	}

	class Method{
	    constructor(x, y, r, min, name = "", svg){

	        this.design_pattern = [
	            aya.Text(0,0,"adapter"),
	            aya.Text(0,0,"composite"),
	            aya.Text(0,0,"chain of responsability"),
	            aya.Text(0,0,"decorator"),
	            aya.Text(0,0,"strategy")
	        ];
	        this.x_circle = x;
	        this.y_circle = y;
	        this.r_circle = r;

	        this.points = [
	            Math.cos( ( (60 - min * 30 ) * Math.PI) / 180) * this.r_circle + this.x_circle,
	            Math.sin( ( (60 - min * 30 ) *  Math.PI) / 180) * this.r_circle + this.y_circle,
	            this.x_circle + this.r_circle + 5 ,
	            this.y_circle + 100 - min * 50,
	            this.x_circle + this.r_circle + 5 + 50,
	            this.y_circle + 100 - min * 50
	        ];
	       
	        this.width = 125;
	        this.height = 30;

	        this.name = name;
	       
	        this.polyline = "";
	        this.id = "";
	        this.esquiss = "";

	        this.svg = svg;

	        this.type  = "method";
	        this.draw();
	    }

	    draw(){
	        this.polyline = aya.Polyline(this.points);
	        this.ancre = aya.Circle(this.polyline.x, this.polyline.y, 5);
	        this.ancre.draw();
	        this.ancre.removeBoxFromDOM();
	        this.ancre.c_svg.setAttribute("fill", "black");
	        this.id = aya.Rectangle(this.polyline.dest_x, this.polyline.dest_y - 15, this.width, this.height);
	        this.method_name = aya.Text(0,0,this.name);
	        this.id.addChild(this.method_name, (p,c)=>{
	            c.setOffsetX(p.x + p.width/3);
	            c.setOffsetY(p.y + 20);
	        }, (p,c)=>{}, false);
	        this.polyline.draw();
	        this.id.draw();

	        this.polyline.c_svg.setAttribute("fill", "none");

	        this.id.addEvent("mouseover", ()=>{
	            RectangleEvent.mouseovercb(this);
	        });
	        this.id.addEvent("mouseleave", ()=>{
	            RectangleEvent.mouseleavecb(this);
	        });
	    }

	    removeFromDOM(){}

	    createArtefact(){
	        var points = [
	            this.id.x + this.id.width +  -1/4 * this.width,
	            this.id.y + this.id.height + 0,
	            this.id.x + this.id.width + 0,
	            this.id.y + this.id.height +0,
	            this.id.x + this.id.width + 0,
	            this.id.y + this.id.height +200,
	            this.id.x + this.id.width + 300,
	            this.id.y + this.id.height +200,
	            this.id.x + this.id.width + 300,
	            this.id.y + this.id.height + -(300 + 100 + this.height - 50),
	            this.id.x + this.id.width + 0,
	            this.id.y + this.id.height +-(300 + 100 + this.height - 50),
	            this.id.x + this.id.width + 0,
	            this.id.y + this.id.height +-this.height,
	            this.id.x + this.id.width + -1/4 * this.width,
	            this.id.y + this.id.height +-this.height
	        ];
	        this.esquiss = aya.Polyline(points);

	        this.design_pattern.map((pattern, index) =>{
	            this.esquiss.addChild(pattern, (p,c) =>{
	                if(index == 0){
	                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25 + 25);
	                    c.setOffsetY((p.y - 30) + 30/2 - 25 - 25);
	                }
	                if(index == 1){
	                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25);
	                    c.setOffsetY((p.y - 30) + 30/2 - 25);
	                }
	                if(index == 2){
	                    c.setOffsetX(p.x + (1/4 * 125) + 25);
	                    c.setOffsetY((p.y - 30) + 30/2);
	                }
	                if(index == 3){
	                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25);
	                    c.setOffsetY((p.y - 30) + 30/2 + 25);
	                }
	                if(index == 4){
	                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25 + 25);
	                    c.setOffsetY((p.y - 30) + 30/2 + 25 + 25);
	                }
	            }, (p,c)=>{}, false);
	        });
	        this.esquiss.draw();
	        this.esquiss.children.map(({child}) =>{
	            child.draw();
	        });
	        this.esquiss.c_svg.setAttribute("stroke-width", "0px");
	        this.esquiss.addEvent("mouseover", ()=>{
	            EsquissEvent.mouseovercb(this);
	        });
	        this.esquiss.addEvent("mouseleave", ()=>{
	            EsquissEvent.mouseleavecb(this);
	        });
	        this.esquiss.children.map(({child}) =>{
	            child.addEvent("mouseover", () =>{
	                PatternEvent.mouseovercb({self: this, child: child});
	            });
	            child.addEvent("mouseleave", () =>{
	            });
	            child.addEvent("mousedown", ()=>{
	                PatternEvent.mousedowncb({self: this, child: child});
	            });
	        });
	    }

	    removeArtefact(){
	        this.esquiss.removeFromDOM();
	        this.svg.removeEventListener("mouseover", ()=>{});
	    }
	}

	class CircleEvent{

	    static mouseovercb(self){
	        if(state == "mouseover")
	            return;
	        state = "mouseover";
	        active_component = self;
	        self.methods.map((m, index)=>{
	            if(m.type == 'arc'){
	                m.draw();
	                console.log("arc drawing");
	                console.log(m.children);
	                m.children.map(({child})=>{
	                    if(index == 0){
	                        child.setRotateAngle(-20);
	                        child.setOffsetX(2);
	                        child.setOffsetY(-5);
	                    }
	                    if(index == 1){
	                        child.setRotateAngle(-60);
	                        child.setOffsetX(2);
	                        child.setOffsetY(-10);
	                    }
	                    if(index == 2){
	                        child.setRotateAngle(-90);
	                        child.setOffsetX(5);
	                        child.setOffsetY(-15);
	                    }
	                    if(index == 3){
	                        child.setRotateAngle(-150);
	                        child.setOffsetX(20);
	                        child.setOffsetY(-2);
	                    }
	                    child.draw();
	                });
	                m.addEvent("mouseover", ()=>{
	                    ArcEvent.mouseovercb(m);
	                });
	                m.addEvent("mouseleave", ()=>{
	                    ArcEvent.mouseleavecb(m);
	                });
	                m.addEvent("mousedown", ()=>{
	                    ArcEvent.mousedowncb({self: self, arc: m});
	                });
	            }
	        });
	        self.svg.addEventListener("mouseover", ()=>{
	            console.log("mouseover svg");
	            if(state == "mouseover" )
	                return;
	            console.log(active_component);
	            if(active_component)
	                active_component.removeArtefact();
	            active_component = null;
	        });
	    }
	    static mouseleavecb(self){
	        state = "";
	    }
	}
	class ArcEvent{
	    static mouseovercb(arc){
	        state = "mouseover";
	        arc.c_svg.setAttribute("fill", "black");
	    }

	    static mouseleavecb(arc){
	        arc.c_svg.setAttribute("fill", "white");
	        state = "";
	    }

	    static mousedowncb(self){
	        console.log("mousedown arc, comp actif");
	        console.log(active_component);
	        self.self.svg.removeEventListener("mouseover", ()=>{});
	        active_component.removeArtefact();
	        self.arc.children[0].child.draw();
	        active_component = null;
	        var method_name = ";";

	        for(var m of self.self.data.methods){
	            if(m.name == self.arc.children[0].child.text){
	                method_name = m.id;
	                break;
	            }
	        }
	        state = "";
	        self.self.methods[self.self.relocate(self.arc)] = new Method(self.self.x, self.self.y, self.self.r, self.self.relocate(self.arc), method_name, self.self.svg);
	    }
	}

	class RectangleEvent{
	    static mouseovercb(self){
	        state = "mouseover";
	        // self.id.c_svg.setAttribute("fill", "indigo");
	        if(active_component)
	            return;
	        active_component = self;
	        self.createArtefact();
	        self.svg.addEventListener("mouseover", ()=>{
	            console.log("mouseover svg from over rect");
	            if(state == "mouseover" )
	                return;
	            console.log(active_component);
	            if(active_component)
	                active_component.removeArtefact();
	            active_component = null;
	        });
	    }

	    static mouseleavecb(self){
	        state = "";
	        // self.id.c_svg.setAttribute("fill", "white");
	        
	    }
	}

	class EsquissEvent{
	    static mouseovercb(self){
	    //    self.esquiss.c_svg.setAttribute("fill", "red");
	        state = "mouseover";
	    }

	    static mouseleavecb(self){
	        // self.esquiss.c_svg.setAttribute("fill", "white");
	         state = "";
	    }
	}

	class PatternEvent{
	    static mouseovercb(self){
	        state = "mouseover";
	        self.child.c_svg.setAttribute("class", "scroll");
	    }
	    static mouseleavecb(self){
	        // self.svg.addEventListener("mouseover", ()=>{
	        //     console.log("mouseover svg from over mouseover");
	        //     if(state == "mouseover")
	        //         return;
	        //     console.log(active_component);
	        //     if(active_component)
	        //         active_component.removeArtefact();
	        //     active_component = null;
	        // });
	    }
	    static mousedowncb(self){
	        console.log("mousedown sur le text");
	        if(self.child.text == 'adapter'){
	            console.log(self.child.text);
	            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/adapter.png");
	            self.self.id.addChild(img, null, null, false);
	            self.child.removeFromDOM();
	        }
	        else if(self.child.text == "composite"){
	            console.log(self.child.text);
	            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/composite.png");
	            self.self.id.addChild(img, null, null, false);
	        }
	        else if(self.child.text == "chain of responsability"){
	            console.log(self.child.text);
	            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/chain.png");
	            self.self.id.addChild(img, null, null, false);
	        }
	        else if(self.child.text == "decorator"){
	            console.log(self.child.text);
	            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/decorator.png");
	            self.self.id.addChild(img, null, null, false);
	        }
	        else if(self.child.text == "strategy"){
	            console.log(self.child.text);
	            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/strategy.png");
	            self.self.id.addChild(img, null, null, false);
	        }
	    }
	}

	class AncreEvent{
	    static mousedowncb(self){
	        self.method.ancre.selected = true;
	        self.self.methods.map((m) =>{
	            if(m.type == 'method' && m != self.method && m.ancre.selected == true){
	                 m.id.removeFromDOM();
	                 m.polyline.removeFromDOM();
	                 m.ancre.selected = false;
	            }
	            if(m.type == 'method' && m == self.method){
	                if(active_method == self.method){
	                    console.log("active_ancre");
	                    m.id.removeFromDOM();
	                    m.polyline.removeFromDOM();
	                    active_method = "";
	                }
	                else {
	                    self.method.id.draw();
	                    self.method.polyline.draw();
	                    self.method.id.addEvent("mouseover", ()=>{
	                        RectangleEvent.mouseovercb(self.method);
	                    });
	                    self.method.id.addEvent("mouseleave", ()=>{
	                        RectangleEvent.mouseleavecb(self.method);
	                    });
	                    self.method.polyline.c_svg.setAttribute("fill", "none");
	                    active_method = m;
	                }
	            }
	        });
	    }
	}

	var methods = [
	    "get",
	    "post",
	    "put",
	    "del",
	];
	class Ressource{
	    constructor(x = 0, y = 0, r = 5, angle = 40, data = {}, svg, config){
	        this.x = x;
	        this.y = y;
	        this.r = r;
	        this.circle = "";

	        this.data = data;

	        this.delta = 0;

	        this.arc_angle = angle;

	        this.methods = [];

	        this.config = config;

	        this.svg = svg;

	        this.type = "ressource";

	        this.draw();
	    }

	    draw(){
	        if((!this.data.children && !this.data.params && !this.data.methods) ||
	           (this.data.children && !this.data.methods && !this.data.params)  
	        )
	            this.drawPath(this.data.path);
	        else if( (!this.data.children && this.data.params) ||
	                 (this.data.children  && this.data.params)
	        )
	            this.drawParam(this.data.params);
	        if(this.data.methods)
	            this.drawRessource();

	        if(this.data.children){
	            this.data.children.map((m)=>{
	                aya.Ressource(this.x + this.delta, this.y + 50, this.r, this.arc_angle, m);
	                this.delta = 200;

	            });
	        }
	    }

	    drawPath(name){
	        var path = aya.Component("circle", {x: this.x + 100, y: this.y + 50, r: 10});
	        path.form.c_svg.setAttribute("fill", "#151e3e");
	        path.form.addChild(aya.Text(0,0,name), (p,c)=>{
	            c.setOffsetX(p.x - p.r);
	            c.setOffsetY(p.y - p.r - 10);
	        }, (p,c)=>{}, true);
	    }

	    drawParam(params){
	        params.map((param)=>{
	            var node = aya.Component("lozenge", {x: this.x + 80, y: this.y - 50, width: 30, height: 30});
	            node.form.c_svg.setAttribute("fill", "#415682");
	            var text = aya.Text(0,0,"{"+param.name+"}");
	            node.form.addChild(text, (p,c)=>{
	                c.setOffsetX(p.x - p.width/3 - 12);
	                c.setOffsetY(p.y + p.height/2 + 5);
	            }, (p, c) =>{}, true);
	        });
	    }

	    drawRessource(){
	        var x = this.x, y = this.y + this.r + 10, idx;

	        this.circle = aya.Component("circle", {x: this.x, y: this.y, r: this.r});
	        this.circle.form.c_svg.setAttribute("fill", "#909294");

	        this.circle.form.removeBoxFromDOM();
	        // this.circle.form.deleteEvent("mousedown");
	        // this.circle.form.deleteEvent("mouseover");
	        // this.circle.form.deleteEvent("mouseleave");

	        if(Object.keys(this.data)){
	            var text = aya.Text(0,0, "res");
	            this.circle.form.addChild(text, (p,c) => {
	                c.setOffsetX(p.x - p.r/2 + 10);
	                c.setOffsetY(p.y + 5);
	            }, (p,c) => {}, true);
	            text.title.textContent = "ressource";
	        }


	        for(var m of methods){
	            var arc = aya.Arc(this.x, this.y, x, y, this.arc_angle, 3/4);

	            this.circle.form.addChild(arc, null, null, false);
	            
	            var text = aya.Text(arc.x + 10, arc.y, m);

	            arc.addChild(text, (p,c)=>{
	                c.setOffsetX(0);
	                c.setOffsetY(0);
	            }, (p,c) =>{
	                c.setRotateCenter(c.x, c.y);
	            }, false);

	            this.circle.form.addChild(text, null, null, false);
	            this.methods.push(arc);
	            x = arc.dest_x;
	            y = arc.dest_y;
	        }
	        if(this.data.methods){
	            for(var m of this.data.methods){
	                for(var mm of this.methods){
	                    if(mm.type == 'arc' && mm.children[0].child.text == m.name){
	                        console.log("idx");
	                        idx = this.relocate(mm);
	                        break;
	                    }
	                }
	                console.log("this.methods[idx]");

	                console.log(this.methods[idx]);
	                delete this.methods[idx];
	                this.methods[idx] = new Method(this.x, this.y, this.r, idx, m.id, this.svg);
	                this.methods[idx].ancre.addChild(aya.Text(0,0,m.name), (p,c)=>{
	                    c.setOffsetX(p.x + 10);
	                    c.setOffsetY(p.y + 10);
	                }, (p,c)=>{}, true);
	                this.methods[idx].id.removeFromDOM();
	                this.methods[idx].polyline.removeFromDOM();
	            }
	        }

	        this.methods.map( (m) =>{
	            if(m.type == 'method'){
	                m.ancre.addEvent("mousedown", ()=>{
	                    AncreEvent.mousedowncb({self: this, method: m});
	                });
	            }
	        });
	        this.circle.form.addEvent("mouseover", ()=>{
	            CircleEvent.mouseovercb(this);
	        });
	        this.circle.form.addEvent("mouseleave", ()=>{
	            CircleEvent.mouseleavecb(this);
	        });

	    }

	    relocate(arc){
	        var min = -1, temp;
	            this.methods.map((m1, index) =>{
	                console.log(m1);
	                if( m1.type == 'arc' && min == -1 )
	                    min = index;
	            });
	    
	            console.log("this.methods[min]");
	            console.log(this.methods[min]);
	            temp = this.methods[min].children[0].child.text;
	            console.log("temp");
	            console.log(temp);
	            this.methods[min].children[0].text = arc.children[0].child.text;
	            arc.children[0].child.text = temp;
	        return min;
	    }

	    removeArtefact(){
	        this.methods.map((m) =>{
	            if(m.type == 'arc')
	                m.removeFromDOM();
	        });
	        this.svg.removeEventListener("mouseover", ()=>{});
	    }
	}

	class Image{
	    constructor(x = 0, y = 0, width = 50, height = 50, path, svg, event, config){
	        this.width = width;
	        this.height = height;
	        this.x = x;
	        this.y = y;
	        this.path = path;
	        this.c_svg = "";
	        this.events = {};
	        this.nativeEvent = event;
	        this.config = config;
	        this.type = 'image';
	        this.svg = svg;
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


	    draw(){
	        this.c_svg = document.createElementNS('http://www.w3.org/2000/svg','image');
	        this.c_svg.setAttributeNS(null,'height',this.height);
	        this.c_svg.setAttributeNS(null,'width',this.width);
	        this.c_svg.setAttributeNS('http://www.w3.org/1999/xlink','href', this.path);
	        this.c_svg.setAttributeNS(null,'x',this.x);
	        this.c_svg.setAttributeNS(null,'y',this.y);

	        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);

	        this.svg.append(this.c_svg);
	    }

	    shift(dx, dy){
	        this.x += dx;
	        this.y +=dy;
	    }

	    redraw(){
	        this.c_svg.setAttributeNS(null,'x',this.x);
	        this.c_svg.setAttributeNS(null,'y',this.y);
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.c_svg);
	    }
	}

	class Init{
	    constructor(width = 1343, height = 1343){

	        this.uuid = _uuid.generate();

	        this.svg_width = width;
	        this.svg_height = height;

	        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

	        this.svg.setAttribute("width", this.svg_width);
	        this.svg.setAttribute("height", this.svg_height);
	        this.svg.setAttribute("id", this.uuid);

	        this.config = config;
	        this.events = Events.setup(this.svg, this.uuid,this.config);

	        this.tail_px = 25;
	        this.nc = Math.floor(this.svg_width / this.tail_px) + 1; 
	        this.nl = Math.floor(this.svg_height / this.tail_px) + 1;

	        this.u_tail_px = 10;
	        this.u_nc = Math.floor(this.tail_px / this.u_tail_px); 
	        this.u_nl = Math.floor(this.tail_px / this.u_tail_px);
	        
	        this.box = this.Component("rectangle", {
	            x: 0,
	            y: 0,
	            height: this.svg_height,
	            width: this.svg_width
	        });

	        this.box.form.c_svg.setAttributeNS(null, "fill", "#FFFF");
	        this.box.form.c_svg.setAttribute("stroke", "#57564F");
	        this.box.form.c_svg.setAttributeNS(null, "stroke-width", "0.5pt");

	        this.box.form.vertex.map( (vt) => {
	            vt.removeFromDOM();
	        });

	        this.box.form.c_points.map( (cp) => {
	            cp.removeFromDOM();
	        });

	        Object.keys(this.box.form.events).map((ev) => {
	            this.box.form.deleteEvent(ev);
	        });

	        for(var j = 1; j <= this.nl - 1; j++){
	            var line = this.Line(0, j * this.tail_px, this.nl * this.tail_px, j * this.tail_px);

	            // for(var k = 1; k <=( this.u_nl - 1) + this.tail_px; k++){
	            //     var u_line = this.Line(0, k * this.u_tail_px, this.nl * this.tail_px, k * this.u_tail_px);

	            //     this.box.form.addChild(u_line, (p, c)=> {}, (p,c)=>{});

	            //     u_line.c_svg.setAttribute("fill", "white");
	            //     u_line.c_svg.setAttribute("stroke", "#57564F");
	            //     u_line.c_svg.setAttributeNS(null, "stroke-width", "0.1pt");
	    
	            //     u_line.children.map( ({child}) => {
	            //         child.removeFromDOM();
	            //     });
	    
	            //     u_line.vertex.map( (vt) => {
	            //         vt.removeFromDOM();
	            //     });
	    
	            //     u_line.c_points.map( (point) => {
	            //         point.removeFromDOM();
	            //     });
	    
	            //     Object.keys(u_line.events).map((ev) => {
	            //         u_line.deleteEvent(ev);
	            //     });
	            // }

	            this.box.form.addChild(line, (p, c)=> {}, (p,c)=>{});

	            line.c_svg.setAttribute("fill", "#B266FF");
	            line.c_svg.setAttribute("stroke", "#57564F");
	            line.c_svg.setAttributeNS(null, "stroke-width", "0.8pt");

	            line.children.map( ({child}) => {
	                child.removeFromDOM();
	            });

	            line.vertex.map( (vt) => {
	                vt.removeFromDOM();
	            });

	            line.c_points.map( (point) => {
	                point.removeFromDOM();
	            });

	            Object.keys(line.events).map((ev) => {
	                line.deleteEvent(ev);
	            });
	        }

	        for(var j = 1; j <= this.nc - 1; j++){
	            var line = this.Line(j * this.tail_px, 0, this.tail_px * j, this.nc * this.tail_px);

	            this.box.form.addChild(line, (p, c)=> {},  (p,c)=>{});

	            line.c_svg.setAttribute("fill", "#B266FF");
	            line.c_svg.setAttribute("stroke", "#57564F");
	            line.c_svg.setAttributeNS(null, "stroke-width", "0.8pt");

	            line.children.map( ({child}) => {
	                child.removeFromDOM();
	            });

	            line.vertex.map( (vt) => {
	                vt.removeFromDOM();
	            });

	            line.c_points.map( (point) => {
	                point.removeFromDOM();
	            });

	            Object.keys(line.events).map((ev) => {
	                line.deleteEvent(ev);
	            });
	        }

	        this.svg.addEventListener("mousemove", this.events.mouseMoveCb);
	        this.svg.addEventListener("mouseup", this.events.mouseUpCb);
	    }

	    Register(){
	        return _Register;
	    }

	    _uuid(){
	        return _uuid;
	    }

	    Component(type, props){
	        return new Component(type, props, this.svg, this.events, this.config);
	    }

	    Rectangle(x = 0, y = 0, width = 10, height = 10){
	        return new Rectangle(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
	    }

	    Lozenge(x = 0, y = 0, width = 10, height = 10){
	        return new Lozenge(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
	    }

	    Triangle(x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10){
	        return new Triangle(_uuid.generate(), x1, y1, x2, y2, x3, y3, this.svg, this.events, this.config);
	    }

	    Circle( x = 0, y = 0, r = 5){
	        return new Circle(_uuid.generate(), x, y, r, this.svg, this.events, this.config);
	    }

	    Text(x = 0, y = 0, text = "text"){
	        return new Text(_uuid.generate(), x, y, text, this.svg, this.events, this.config);
	    }

	    Line(x=0, y=0, dest_x = x, dest_y = y){
	        return new Line(this.uuid, this.svg, this.events, this.config, _uuid.generate(), x, y, dest_x, dest_y);
	    }

	    Polyline( points = []){
	        return new Polyline(_uuid.generate(), points, this.svg, this.events, this.config);
	    }

	    Point( x = 0, y = 0, r = 5){
	        return new Point(_uuid.generate(), x, y, r, this.svg, this.events, this.config);
	    }

	    Arc(x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2){
	        return new Arc(_uuid.generate(), x0, y0, x, y, angle, ratio, this.svg, this.events, this.config);
	    }

	    Group(){
	        return new Group(_uuid.generate(),this.svg, this.events, this.config);
	    }

	    Ressource(x = 0, y = 0, r = 5, angle = 40, data = {}){
	        return new Ressource(x, y, r, angle, data, this.svg, this.config);
	    }

	    Image(x,y, width, height, path = ""){
	        return new Image(x, y, width, height, path, this.svg, this.events, this.config);
	    }
	}

	exports.Init = Init;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
