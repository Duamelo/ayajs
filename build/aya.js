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
	    constructor(uuid, x=0, y=0, events){
	        
	        this.x = x;
	        this.y = y;
	        this.dest_x = x;
	        this.dest_y = y;
	        this.uuid = uuid;
	        this.events = events;
	        this.c_svg = "";
	        this.p = "";
	    }

	    draw(svgs){

	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
	        
	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", this.p);
	        this.c_svg.setAttribute("stroke", "black");
	        
	        svgs.appendChild(this.c_svg);
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

	function nativeEvents() {
	  var id;
	  var cp;
	  var dx, dy;
	  var state = "";
	  var deltaX, deltaY;
	  var line = "";
	  var source;
	  var lk;
	  var prev_pos;
	  var pos;

	  return {
	    mouseDownCb: function mousedowncb(e) {
	      dx = e.offsetX;
	      dy = e.offsetY;

	      id = e.srcElement.id;

	      cp = _Register.find(id);

	      if (id != "svg")
	        source =
	          cp != undefined && cp.parent != undefined
	            ? _Register.find(cp.parent)
	            : cp;

	      console.log(cp);
	      // console.log("----");
	      // console.log(source.form.p_resizer);
	      // console.log("---");
	      //console.log(source);

	      lk = _Register.getAllLinksByComponent(cp);

	      // un component n'a pas de propriété parent
	      if (cp != undefined && cp.parent == undefined) state = "moving";
	      else {
	        if (
	          (source.form.vertex != undefined &&
	            (pos = source.form.vertex.indexOf(cp)) >= 0) ||
	          source.form.p_resizer.length >= 0
	        ) {
	          state = "resizing";
	          dx = e.offsetX;
	          dy = e.offsetY;
	        } else {
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

	        if(cp.type == "rectangle" || cp.type == "triangle") {
	          lk.map(({ source, line }) => {
	            if (cp == source) {
	              cp.form.c_points.map((pnt) => {
	                if (pnt.x == line.x && pnt.y == line.y) {
	                  line.x += deltaX;
	                  line.y += deltaY;
	                  line.redraw();
	                }
	              });
	            } else {
	              cp.form.c_points.map((pnt) => {
	                if (pnt.x == line.dest_x && pnt.y == line.dest_y) {
	                  line.dest_x += deltaX;
	                  line.dest_y += deltaY;
	                  line.redraw();
	                }
	              });
	            }
	          });
	          
	          cp.form.shift(deltaX, deltaY);
	          cp.form.redraw();
	        }
	        else if(source.type == "circle") {
	          cp.form.x += deltaX;
	          cp.form.y += deltaY;
	          cp.form.drawResizer();
	          cp.form.redraw();
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
	      } else if (state == "resizing") {
	        if (source.type == "rectangle") {
	          deltaX = e.offsetX - dx;
	          deltaY = e.offsetY - dy;

	          dx = e.offsetX;
	          dy = e.offsetY;

	          source.form.resize(pos, deltaX, deltaY);
	          source.form.redraw();
	        } else if (source.type == "triangle") {
	          console.log("triangle is moving");

	          if (prev_pos == 0 && pos == -1) {
	            pos += 1;
	          } else if (prev_pos == 1 && pos == -1) {
	            pos += 2;
	          } else if (prev_pos == 2 && pos == -1) {
	            pos += 3;
	          }
	          console.log(pos);
	          console.log(prev_pos);
	          dx = e.offsetX;
	          dy = e.offsetY;

	          source.form.resize(pos, dx, dy);
	          source.form.redraw();
	          prev_pos = pos;
	        } else if (source.type == "circle") {
	          console.log("circle is moving");
	          //console.log(source.form);
	          deltaX = e.offsetX - dx;
	          dx = e.offsetX;
	          source.form.resize(deltaX);
	          source.form.redraw();
	        }
	      }
	    },
	    mouseUpCb: function mouseupcb(e) {
	      var destination;
	      if (state == "drawing_link") {
	        id = e.srcElement.id;
	        var pnt = _Register.find(id);

	        if (pnt != undefined && pnt.parent != undefined) {
	          destination = _Register.find(pnt.parent);

	          line.dest_x = pnt.x;
	          line.dest_y = pnt.y;

	          // for automatic redrawing
	          line.redraw();
	          new Link(source, destination, line);
	        } else if (id == "svg" || pnt.parent == undefined) {
	          var ref = document.getElementById(line.uuid);
	          ref.remove();
	        }
	      }
	      state = "";
	    },
	    mouseOverCb: function mouseovercb(e) {
	      id = e.srcElement.id;

	      cp = _Register.find(id);

	      if (cp.parent == undefined) {
	        
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
	      // if (cp.parent == undefined) {
	      //   cp.form.vertex.map((v) => {
	      //     v.c_svg.classList.add("vertex");
	      //     v.c_svg.classList.remove("vertex_hover");
	      //   });
	      //   cp.form.c_points.map((v) => {
	      //     v.c_svg.classList.add("vertex");
	      //     v.c_svg.classList.remove("vertex_hover");
	      //   });
	      // }
	    },
	  };
	}
	var events = nativeEvents();

	/**
	 *
	 * @class Point
	 * @param {number} x
	 * @param {number} y
	 *
	 */
	class Point {
	  constructor(uuid, x = 0, y = 0, r = 4) 
	  {
	    this.uuid = _uuid.generate();
	    this.parent = uuid;
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

	    //this.c_svg.setAttribute("class", "vertex");

	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	    // this.c_svg.addEventListener("mousemove", events.mouseMoveCb);
	    this.c_svg.addEventListener("mouseup", events.mouseUpCb);

	    svgs.appendChild(this.c_svg);
	  }

	  shift(dx, dy) {
	    // console.log("dx: " + dx + " dy : " + dy);
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
	    } 
	    else if (type == "triangle") {
	      cp = [];
	      for (var i = 0; i < 3; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    } 
	    else if (type == "circle") {
	      cp = [];
	      cp.push(new Point(uuid, 0, 0));
	    } 
	    else if (type == "losange") {
	      cp = [];
	      for (var i = 0; i < 4; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    }
	    return cp;
	  }
	}

	/**
	 * @class Circle
	 */

	class Circle {
	  /**
	   *
	   * @param {string} uuid id
	   * @param {number} x center abscissa
	   * @param {number} y   center ordinate
	   * @param {number} r radius of circle
	   * @param {array} events   array of object events
	   */

	  constructor(uuid, x = 0, y = 0, r = 5, events = []) {
	    this.uuid = uuid;
	    this.x = x;
	    this.y = y;
	    this.r = r;
	    this.events = events;
	    this.c_svg = "";

	    this.p_resizer = Connector.create("circle", uuid);
	    this.drawResizer();
	  }

	  /**
	   *
	   * @param {DOMElement} svgs
	   */

	  draw(svgs) {
	    var ns = "http://www.w3.org/2000/svg";

	    this.c_svg = document.createElementNS(ns, "circle");

	    this.c_svg.setAttribute("cx", this.x);

	    this.c_svg.setAttribute("cy", this.y);

	    this.c_svg.setAttribute("r", this.r);

	    this.c_svg.setAttribute("fill", "red");

	    this.c_svg.setAttribute("stroke", "yellow");

	    this.c_svg.setAttribute("stroke-width", "2.5");

	    this.c_svg.setAttribute("id", this.uuid);

	    svgs.appendChild(this.c_svg);

	    this.p_resizer.map((p_resizer) => {
	      p_resizer.draw(svgs);
	    });

	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	  }

	  drawResizer() {
	    this.p_resizer[0].x = this.x + this.r;
	    this.p_resizer[0].y = this.y;
	    this.p_resizer[0].r = 5;
	    console.log(this.p_resizer);
	  }

	  resize(deltaX) {
	      // this.r += deltaX;
	      // this.drawResizer();

	    this.r += deltaX;
	    if(this.r <= 20)
	      this.r = 20;
	    this.drawResizer();
	    }
	    

	  redraw() {
	    this.c_svg.setAttribute("cx", this.x);
	    this.c_svg.setAttribute("cy", this.y);
	    this.c_svg.setAttribute("r", this.r);

	    this.p_resizer.map((p_resizer) => {
	      p_resizer.redraw();
	    });
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

	    this.c_points = Connector.create("rectangle", uuid);
	    this.vertex = Connector.create("rectangle", uuid);
	    this.drawConnector();
	    this.drawVertex();
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

	  constructor( uuid,  x1 = 0,  y1 = 0,  x2 = 5, y2 = 5, x3 = 10, y3 = 10,  events = [] )
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

	    // this.c_points[1].x = (this.x2 + this.x3) / 2;
	    // this.c_points[1].y = (this.y2 + this.y3) / 2;
	    // this.c_points[1].r = 5;

	    // this.c_points[2].x = (this.x3 + this.x4) / 2;
	    // this.c_points[2].y = (this.y3 + this.y4) / 2;
	    // this.c_points[2].r = 5;

	    // this.c_points[3].x = (this.x1 + this.x4) / 2;
	    // this.c_points[3].y = (this.y1 + this.y1) / 2;
	    // this.c_points[3].r = 5;
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
	      this.drawConnector();
	      //console.log(this.vertex[0].x);
	    } else if (pos == 1) {
	      this.x2 = dx;
	      this.y2 = dy;
	      this.vertex[1].x = dx;
	      this.vertex[1].y = dy;
	      this.drawConnector();
	    } else if (pos == 2) {
	      this.x3 = dx;
	      this.y3 = dy;
	      this.vertex[2].x = dx;
	      this.vertex[2].y = dy;
	      this.drawConnector();
	    }
	  }
	}

	/**
	 * @class Losange class
	 */


	class Losange {

	    /**
	     * @param {string} uuid
	     * @param {abscissa starting point} x1
	     * @param {ordonne starting point} y1
	     * @param {LineTo this abscisse point}x2
	     * @param {LineTo this ordonne point} y2
	     * @param {LineTo this abscisse point}x3
	     * @param {LineTo this ordonne point} y3
	     * @param {LineTo this ordonne point} x4
	     * @param {LineTo this ordonne point} y4
	     * @param {array of object} events
	     */

	    constructor(uuid, x1 = 200, y1 = 300, x2 = 100, y2 = 400, x3 = 200, y3 = 500, x4 = 300, y4 = 400, events = [] )
	    {
	        this.uuid = uuid;

	        this.x1 = x1;
	        this.y1 = y1;

	        this.x2 = x2;
	        this.y2 = y2;

	        this.x3 = x3;
	        this.y3 = y3;

	        this.x4 = x4;
	        this.y4 = y4;

	        this.c_svg = "";
	        this.p = "";
	        this.horizontal_diagonal_center;
	        this.vertical_diagonal_center;

	        this.events = events;
	        
	        this.c_points = Connector.create("losange", uuid);
	        this.vertex = [
	            new Point(this.uuid, this.x1, this.y1, 5),
	            new Point(this.uuid, this.x2, this.y2, 5),
	            new Point(this.uuid, this.x3, this.y3, 5),
	            new Point(this.uuid, this.x4, this.y4, 5),
	        ];
	        this.drawConnector();
	    }


	    
	  draw(svgs) {
	    const ns = "http://www.w3.org/2000/svg";
	    this.c_svg = document.createElementNS(ns, "path");

	    this.p = `M ${this.x1} ${this.y1} L ${this.x2} ${this.y2} L ${this.x3} ${this.y3} L ${this.x4} ${this.y4} Z`;
	     

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

	    this.c_points[2].x = (this.x3 + this.x4) / 2;
	    this.c_points[2].y = (this.y3 + this.y4) / 2;
	    this.c_points[2].r = 5;

	    this.c_points[3].x = (this.x4 + this.x1) / 2;
	    this.c_points[3].y = (this.y4 + this.y1) / 2;
	    this.c_points[3].r = 5;
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
	            return new Line(uuid, props.x, props.y, events);
	        else if(type == "triangle")
	            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
	        else if(type == "losange")
	            return new Losange(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, props.x4, props.y4, events);
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
	    constructor( type, events = [],  props)
	    {
	        this.uuid = _uuid.generate();
	        this.type = type;
	        this.form = FactoryForm.createForm(this.uuid, type, props, events);
	        _Register.add(this);
	        this.form.draw(svg);
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
