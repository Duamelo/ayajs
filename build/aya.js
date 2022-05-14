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
	            if(obj.type == "link"){
	                if(component == obj.source || component == obj.destination)
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
	 * @class EventManager
	 */
	 class EventManager
	 {
	      constructor(){
	  
	          this.events = [];
	      }
	  
	      add(target, event, callback){
	          this.events.push([target, event, callback]);
	      }
	  
	      clear(){
	          this.destroy();
	          this.events = [];
	      }
	  
	      destroy(){
	          for(var i = 0; i < this.events.length; i++)
	          {
	              var event = this.events[i];
	              event[0].removeEventListener(event[1], event[2]);
	          }
	      }
	  
	      create(){
	          for(var i = 0; i < this.events.length; i++)
	          {
	              var event = this.events[i];
	              event[0].addEventListener(event[1], event[2]);
	          }
	      }
	 }

	/**
	 * @class Line
	 */

	class Line 
	{
	    /**
	     * 
	     * @param {string} uuid 
	     * @param {number} x 
	     * @param {number} y 
	     * @param {number} dest_x 
	     * @param {number} dest_y 
	     * @param {array of object} children 
	     * @param {object} ratio 
	     */

	    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y, children = [], ratio = {}){

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;
	        
	        this.dest_x = dest_x;
	        this.dest_y = dest_y;
	        
	        //points d'inflexion

	        this.c1 = { x : this.x, y : this.y};
	        this.c2 = { x : this.x, y : this.y};


	        this.events = new EventManager();

	        this.c_svg = "";
	        this.type = "line";

	        this.ratio = ratio;
	        this.children = [];


	        this.createChildren(children);
	        _Register.add(this);
	    }

	    draw(svgs){

	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        // var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
	        // var p = "M "+  this.x + ","+ this.y + " "+ "C " + this.c1.x+ "," + this.c1.y + " " + this.c2.x + "," + this.c2.y + " " + this.dest_x  + "," + this.dest_y;
	        var p = "M "+  this.x + ","+ this.y + " "+ "L" + this.c1.x+ "," + this.c1.y + "  L" + this.c2.x + "," + this.c2.y + "  L" + this.dest_x  + "," + this.dest_y;

	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", p);
	        this.c_svg.setAttribute("stroke", "indigo");
	        this.c_svg.setAttribute("fill", "none");
	        this.c_svg.setAttributeNS(null, "stroke-width", "1px");

	        svgs.appendChild(this.c_svg);

	        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

	        this.events.create();

	    }

	    shift(dx,dy){
	        this.x += dx;
	        this.y += dy;
	    }

	    redraw(){
	        // var p = "M "+  this.x + ","+ this.y + " "+ "C " + this.c1.x+ "," + this.c1.y + " " + this.c2.x + "," + this.c2.y + " " + this.dest_x  + "," + this.dest_y;
	        var p = "M "+  this.x + ","+ this.y + " "+ "L" + this.c1.x+ "," + this.c1.y + "  L" + this.c2.x + "," + this.c2.y + "  L" + this.dest_x  + "," + this.dest_y;
	        
	        this.c_svg.setAttribute("d", p);
	    }

	    resize(pos, dx, dy, param = {}){

	        var p = _Register.find(this.parent);

	        if( pos == 0){
	            console.log("pos = 0");
	            var c_p = p.form.c_points[pos];

	            // vertical line
	            if( this.x == this.dest_x && this.y != this.dest_y){
	                if( (this.y - c_p.y) <   (this.dest_y - c_p.y)){
	                    this.y += dy;
	                }
	                else {
	                    this.dest_y += -dy;
	                }
	            }

	            // horizontal line
	            else if( this.y == this.dest_y && this.x != this.dest_x){
	                if(  (this.x - c_p.x) <   (this.dest_x - c_p.x)  ){

	                    this.x += dx;
	                }
	                else {
	                    this.dest_x += dx;
	                }
	            }
	            else;

	        }
	        else if(pos == 1){
	            console.log("pos = 1");
	            var c_p = p.form.c_points[pos];

	            // vertical line
	            if( this.x == this.dest_x && this.y != this.dest_y){
	                if(  ( this.y - c_p.y  ) <= ( this.dest_y - c_p.y) ){
	                    this.y += dy;
	                }
	                else {
	                    this.dest_y += -dy;
	                }
	            }
	            // horizontal line
	            else if( this.y == this.dest_y && this.x != this.dest_x){
	                if( ( c_p.x - this.x) <= ( c_p.x - this.dest_x) ){

	                    this.x += dx;
	                }
	                else {
	                    this.dest_x += dx;
	                }
	            }
	            else;

	        }
	        else if(pos == 2){
	            console.log("pos = 2");
	            var c_p = p.form.c_points[pos];

	            // vertical line
	            if( this.x == this.dest_x && this.y != this.dest_y){
	                if(  ( c_p.y - this.y ) <= ( c_p.y - this.dest_y ) ){
	                    this.y += dy;
	                }
	                else {
	                    this.dest_y += dy;
	                }
	            }
	            // horizontal line
	            else if( this.y == this.dest_y && this.x != this.dest_x){
	                if( ( c_p.x - this.x) <= ( c_p.x - this.dest_x) ){

	                    this.x += dx;
	                }
	                else {
	                    this.dest_x += dx;
	                }
	            }
	            else;

	        }
	        else if(pos == 3){
	            console.log("pos = 3");
	            var c_p = p.form.c_points[pos];

	            // vertical line
	            if( this.x == this.dest_x && this.y != this.dest_y){
	                if(  ( c_p.y - this.y ) <= ( c_p.y - this.dest_y ) ){
	                    this.y += dy;
	                }
	                else {
	                    this.dest_y += dy;
	                }
	            }
	            // horizontal line
	            else if( this.y == this.dest_y && this.x != this.dest_x){
	                if( ( this.x - c_p.x ) <= ( this.dest_x - c_p.x) ){

	                    this.x += dx;
	                }
	                else {
	                    this.dest_x += dx;
	                }
	            }
	            else;

	        }
	    }


	    createChildren(children){
	        children.map((chd) => {

	        });
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
	       this.type = "link";
	       _Register.add(this);
	       
	       console.log(this);
	    }

	    redraw(){
	        this.smallWay();

	        var delta_x, delta_y, c1 = {x : 0, y: 0}, c2 = {x : 0, y: 0};

	        delta_x = (this.line.x > this.line.dest_x) ? this.line.x - this.line.dest_x :  -(this.line.x - this.line.dest_x);
	        delta_y = (this.line.y > this.line.dest_y) ? this.line.y - this.line.dest_y :  -(this.line.y - this.line.dest_y);
	        
	        console.log("delta_x,delta_y");
	        console.log(delta_x,delta_y);
	        console.log("this.line");
	        console.log(this.line);

	        // c1.x = (this.line.x > this.line.dest_x) ? this.line.x - delta_x/2 : this.line.x + delta_x/2;
	        // c1.y = (this.line.y > this.line.dest_y) ? this.line.y  : this.line.dest_y;

	        // c2.x = c1.x;
	        // c2.y = -delta_y + c1.y;

	        delta_x /= 2;
	        c1.x = (this.line.x < this.line.dest_x) ? this.line.x + delta_x : this.line.x - delta_x;
	        c1.y = this.line.y;

	        c2.x = (this.line.dest_x < this.line.x) ? this.line.dest_x + delta_x : this.line.dest_x - delta_x;
	        c2.y = this.line.dest_y;

	        console.log('c1');
	        console.log(c1);
	        console.log('c2');
	        console.log(c2);

	        this.line.c1 = c1;
	        this.line.c2 = c2;

	        this.line.redraw();
	        
	    }

	    
	    smallWay(){
	        function calculateDistance(a, b){
	            return (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y);
	            // return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
	            
	        }

	        //get source point
	        var srcPoint, destPoint; 

	        this.source.form.c_points.forEach(elt => {
	            if( elt.x == this.line.x && elt.y == this.line.y){
	                console.log(' source point  found ');
	                console.log(elt);
	                srcPoint = elt;
	            }
	                
	        });

	        //get destination point
	        this.destination.form.c_points.forEach(elt => {
	            if( elt.x == this.line.dest_x && elt.y == this.line.dest_y){
	                console.log(' destination point found ');
	                console.log(elt);
	                destPoint = elt;
	            }
	                
	        });

	        //calculate Min distance

	            //first value of minValue
	        var minValue = calculateDistance(this.source.form.c_points[0], destPoint);
	        
	        this.source.form.c_points.forEach(ptSource => {

	            this.destination.form.c_points.forEach(ptDest => {
	                var newDistance = calculateDistance(ptSource, ptDest);
	                if( minValue >= newDistance){
	                    minValue = newDistance;
	                    
	                    srcPoint = ptSource;
	                    destPoint = ptDest;
	                }
	            });
	            

	        });


	 
	        this.line.x = srcPoint.x;
	        this.line.y = srcPoint.y;

	        this.line.dest_x = destPoint.x;
	        this.line.dest_y = destPoint.y;


	        //calculate distance between source and destination



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
	            line = new Line(id, cp.x, cp.y);
	            line.draw(svg);
	          }
	        }
	      }



	      

	      console.log(cp);
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


	          cp.form.children.map( (child) => {
	            if(child.type == "line"){
	              child.shift(deltaX, deltaY);
	              child.dest_x += deltaX;
	              child.dest_y += deltaY;
	              child.redraw();
	            }
	            else {
	              child.shift(deltaX, deltaY);
	              child.redraw();
	            }
	          });
	          
	          cp.form.shift(deltaX, deltaY);
	          cp.form.redraw();
	        }

	        // il s'agit d'une form pas d'une instance de la classe Component ou de Point
	        if(cp.form  == undefined && cp.ref == undefined){

	          if(cp.type == "line"){
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

	        if (source) {
	          deltaX = e.offsetX - dx;
	          deltaY = e.offsetY - dy;

	          dx = e.offsetX;
	          dy = e.offsetY;

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

	          /* faire le calcul automatique ici*/

	          // for automatic redrawing
	          // line.redraw();
	          new Link(source, destination, line).redraw();

	        } 
	        else if (id == "svg" || pnt.ref == undefined) {
	          var ref = document.getElementById(line.uuid);
	          ref.remove();
	        }
	      }
	      state = "";
	    },
	  mouseOverCb: function mouseovercb(e) {
	      // id = e.srcElement.id;

	      // cp = _Register.find(id);

	      // if (cp.type == "point") {
	      //   cp.form.vertex.map((v) => {
	      //     v.c_svg.classList.remove("vertex");
	      //     v.c_svg.classList.add("vertex_hover");
	      //   });

	      //   cp.form.c_points.map((v) => {
	      //     v.c_svg.style.color = "gray";
	      //     v.c_svg.classList.remove("vertex");
	      //     v.c_svg.classList.add("vertex_hover");
	      //   });
	      // }
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
	 *
	 * @class Point
	 * @param {number} x
	 * @param {number} y
	 *
	 */

	class Point {
	  constructor(uuid, x = 0, y = 0, r = 3) {

	    this.ref = uuid;
	    this.uuid = _uuid.generate();

	    this.x = x;
	    this.y = y;
	    this.r = r;

	    this.c_svg = "";

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
	    //this.c_svg.addEventListener("mousemove", events.mouseMoveCb);
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

	/**
	 * @class Circle
	 */
	class Circle
	{
	    /**
	     * 
	     * @param {string} uuid 
	     * @param {number} x 
	     * @param {number} y 
	     * @param {number} r 
	     * @param {array of object} children 
	     * @param {object} ratio 
	     * @param {boolean} zoom 
	     */

	    constructor(uuid, x = 0, y = 0, r = 5, children = [], ratio = {}, zoom){

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;
	        this.r = r;

	        this.events = new EventManager();

	        this.children = [];

	        this.box = "";
	        this.c_svg = "";
	        this.type = "circle";

	        this.ratio = ratio;
	        this.zoom = zoom;
	      
	        this.c_points = [
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 )
	        ];
	        this.vertex = [
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 ),
	            new Point(this.uuid,0, 0 )
	        ];

	        this.createChildren(children);
	       
	        _Register.add(this);
	    }


	  
	    drawVertex(){
	        this.vertex[0].x = this.x - this.r;
	        this.vertex[0].y = this.y - this.r;
	    
	        this.vertex[1].x = this.x + this.r;
	        this.vertex[1].y = this.y - this.r;

	        this.vertex[2].x = this.x + this.r;
	        this.vertex[2].y = this.y + this.r;
	    
	        this.vertex[3].x = this.x - this.r;
	        this.vertex[3].y = this.y + this.r;

	        
	    }
	    
	    drawConnector() {
	        this.c_points[0].x = this.x;
	        this.c_points[0].y = this.y - this.r;

	        this.c_points[1].x = this.x + this.r;
	        this.c_points[1].y = this.y;


	        this.c_points[2].x = this.x;
	        this.c_points[2].y = this.y + this.r;

	        this.c_points[3].x = this.x - this.r;
	        this.c_points[3].y = this.y;
	    }

	    drawBox(){

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
	    
	    /**
	     * 
	     * @param {DOMElement} svgs 
	     */
	    
	    draw(svgs){
	        var ns="http://www.w3.org/2000/svg";

	        this.box = document.createElementNS(ns, "path");
	        this.c_svg = document.createElementNS(ns,"circle");

	        this.c_svg.setAttribute("id", this.uuid);

	        this.c_svg.setAttribute("cx", this.x);

	        this.c_svg.setAttribute("cy",this.y);

	        this.c_svg.setAttribute("r", this.r);
	        
	        this.c_svg.setAttribute("fill", "rgb(224, 115, 115)");

	        this.c_svg.setAttribute("fill", "rgb(224, 115, 115)");

	        this.c_svg.setAttribute("stroke", "rgb(82, 170, 214)");

	    
	        this.c_svg.setAttribute("stroke-width", "1.5");
	    
	      
	        /** draw box */
	        this.drawBox();
	        this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
	        this.box.setAttributeNS(null, "stroke-width", "1px");
	        this.box.setAttributeNS(null, "fill", "none");
	        this.box.setAttribute("stroke-dasharray", "4");

	        
	        svgs.appendChild(this.c_svg);
	        svgs.appendChild(this.box);

	        this.drawVertex();
	        this.drawConnector();

	        this.c_points.map((point) => {
	            point.draw(svgs);
	          });
	      
	          this.vertex.map((point) => {
	            point.draw(svgs);
	          });
	      

	        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

	        this.events.create();
	    }

	    shift(dx, dy){
	        this.x += dx;
	        this.y += dy;
	    }

	    redraw(){
	        this.c_svg.setAttribute("cx", this.x);
	        this.c_svg.setAttribute("cy",this.y);
	        this.c_svg.setAttribute("r", this.r);

	        this.drawConnector();
	        this.drawVertex();
	        this.drawBox();


	        this.vertex.map((vert) => {
	            vert.redraw();
	            });

	            this.c_points.map( (point) => {
	            point.redraw();
	        });

	    }

	    resize(pos, dx, dy, param = {}){
	        if(Object.keys(param).length > 0){
	            if( this.zoom == false && Object.keys(this.ratio).length > 0 ){
	                this.x = param.x + this.ratio.x * param.width;
	                this.y = param.y + this.ratio.y * param.height;
	            }
	            else {
	                this.x = param.x + this.ratio.x * param.width;
	                this.y = param.y + this.ratio.y * param.height;
	                (param.width <= param.height) ? this.r = this.ratio.r * param.width : this.r = this.ratio.r * param.height;
	            }
	        }
	        else {
	            if(pos == 0)
	                this.r += -dx;
	            else if(pos == 1)
	                this.r += dx;
	            else if(pos == 2)
	                this.r += dx;
	            else
	                this.r -= dx;
	        }

	        
	    }

	    createChildren(children){
	        children.map( (chd) => {

	        });
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
	      for (var i = 0; i < 4; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    } 
	    else if (type == "losange") {
	      cp = [];
	      for (var i = 0; i < 6; i++) {
	        cp.push(new Point(uuid, 0, 0));
	      }
	    }
	    else ;
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
	   * @param {array of object} children 
	   * @param {object} ratio 
	   */

	  constructor(uuid, x = 0, y = 0, width = 10, height = 10, children = [], ratio = {}, zoom = false) {

	    this.uuid = uuid;

	    this.x = x;
	    this.y = y;

	    this.width = width;
	    this.height = height;

	    this.events = new EventManager();

	    this.c_svg = "";

	    this.type = "rectangle";
	    this.children = [];
	    this.ratio = ratio;
	    this.zoom = zoom;


	    this.c_points = Connector.create("rectangle", this.uuid);
	    this.vertex = Connector.create("rectangle", this.uuid);

	    this.createChildren(children);
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


	    this.drawConnector();
	    this.drawVertex();

	    this.c_points.map((point) => {
	      point.draw(svgs);
	    });

	    this.vertex.map((point) => {
	      point.draw(svgs);
	    });


	    this.children.map((child) => {
	      child.draw(svgs);
	    });

	    this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
	    this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
	    this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
	    this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

	    this.events.create();

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

	    this.children.map ( (child) => {
	        child.redraw();
	    });
	  }

	  resize(pos, dx, dy, param = {} ) {

	   
	    if(Object.keys(param).length > 0 && !this.zoom && Object.keys(this.ratio).length > 0){
	        this.x = param.x + (this.ratio.x * param.width);
	        this.y = param.y + (this.ratio.y * param.height);
	        this.width = this.ratio.width * param.width;
	        this.height = this.ratio.height * param.height;
	        this.drawConnector();
	        this.drawVertex();
	    }
	    else {
	      if (pos == 0) {

	        this.shift(dx, dy);
	  
	        this.width += -dx;
	        this.height += -dy;
	  
	        this.children.map ( (child) => {
	            child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
	        });
	        this.drawVertex();
	        this.drawConnector();
	      } 
	      else if (pos == 1) {
	  
	        this.y += dy;
	  
	        this.width += dx;
	        this.height += -dy;
	  
	        this.children.map ( (child) => {
	          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
	        });
	  
	        this.drawVertex();
	        this.drawConnector();
	      } 
	      else if (pos == 2) {
	  
	        this.width += dx;
	        this.height += dy;
	  
	        this.children.map ( (child) => {
	          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
	        });
	  
	        this.drawVertex();
	        this.drawConnector();
	      } 
	      else if (pos == 3) {
	  
	        this.x += dx;
	  
	        this.width += -dx;
	        this.height += dy;
	  
	        this.children.map ( (child) => {
	          child.resize(pos, dx, dy, { x: this.x, y: this.y, width: this.width, height: this.height});
	        });
	  
	        this.drawVertex();
	        this.drawConnector();
	      }
	    }
	  }


	  createChildren(children){
	    children.map( (chd) => {
	      if(chd.type == "circle"){
	        var abs = this.x +  (chd.ratio.x * this.width);
	        var ord = this.y + (chd.ratio.y * this.height);
	        var rayon = (chd.ratio.r * this.width);
	        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x: abs, y: ord, r: rayon},[], chd.ratio, chd.zoom);
	        this.children.push(child);
	      }
	      else if(chd.type == "rectangle"){
	        var _x = this.x + (chd.ratio .x * this.width);
	        var _y = this.y + (chd.ratio.y * this.height);
	        var _width = chd.ratio.width * this.width;
	        var _height = chd.ratio.height * this.height ;
	        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x: _x, y: _y, width: _width, height: _height}, [], chd.ratio, chd.zoom);
	        this.children.push(child);
	      }
	      else if(chd.type == "triangle"){
	        var _x1 = this.x + (chd.ratio.p1.x * this.width);
	        var _y1 = this.y + (chd.ratio.p1.y * this.height); 
	      
	        var _x2 = this.x + (chd.ratio.p2.x * this.width);
	        var _y2 = this.y + (chd.ratio.p2.y * this.height); 

	        var _x3 = this.x + (chd.ratio.p3.x * this.width);
	        var _y3 = this.y + (chd.ratio.p3.y * this.height); 

	        var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x1: _x1, y1: _y1, x2: _x2, y2: _y2, x3: _x3, y3: _y3}, [], chd.ratio, chd.zoom);
	        this.children.push(child);
	      }
	      else if(chd.type == "losange");
	    });
	  }
	}

	/**
	 * @class Triangle
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
	  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, children = [], ratio = {}, zoom = false )
	  {

	    this.uuid = uuid;

	    this.x1 = x1;
	    this.y1 = y1;

	    this.x2 = x2;
	    this.y2 = y2;

	    this.x3 = x3;
	    this.y3 = y3;

	    this.events = new EventManager();

	    this.c_svg = "";
	    this.p = "";

	    this.type = "triangle";
	    this.ratio = ratio;
	    this.zoom = zoom;

	    this.children = [];

	    this.c_points = Connector.create("triangle", this.uuid);
	    this.vertex = Connector.create("triangle", this.uuid);

	    this.createChildren(children);
	    _Register.add(this);
	  }

	  draw(svgs) {
	    const ns = "http://www.w3.org/2000/svg";
	    this.c_svg = document.createElementNS(ns, "path");

	    this.p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";


	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.setAttribute("d", this.p);
	    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
	    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
	    this.c_svg.setAttribute("fill", "lavenderblush");

	    svgs.appendChild(this.c_svg);


	    this.drawConnector();
	    this.drawVertex();

	    this.c_points.map((point) => {
	      point.draw(svgs);
	    });

	    this.vertex.map((v) => {
	      v.draw(svgs);
	    });

	    // this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
	    // this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
	    // this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
	    // this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

	    // this.events.create();
	  }

	  drawVertex(){
	    this.vertex[0].x = this.x1;
	    this.vertex[0].y = this.y1;
	    this.vertex[0].r = 3;

	    this.vertex[1].x = this.x2 ;
	    this.vertex[1].y = this.y2 ;
	    this.vertex[1].r = 3;

	    this.vertex[2].x =  this.x3;
	    this.vertex[2].y =  this.y3;
	    this.vertex[2].r = 3;
	  }

	  drawConnector() {
	    this.c_points[0].x = (this.x1 + this.x2) / 2;
	    this.c_points[0].y = (this.y1 + this.y2) / 2;
	    this.c_points[0].r = 3;

	    this.c_points[1].x = (this.x2 + this.x3) / 2;
	    this.c_points[1].y = (this.y2 + this.y3) / 2;
	    this.c_points[1].r = 3;

	    this.c_points[2].x = (this.x1 + this.x3) / 2;
	    this.c_points[2].y = (this.y1 + this.y3) / 2;
	    this.c_points[2].r = 3;

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
	    this.p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";

	    this.c_svg.setAttribute("d", this.p);

	    this.c_points.map((p) => {
	      p.redraw();
	    });
	    this.vertex.map((v) => {
	      v.redraw();
	    });
	  }
	  
	  resize(pos, dx, dy, param = {}) {

	    if(param.parent == "rectangle"){
	      if(Object.keys(this.ratio).length > 0){

	        (this.zoom == false) ? 
	          this.shift(dx,dy):
	        undefined ;
	      }
	    }
	    else {
	      if (pos == 0) {
	        this.x1 = dx;
	        this.y1 = dy;
	        this.vertex[0].x = dx;
	        this.vertex[0].y = dy;
	        this.drawConnector();
	      } 
	      else if (pos == 1) {
	        this.x2 = dx;
	        this.y2 = dy;
	        this.vertex[1].x = dx;
	        this.vertex[1].y = dy;
	        this.drawConnector();
	      }
	      else if (pos == 2) {
	        this.x3 = dx;
	        this.y3 = dy;
	        this.vertex[2].x = dx;
	        this.vertex[2].y = dy;
	        this.drawConnector();
	      }
	 
	    }
	  }


	  createChildren(children){
	    children.map( (chd) => {

	    });
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
	     * @param {array of object} children 
	     * @param {pbject} ratio 
	     * @param {boolean} zoom 
	     * @returns @form
	     */

	   static createForm(uuid, type, props = {}, children = [], ratio = {}, zoom = false)
	    {
	        if(type == "circle")
	            return new Circle(uuid, props.x, props.y, props.r, children, ratio, zoom);
	        else if(type == "rectangle")
	            return new Rectangle(uuid, props.x, props.y, props.width, props.height, children, ratio, zoom);
	        else if(type == "line")
	            return new Line(uuid, props.x, props.y, props.dest_x, props.dest_y, children, ratio, zoom);
	        else if(type == "triangle")
	            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, children, ratio, zoom);

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
	    constructor( type, props, children = [])
	    {
	        this.uuid = _uuid.generate();
	        this.type = type;
	        this.form = FactoryForm.createForm(this.uuid, type, props, children);
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
