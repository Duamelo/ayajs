(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.aya = {}));
})(this, (function (exports) { 'use strict';

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
	    
	    static getAllLinksByComponent(component){
	        var result = [];
	        Object.keys(store).map((id) => {
	            var obj = _Register.find(id);
	            if(obj.type == undefined){
	                if((component == obj.source)  || (component == obj.destination))
	                    result.push(obj);
	            }
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
	 * @class Line class
	 */

	class Line 
	{
	    constructor(uuid, x=0, y=0, events, dest_x = x, dest_y = y){
	        
	        // this.parent = uuid;
	        this.uuid = _uuid.generate();
	        this.x = x;
	        this.y = y;
	        this.dest_x = dest_x;
	        this.dest_y = dest_y;
	        this.events = events;
	        this.c_svg = "";
	        this.p = "";
	        _Register.add(this);
	        
	    }

	    draw(svgs){

	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
	        
	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", this.p);
	        this.c_svg.setAttribute("stroke", "black");
	        this.c_svg.setAttributeNS(null, "stroke-width", "4px");

	        
	        svgs.appendChild(this.c_svg);

	        this.c_svg.addEventListener("mousedown", events.mouseDownCb);

	    }

	    shift(dx,dy){
	        this.x += dx;
	        this.y += dy;
	    }

	    redraw(){
	        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
	        this.c_svg.setAttribute("d", this.p);
	    }
	    
	}

	/**
	 * @class Link 
	 */

	class Link
	{
	    constructor(source, destination, line = undefined) 
	    {
	       this.uuid = _uuid.generate();
	       this.source = source;
	       this.destination = destination;
	       this.line = line;
	       _Register.add(this);
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
	  constructor(uuid, x = 0, y = 0, r = 3) {
	    this.uuid = _uuid.generate();
	    this.ref = uuid;
	    this.x = x;
	    this.y = y;
	    this.r = r;
	    _Register.add(this);
	  }

	  draw(svgs) {
	    var ns = "http://www.w3.org/2000/svg";

	    this.c_svg = document.createElementNS(ns, "circle");

	    this.c_svg.setAttribute("cx", this.x);

	    this.c_svg.setAttribute("cy", this.y);

	    this.c_svg.setAttribute("r", this.r);

	    // this.c_svg.setAttribute("class", "vertex");

	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	    // this.c_svg.addEventListener("mousemove", events.mouseMoveCb);
	    this.c_svg.addEventListener("mouseup", events.mouseUpCb);

	    svgs.appendChild(this.c_svg);
	  }

	  shift(dx, dy) {
	    this.x += dx;
	    this.y += dy;
	  }

	  redraw() {
	    this.c_svg.setAttribute("cx", this.x);

	    this.c_svg.setAttribute("cy", this.y);
	  }
	}

	class Connector {
	  static create(type, uuid) {
	    var cp = [];

	    if (type == "rectangle") {
	      cp = [];
	      for (var i = 0; i < 4; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    } else if (type == "triangle") {
	      cp = [];
	      for (var i = 0; i < 3; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    }
	    return cp;
	  }
	}

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
	   * @param {array of object} events
	   */

	  constructor(uuid, x = 0, y = 0, width = 10, height = 10, events = []) {

	    this.uuid = uuid;

	    this.x = x;
	    this.y = y;

	    this.width = width;
	    this.height = height;

	    this.events = events;
	    this.c_svg = "";

	    this.children = [];

	    this.c_points = Connector.create("rectangle", this.uuid);
	    this.vertex = Connector.create("rectangle", this.uuid);

	    this.drawConnector();
	    this.drawVertex();

	    _Register.add(this);
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

	    this.c_points.map((point) => {
	      point.draw(svgs);
	    });

	    this.vertex.map((point) => {
	      point.draw(svgs);
	    });

	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	    this.c_svg.addEventListener("mouseup", events.mouseUpCb);
	    this.c_svg.addEventListener("mouseover", events.mouseOverCb);
	    this.c_svg.addEventListener("mouseleave", events.mouseLeaveCb);
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

	    this.c_points.map((p) => {
	      p.redraw();
	    });

	    this.vertex.map((p) => {
	      p.redraw();
	    });
	  }

	  resize(pos, dx, dy) {

	    if (pos == 0) {
	      this.shift(dx, dy);

	      this.width += -dx;
	      this.height += -dy;

	      this.drawVertex();
	      this.drawConnector();
	    } 
	    else if (pos == 1) {

	      this.y += dy;

	      this.width += dx;
	      this.height += -dy;

	      this.drawVertex();
	      this.drawConnector();
	    } 
	    else if (pos == 2) {

	      this.width += dx;
	      this.height += dy;

	      this.drawVertex();
	      this.drawConnector();
	    } 
	    else if (pos == 3) {

	      this.x += dx;

	      this.width += -dx;
	      this.height += dy;

	      this.drawVertex();
	      this.drawConnector();

	    }
	  }
	}

	/**
	 * @class Triangle class
	 */

	class Triangle {
	  /**
	   *
	   * @param {string} uuid
	   * @param {abscissa starting point} x1
	   * @param {ordonne starting point} y1
	   * @param {LineTo this abscissa point} x2
	   * @param {LineTo this ordonne point} y2
	   * @param {LineTo this abscissa point} x3
	   * @param {LineTo this ordonne point} y3
	   * @param {array of object} events
	   */
	  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, events = [] )
	  {
	    this.uuid = uuid;

	    this.x1 = x1;
	    this.y1 = y1;

	    this.x2 = x2;
	    this.y2 = y2;

	    this.x3 = x3;
	    this.y3 = y3;

	    this.events = events;
	    this.c_svg = "";
	    this.p = "";

	    this.c_points = Connector.create("triangle", uuid);
	    this.vertex = [
	      new Point(this.uuid, this.x1, this.y1, 5),
	      new Point(this.uuid, this.x2, this.y2, 5),
	      new Point(this.uuid, this.x3, this.y3, 5),
	    ];
	    this.drawConnector();
	  }

	  draw(svgs) {
	    const ns = "http://www.w3.org/2000/svg";
	    this.c_svg = document.createElementNS(ns, "path");

	    this.p =
	      "M " +
	      this.x1 +
	      "," +
	      this.y1 +
	      " " +
	      "L " +
	      this.x2 +
	      "," +
	      this.y2 +
	      " " +
	      "L " +
	      this.x3 +
	      "," +
	      this.y3 +
	      " Z";

	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.setAttribute("d", this.p);
	    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
	    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
	    this.c_svg.setAttribute("fill", "lavenderblush");

	    svgs.appendChild(this.c_svg);

	    this.c_points.map((point) => {
	      point.draw(svgs);
	    });

	    this.vertex.map((v) => {
	      v.draw(svgs);
	    });

	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	    this.c_svg.addEventListener("mouseup", events.mouseUpCb);
	    this.c_svg.addEventListener("mouseover", events.mouseOverCb);
	    this.c_svg.addEventListener("mouseleave", events.mouseLeaveCb);
	  }

	  drawConnector() {
	    this.c_points[0].x = (this.x1 + this.x2) / 2;
	    this.c_points[0].y = (this.y1 + this.y2) / 2;
	    this.c_points[0].r = 5;

	    this.c_points[1].x = (this.x2 + this.x3) / 2;
	    this.c_points[1].y = (this.y2 + this.y3) / 2;
	    this.c_points[1].r = 5;

	    this.c_points[2].x = (this.x1 + this.x3) / 2;
	    this.c_points[2].y = (this.y1 + this.y3) / 2;
	    this.c_points[2].r = 5;
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
	    this.p =
	      "M " +
	      this.x1 +
	      "," +
	      this.y1 +
	      " " +
	      "L " +
	      this.x2 +
	      "," +
	      this.y2 +
	      " " +
	      "L " +
	      this.x3 +
	      "," +
	      this.y3 +
	      " Z";

	    this.c_svg.setAttribute("d", this.p);

	    this.c_points.map((p) => {
	      p.redraw();
	    });
	    this.vertex.map((v) => {
	      v.redraw();
	    });
	  }

	  resize(pos, dx, dy) {
	    //console.log(dx + "---" + dy);
	    if (pos == 0) {
	      this.x1 = dx;
	      this.y1 = dy;
	      this.vertex[0].x = dx;
	      this.vertex[0].y = dy;
	      this.createConnector();
	      //console.log(this.vertex[0].x);
	    } else if (pos == 1) {
	      this.x2 = dx;
	      this.y2 = dy;
	      this.vertex[1].x = dx;
	      this.vertex[1].y = dy;
	      this.createConnector();
	    } else if (pos == 2) {
	      this.x3 = dx;
	      this.y3 = dy;
	      this.vertex[2].x = dx;
	      this.vertex[2].y = dy;
	      this.createConnector();
	    }
	  }
	}

	function nativeEvents() {
	  var id;
	  var cp;
	  var dx, dy;
	  var state = "";
	  var deltaX, deltaY;
	  var line = "";
	  var source;
	  var lk;
	  var pos;

	  return {
	    mouseDownCb: function mousedowncb(e) {

	      dx = e.offsetX;
	      dy = e.offsetY;

	      id = e.srcElement.id;

	      cp = _Register.find(id);

	      if (id != "svg")
	        source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;

	      if(cp.form != undefined)
	        lk = _Register.getAllLinksByComponent(cp);

	      // une forme différente de Point n'a pas de propriété ref
	      if ((cp != undefined && cp.ref == undefined) ) 
	          state = "moving";
	      else {
	        if (  (source.form.vertex != undefined) && (pos = source.form.vertex.indexOf(cp)) >= 0) {
	          state = "resizing";
	          dx = e.offsetX;
	          dy = e.offsetY;
	        } 
	        else {
	          state = "drawing_link";
	          id = _uuid.generate();
	          if (cp != source) {
	            line = new Line(id, cp.x, cp.y, []);
	            line.draw(svg);
	          }
	        }
	      }
	    },
	    mouseMoveCb: function movecb(e) {

	      if (state == "moving") {
	        
	        deltaX = e.offsetX - dx;
	        deltaY = e.offsetY - dy;

	        dx = e.offsetX;
	        dy = e.offsetY;

	        if(cp.form != undefined){
	          lk.map(({ source, line }) => {
	            if (cp == source) {
	              cp.form.c_points.map((pnt) => {
	                if (pnt.x == line.x && pnt.y == line.y) {
	                  line.x += deltaX;
	                  line.y += deltaY;
	                  line.redraw();
	                }
	              });
	            } 
	            else {
	              cp.form.c_points.map((pnt) => {
	                if (pnt.x == line.dest_x && pnt.y == line.dest_y) {
	                  line.dest_x += deltaX;
	                  line.dest_y += deltaY;
	                  line.redraw();
	                }
	              });
	            }
	          });
	        }
	       

	        if(cp.form != undefined && cp.form.children.length > 0){
	          cp.form.children.map( (child) => {
	            if(child instanceof Line){
	              child.shift(deltaX, deltaY);
	              child.dest_x += deltaX;
	              child.dest_y += deltaY;
	              child.redraw();
	            }
	            else if(child instanceof Circle){
	              child.shift(deltaX, deltaY);
	              child.redraw();
	            }
	          });
	          
	          cp.form.shift(deltaX, deltaY);
	          cp.form.redraw();
	        }
	        // il s'agit d'une form pas d'une instance de la classe Component ou de Point
	        if(cp.form  == undefined && cp.ref == undefined){

	          if(cp instanceof Line){
	            cp.shift(deltaX, deltaY);

	            cp.dest_x += deltaX;
	            cp.dest_y += deltaY;

	            cp.redraw();
	          }
	          else {
	            cp.shift(deltaX, deltaY);
	            cp.redraw();
	          }
	        }
	      } 
	      else if (state == "drawing_link") {

	        source.form.vertex.map((v) => {
	          if (v.x == line.x && v.y == line.y) {
	            v.c_svg.classList.remove("vertex");
	            v.c_svg.classList.add("vertex_hover");
	          }
	        });

	        source.form.c_points.map((v) => {
	          if (v.x == line.x && v.y == line.y) {
	            v.c_svg.style.color = "gray";
	            v.c_svg.classList.remove("vertex");
	            v.c_svg.classList.add("vertex_hover");
	          }
	        });

	        line.dest_x = e.clientX;
	        line.dest_y = e.clientY;
	        line.redraw();
	      } 
	      else if (state == "resizing") {

	        if (source.type == "rectangle") {
	          deltaX = e.offsetX - dx;
	          deltaY = e.offsetY - dy;

	          dx = e.offsetX;
	          dy = e.offsetY;

	          // console.log(source.form.children);
	          // if(source.form != undefined && source.form.children.length > 0){
	          //   source.form.children.map( (child ) => {
	          //     if(child instanceof Line){
	          //       child.shift(deltaX, deltaY);
	          //       child.dest_x += deltaX;
	          //       child.dest_y += deltaY;
	          //       child.redraw();
	          //     }
	          //     else if(child instanceof Circle){
	          //       child.shift(deltaX, deltaY);
	          //       child.redraw();
	          //     }
	          //   });
	          // }
	          source.form.resize(pos, deltaX, deltaY);
	          source.form.redraw();
	        } 
	      }
	    },
	    mouseUpCb: function mouseupcb(e) {
	      var destination;
	      if (state == "drawing_link") {
	        id = e.srcElement.id;
	        var pnt = _Register.find(id);

	        if (pnt != undefined && pnt.ref != undefined) {
	          destination = _Register.find(pnt.ref);

	          line.dest_x = pnt.x;
	          line.dest_y = pnt.y;

	          // for automatic redrawing
	          line.redraw();
	          new Link(source, destination, line);
	        } 
	        else if (id == "svg" || pnt.ref == undefined) {
	          var ref = document.getElementById(line.uuid);
	          ref.remove();
	        }
	      }
	      state = "";
	    },
	  mouseOverCb: function mouseovercb(e) {
	      id = e.srcElement.id;

	      cp = _Register.find(id);

	      if (cp instanceof Point) {
	        cp.form.vertex.map((v) => {
	          v.c_svg.classList.remove("vertex");
	          v.c_svg.classList.add("vertex_hover");
	        });

	        cp.form.c_points.map((v) => {
	          v.c_svg.style.color = "gray";
	          v.c_svg.classList.remove("vertex");
	          v.c_svg.classList.add("vertex_hover");
	        });
	      }
	  },
	  mouseLeaveCb: function mouseleavecb(e) {
	    // id = e.srcElement.id;
	    // cp = _Register.find(id);
	    // if (cp.ref == undefined) {
	    //   cp.form.vertex.map((v) => {
	    //     v.c_svg.classList.add("vertex");
	    //     v.c_svg.classList.remove("vertex_hover");
	    //   });
	    //   cp.form.c_points.map((v) => {
	    //     v.c_svg.classList.add("vertex");
	    //     v.c_svg.classList.remove("vertex_hover");
	    //   });
	    // }
	  }
	}
	}
	var events = nativeEvents();

	/**
	 * @class Circle
	 */

	class Circle
	{
	    /**
	     * 
	     * @param {string} uuid id
	     * @param {number} x center abscissa
	     * @param {number} y   center ordinate
	     * @param {number} r radius of circle
	     * @param {array} events   array of object events
	     */

	    constructor(uuid, x = 0, y = 0, r = 5, events = []){
	        this.uuid = uuid;
	        this.x = x;
	        this.y = y;
	        this.r = r;
	        this.events = events;
	        this.c_svg = "";
	        _Register.add(this);
	    }
	    
	    /**
	     * 
	     * @param {DOMElement} svgs 
	     */
	    
	    draw(svgs){
	        var ns="http://www.w3.org/2000/svg";
	    
	        this.c_svg = document.createElementNS(ns,"circle");
	    
	        this.c_svg.setAttribute("cx", this.x);
	    
	        this.c_svg.setAttribute("cy",this.y);
	    
	        this.c_svg.setAttribute("r", this.r);

	        this.c_svg.setAttributeNS(null, "fill", "red");

	    
	        this.c_svg.setAttribute("id", this.uuid);

	        svgs.appendChild(this.c_svg);

	        this.c_svg.addEventListener("mousedown", events.mouseDownCb);

	    }

	    shift(dx, dy){
	        this.x += dx;
	        this.y += dy;
	    }

	    redraw(){

	        this.c_svg.setAttribute("cx", this.x);
	        this.c_svg.setAttribute("cy",this.y);
	    }
	}

	/**
	 * @class FactoryForm
	 */


	class FactoryForm
	{
	   /**
	    * 
	    * @param {string} uuid 
	    * @param {string} type 
	    * @param {object} props 
	    * @param {array} events 
	    * @returns form
	    */

	   static createForm(uuid, type, props = {}, events)
	    {
	        if(type == "circle")
	            return new Circle(uuid, props.x, props.y, props.r, events);
	        else if(type == "rectangle")
	            return new Rectangle(uuid, props.x, props.y, props.width, props.height, events);
	        else if(type == "line")
	            return new Line(uuid, props.x, props.y, events, props.dest_x, props.dest_y);
	        else if(type == "triangle")
	             return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
	    }
	}

	class Component
	{
	    /**
	     * 
	     * @param {string} type 
	     * @param {array} events 
	     * @param {object} params 
	     */
	    constructor( type, events = [],  props, children = [])
	    {
	        this.uuid = _uuid.generate();
	        this.type = type;
	        this.form = FactoryForm.createForm(this.uuid, type, props, events);
	        _Register.add(this);
	        this.form.draw(svg);
	        this.createChildren(children);
	    }

	    createChildren(children){

	        if(children.length > 0)
	            children.map((chd) => {
	                var child = FactoryForm.createForm(_uuid.generate(), chd.type, chd.props, chd.events);
	                this.form.children.push(child);
	                child.draw(svg);
	            });
	    }
	}

	exports.Circle = Circle;
	exports.Component = Component;
	exports.Connector = Connector;
	exports.FactoryForm = FactoryForm;
	exports.Line = Line;
	exports.Point = Point;
	exports.Rectangle = Rectangle;
	exports.Triangle = Triangle;
	exports._Register = _Register;
	exports._uuid = _uuid;
	exports.events = events;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
