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
	    
	        this.c_svg.setAttribute("id", this.uuid);

	        svgs.appendChild(this.c_svg);
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
	        this.uuid = uuid;
	        this.events = events;
	        this.c_svg = "";
	    }

	    draw(svgs){

	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.x  + "," + this.y;
	        
	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", p);
	        this.c_svg.setAttribute("stroke", "black");
	        
	        svgs.appendChild(this.c_svg);
	    }

	    redraw(x, y){
	        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + x  + "," + y;
	        this.c_svg.setAttribute("d", p);
	    }
	}

	function nativeEvents(){
	    var id;
	    var cp;
	    var dx, dy;
	    var state = "";
	    var deltaX, deltaY;
	    var line = "";


	    return {
	        mouseDownCb: function mousedowncb(e){
	        
	            console.log(e.target);
	            
	        
	            dx = e.offsetX;
	            dy = e.offsetY;
	            
	            id = e.srcElement.id;
	            cp = _Register.find(id);
	        
	            if(cp.parent == undefined)
	                state = "moving";
	            else {
	                state = "drawing";
	                id = _uuid.generate();

	                console.log("cp down ");
	                console.log(cp);
	                line = new Line(id, cp.x, cp.y, []);
	                
	                line.draw(svg);
	            }
	            console.log("mouse down state = " + state);


	                
	        },
	        mouseMoveCb: function movecb(e){
	    
	            console.log("move");
	            if(state == "moving"){
	                
	                deltaX = e.offsetX - dx;
	                deltaY = e.offsetY - dy;
	        
	        
	                // deltaX = cp.form.x + deltaX;
	                // deltaY = cp.form.y + deltaY;
	                
	                dx = e.offsetX;
	                dy = e.offsetY;
	        
	                cp.form.redraw(deltaX, deltaY);
	            }
	            else if (state == "drawing"){
	               
	                line.redraw(e.clientX, e.clientY);
	            }
	        },

	        mouseUpCb: function mouseupcb(e){
	            console.log("mouse up ");
	            
	            state = "";
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
	class Point
	{
	    constructor(uuid, x = 0, y = 0, r = 5)
	    {
	        this.uuid = _uuid.generate();
	        this.parent = uuid;
	        this.x = x;
	        this.y = y;
	        this.r = r;
	        _Register.add(this);
	    }

	    draw(svgs){
	        var ns="http://www.w3.org/2000/svg";
	    
	    this.c_svg = document.createElementNS(ns,"circle");
	    
	    this.c_svg.setAttribute("cx", this.x);
	    
	    this.c_svg.setAttribute("cy",this.y);
	    
	    this.c_svg.setAttribute("r", this.r);
	    
	    this.c_svg.setAttribute("id", this.uuid);
	    this.c_svg.addEventListener("mousedown", events.mouseDownCb);

	    svgs.appendChild(this.c_svg);
	    }

	    redraw(x,y){
	        this.x += x;
	        this.y +=y;

	        this.c_svg.setAttribute("cx", this.x);
	    
	        this.c_svg.setAttribute("cy",this.y);
	        
	    }
	}

	class Connector
	{
	    static create(type, uuid){
	        var cp = [];

	        if(type == 'rectangle'){
	           for(var i = 0; i < 8; i++){
	               cp.push(new Point(uuid, 0, 0, 5));
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
	    
	    constructor(uuid, x= 0, y = 0, width = 10, height = 10, events = []){
	        
	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;

	        this.width = width;
	        this.height = height;
	      
	        this.events = events;
	        this.c_svg = "";
	        
	        this.c_points = Connector.create('rectangle', uuid);
	        this.createConnector();
	    }


	    draw(svgs){

	        const svgns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(svgns,'rect');

	        this.c_svg.setAttributeNS(null, 'x', this.x);
	        this.c_svg.setAttributeNS(null, 'y', this.y);
	        this.c_svg.setAttributeNS(null, 'id', this.uuid);
	        this.c_svg.setAttributeNS(null, 'height', this.height);
	        this.c_svg.setAttributeNS(null, 'width',this.width);
	        this.c_svg.setAttributeNS(null, 'stroke', 'black');
	        this.c_svg.setAttributeNS(null, 'stroke-width', '3px');
	        this.c_svg.setAttributeNS(null, 'fill', 'cornsilk');


	        svgs.appendChild(this.c_svg);

	        this.c_points.map( (point) => {
	            point.draw(svgs);
	        });

	        this.c_svg.addEventListener("mousedown", events.mouseDownCb);
	        this.c_svg.addEventListener("mouseup", events.mouseUpCb);
	     }

	    createConnector(){
	        this.c_points[0].x =  this.x;
	        this.c_points[0].y =  this.y;
	        this.c_points[0].r =  5;

	        this.c_points[1].x =  this.x + this.width/2;
	        this.c_points[1].y =  this.y;
	        this.c_points[1].r =  5;

	        this.c_points[2].x =  this.x + this.width;
	        this.c_points[2].y =  this.y;
	        this.c_points[2].r =  5;

	        this.c_points[3].x =  this.x + this.width;
	        this.c_points[3].y =  this.y + this.height/2;
	        this.c_points[3].r =  5;

	        this.c_points[4].x =  this.x + this.width;
	        this.c_points[4].y =  this.y + this.height;
	        this.c_points[4].r =  5;

	        this.c_points[5].x =  this.x + this.width/2;
	        this.c_points[5].y =  this.y + this.height;
	        this.c_points[5].r =  5;

	        this.c_points[6].x =  this.x;
	        this.c_points[6].y =  this.y + this.height;
	        this.c_points[6].r =  5;

	        this.c_points[7].x =  this.x;
	        this.c_points[7].y =  this.y + this.height/2;
	        this.c_points[7].r =  5;
	    }


	    redraw(x,y){
	        
	        this.x += x;
	        this.y += y;

	      this.c_svg.setAttribute("x", this.x);
	      this.c_svg.setAttribute("y", this.y);
	      this.c_points.map((p)=>{
	          p.redraw(x,y);
	      });
	    }
	}

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

	   static createForm(uuid, type, props, events)
	    {
	        if(type == "circle")
	            return new Circle(uuid, props.x, props.y, props.r, events);
	        else if(type == "rectangle")
	            return new Rectangle(uuid, props.x, props.y, props.width, props.height, events);
	        else if(type == "line")
	            return new Line(uuid, props.x, props.y, events);
	        // else if(type == "triangle")
	        //     return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
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
	exports._Register = _Register;
	exports._uuid = _uuid;
	exports.events = events;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
