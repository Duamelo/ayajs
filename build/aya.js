(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.aya = {}));
})(this, (function (exports) { 'use strict';

	var config =  {
	    svg : null,

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
	        stroke : "indigo",
	        strokeWidth : "2px",
	        fill : "none",
	        strokeDasharray : "4"
	    },

	    point : {
	        fill  : "black",
	        strokeWidth : "1pt",
	        radius : 3,
	    },

	    line : {
	        stroke: "black",
	        fill : "white",
	        strokeWidth : "1px",
	        strokeDasharray : "4",
	        strokelinejoin: "round"
	    },
	    link: {
		type: "broke",
	        end_start : "triangle",
	        end_dest : "triangle",
	    },
	    text : {
	        fill : "black",
	        fontfamily: "helvetica",
	        fontsize: 15,
	        size: 80,
	        fillOpacity : "100",
	        stroke : "black",
	        strokeWidth : "0.5pt",
	        strokeOpacity : 100,
	        strokeDasharray : 10.5,
	        strokeDashoffset : 10.5,
	    },
	    ends : {
	        tri: {
	            h: 8,
	            base: 8,
	            fill: "white",
	            stroke: "black",
	            strokeWidth: "1px"
	        },
	        circle: {
	            r: 3.5,
	            fill: "white",
	            stroke: "black",
	            strokeWidth: "1px"
	        },
	        lozenge: {

	        },
		minspace: 10
	    },
	    linkcb: null
	};

	class _Register
	{
	    static store = {};

	    static add(object) {
	        _Register.store[object.uuid] = object;
	    }

	    static find(uuid){
	        return _Register.store[uuid];
	    }

	    static clear(uuid){
	        delete _Register.store[uuid];
	    }
	    
	    static findAllLink(component){
	        var result = [];
	        Object.keys(_Register.store).map((id) => {
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
	        Object.keys(_Register.store).map((id) => {
	            var obj = _Register.find(id);
	            if(obj.shape && obj.type != 'link') // it means the obj is a component
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
	 * Abstract class representing a generic prototype for all shapes
	 * 
	 * @abstract 
	 * 
	 * @class Shape
	 *  
	 */
	class Shape
	{
	    addEvent(event, callback) {

	    };

	    deleteEvent(event){

	    }

	    deleteAllEvents(){
	        
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
	}

	/**
	 * @class Line
	 */
	class Line extends Shape{

	    /**
	     * @param {String} uuid 
	     * @param {Number} x 
	     * @param {Number} y 
	     * @param {Number} dest_x 
	     * @param {Number} dest_y 
	     */
	    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y){

		super();

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;

	        this.c1 = {
	            x: this.x,
	            y: this.y
	        };

	        this.c2 = {
	            x: this.x,
	            y: this.y
	        };

	        this.dest_x = dest_x;
	        this.dest_y = dest_y;

	        this.events = {};

	        this.config = config;

	        this.svg = this.config.svg;

	        this.c_svg = "";
	        this.type = "line";
	        this.p = null;
		this.path_is_set = false;

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.scaleX = 1;
	        this.scaleY = 1;
	    
	        this.angle = 0;

	        this.children = [];

	        this.vertex = [
	            new Point(this.uuid, 0, 0, 3),
	            new Point(this.uuid, 0, 0, 3),
	        ];
	        this.c_points = [];
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

	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
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
	    
	    setPath(points = [{}]){
	        this.path_is_set = true;
	        this.p = "M "+  (this.x) + ","+ (this.y) + " ";

	        points.map((pt)=>{
	            this.p +=  "L "  + (pt.x) + ","+ (pt.y) + " ";
	        });
	        this.p += "L " +  (this.dest_x)  + "," + (this.dest_y);
	    }

	    setPathCur(points = [{}]){
	        this.path_is_set = true;
	        var vertical = false;
	        var y_inverse = 1;
	        var x_inverse = 1;
	        var i_inverse = 1;
	        var i_xinverse = 1;
	        this.p = "M "+  (this.x) + ","+ (this.y) + " ";

	        if ((this.y < points[0].y && this.dest_y < points[1].y) ||
	            (this.y > points[0].y && this.dest_y > points[1].y))
	            i_inverse = -1;

	        if ((this.x < points[0].x && this.dest_x < points[1].x) ||
	            (this.x > points[0].x && this.dest_x > points[1].x))
	            i_xinverse = -1;

	        if (this.x > this.dest_x)
	            x_inverse = -1;

	        if (this.dest_y > this.y)
	            y_inverse = -1;

	        if (points[0].x == points[1].x)
	            vertical = true;
	        
	        for (var i = 0; i < points.length; i++){
	            if (vertical){
	                this.p += "L " + (points[i].x - 5 * (i == 0) * x_inverse * i_xinverse) + "," + (points[i].y + 5 * i * y_inverse) + " ";

	                this.p += "C " + (points[i].x - 2.5 * (i == 0) * x_inverse * i_xinverse) + "," + (points[i].y + 2.5 * i * y_inverse) + " , " + 
	                                (points[i].x  + 2.5 * i * x_inverse) + "," + (points[i].y - 2.5 * (i == 0) * y_inverse) + " , " + 
	                                (points[i].x + 5 * i * x_inverse) + "," + (points[i].y - 5 * (i == 0) * y_inverse); 
	            }
	            else {
	                this.p += "L " + (points[i].x - 5 * i * x_inverse) + "," + (points[i].y + 5 * y_inverse *  !i) + " ";
	        
	                this.p += "C " + (points[i].x - 2.5 * i * x_inverse) + "," + (points[i].y + 2.5 * y_inverse * !i) + " , " + 
	                                (points[i].x + 2.5 * x_inverse * !i) + "," + (points[i].y -( 2.5 * y_inverse * i * i_inverse)) + " , " + 
	                                (points[i].x + 5 * x_inverse * !i) + "," + (points[i].y - 5 * y_inverse * i * i_inverse); 
	            }
	        }
	        this.p += "L " + (this.dest_x) + "," + (this.dest_y) + " ";
	    }

	    draw(){
	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'path');

	        if (this.p == null)
	            this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

	        this.c_svg.setAttribute("id", this.uuid);
	        this.c_svg.setAttribute("d", this.p);
	        this.c_svg.setAttribute("fill", this.config.line.fill);
	        this.c_svg.setAttribute("stroke", this.config.form.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.line.strokeWidth);
	        // this.c_svg.setAttributeNS(null, "stroke-linejoin","round");
	        this.c_svg.setAttribute("class", "strokelinejoin");


	        this.svg.appendChild(this.c_svg);

	        this.drawVertex();

	        this.vertex.map((vertex) => {
	            vertex.draw();
	        });

	        this.children.map(({child}) =>{
	            child.draw();
	        });
	        this.addEvent("mousedown", (e) => {
	            Events.mousedowncb(e);
	        });
	        this.addEvent("mouseleave", (e) => {
	            Events.mouseleavecb(e);
	        });
	        this.addEvent("mouseover", (e) => {
	            Events.mouseovercb(e);
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

	    shift(dx,dy){
	        this.x += dx;
	        this.y += dy;

	        this.dest_x += dx;
	        this.dest_y += dy;

	        this.children.map(({child}, index) => {
	            child.shift(dx, dy);
	        });
	    }

	    redraw(){
	        this.drawVertex();

	        this.vertex.map((vertex) => {
	            vertex.redraw();
	        });

		if (!this.path_is_set)
	            this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);
		else
		    this.path_is_set = false;

	        this.c_svg.setAttribute("d", this.p);

	        this.children.map(({child}) => {
	            child.redraw();
	        });
	   }

	    calculateAngle(){
	        var angle = 0;
	        // we can ommit the slope
	        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);
	        if(this.dest_x == this.x)
	            angle = Math.PI/2;
	        if(pente == 0)
	            angle = 0;
	        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
	            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
	            Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
	            Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
	            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
	            Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
	            Math.pow((this.y - this.dest_y), 2))) );
	        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
	            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
	            angle = Math.PI - Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
	        return angle;
	    }

	    inclination(){
	        var angle = 0;
	        // we can ommit the slope
	        var slope = (this.dest_y - this.y) / (this.dest_x - this.x);
	        if(this.dest_x == this.x)
	            angle = Math.PI/2;
	        else if(slope == 0)
	            angle = 0;
	        else 
	            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
	                Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
	                Math.pow((this.y - this.dest_y), 2))) );

	        if (slope > 0)
	            angle *= -1;
	        return angle;
	    }

	    resize(pos, dx, dy){
	        if(pos == 0){
	            this.x += dx;
	            this.y += dy;

	            if (this.children[0]) 
	                this.children[0].child.shift(dx, dy);
	        }
	        else {
	            this.dest_x += dx;
	            this.dest_y += dy;

	            if (this.children[1]) 
	                this.children[1].child.shift(dx, dy);
	        }
	        this.children.map(({child}, index) => {
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
	}

	/**
	 * @class Link
	 */
	class Link
	{
	    constructor(src_id, dest_id, userconfig = {})
	    {
		var obj = {};
	        this.uuid = _uuid.generate();

	        var src =  _Register.find(src_id);
	        var dest =  _Register.find(dest_id);

		if (!src || !dest)
	            throw new Error("component is missing");

	        this.type = "link";

		this.src_end_csvg = null;
		this.dest_end_csvg = null;

		if (userconfig.subtype)
		    this.subtype = userconfig.subtype;
		else
		    this.subtype = config.link.type;

		if (userconfig.end_start)
		    this.end_start = userconfig.end_start;
		else
		    this.end_start = config.link.end_start;

		if (userconfig.end_dest)
		    this.end_dest = userconfig.end_dest;
		else
		    this.end_dest = config.link.end_dest;

	    this.altpath = userconfig.altpath ? true : false;

		if (this.subtype != "broke")
		    obj = this.optimal(src, dest);
		else
	            obj = this.breakline(src, dest);

		/* reference on connexion points*/
	        this.source = src.shape.c_points[obj.src];
	        this.destination = dest.shape.c_points[obj.dest];

		this.line = new Line(_uuid.generate(),
				     this.source.x,
				     this.source.y,
				     this.destination.x,
				     this.destination.y
				    );

		if (this.subtype == "broke"){
		    this.line.c1.x = obj.c1.x;
	            this.line.c1.y = obj.c1.y;
	            this.line.c2.x = obj.c2.x;
	            this.line.c2.y = obj.c2.y;
		    this.line.setPath([this.line.c1, this.line.c2]);
		}
		this.line.draw();
		this.line.setStyles({fill: "none"});

		if (this.end_start)
		    this.addEnd(this.end_start, "source");

		if (this.end_dest)
		    this.addEnd(this.end_dest, "destination");

		_Register.add(this);
	    }

	    addEnd(type, target){
	        var x, y, line_x, line_y, line_dest_x, line_dest_y, obj = {}, angle, c_svg = null;
	        var r = config.ends.circle.r, h = config.ends.tri.h;	

	        const ns = "http://www.w3.org/2000/svg";

	        line_x = this.line.x;
	        line_y = this.line.y;
	        line_dest_x = this.line.dest_x;
	        line_dest_y = this.line.dest_y;
	        angle = this.line.inclination();

	        if (type != "triangle" && type != "circle")
	            return;

	        if (target == "source"){
	            x = this.line.x;
	            y = this.line.y;

	            if (this.src_end_csvg)
	                this.src_end_csvg.remove();

	            if (this.line.x != this.line.c1.x &&
	                this.line.y != this.line.c1.y){
	    
	                    line_dest_x = this.line.c1.x;
	                    line_dest_y = this.line.c1.y;
	                }
	        }
	        else if (target == "destination"){
	            x = this.line.dest_x;
	            y = this.line.dest_y;
	            h = -h;
	            r = -r;

	            if (this.dest_end_csvg)
	                this.dest_end_csvg.remove();
	            if (this.line.x != this.line.c2.x &&
	                this.line.y != this.line.c2.y){
	    
	                    line_x = this.line.c2.x;
	                    line_y = this.line.c2.y;
	            }
	        }

	        if (type == "triangle"){
	            var base, dxa, dya, dx, dy;

	            base = config.ends.tri.base;

	            if (line_y == line_dest_y){
	                if (line_x < line_dest_x){
	                    obj.x1 = x;
	                    obj.y1 = y;
	    
	                    obj.x2 = x + h;
	                    obj.y2 = y - base / 2;
	    
	                    obj.x3 = x + h;
	                    obj.y3 = y + base / 2;
	                }
	                else {
	                    obj.x1 = x;
	                    obj.y1 = y;
	    
	                    obj.x2 = x - h;
	                    obj.y2 = y + base / 2;
	    
	                    obj.x3 = x - h;
	                    obj.y3 = y - base / 2;
	                }
	            }
	            else if (line_x == line_dest_x){
	                if (line_y < line_dest_y){
	                    obj.x1 = x;
	                    obj.y1 = y;
	    
	                    obj.x2 = x + base / 2;
	                    obj.y2 = y + h;
	    
	                    obj.x3 = x - base / 2;
	                    obj.y3 = y + h;
	                }
	                else {
	                    obj.x1 = x;
	                    obj.y1 = y;
	    
	                    obj.x2 = x - base / 2;
	                    obj.y2 = y - h;
	    
	                    obj.x3 = x + base / 2;
	                    obj.y3 = y - h;
	                }
	            }
	            else {
	                dxa = h * Math.cos(angle);
	                dya = h * Math.sin(angle < 0 ? - angle : angle);
	    
	                dy = (base / 2) * Math.cos(angle);
	                dx = (base / 2) * Math.sin(angle < 0 ? - angle : angle);
	    
	                if (angle < 0){
	                    if (line_x < line_dest_x){
	                        obj.x1 = x;
	                        obj.y1 = y;
	    
	                        obj.x2 = x + dxa + dx;
	                        obj.y2 = y + dya - dy;
	    
	                        obj.x3 = x + dxa - dx;
	                        obj.y3 = y + dya + dy;
	                    }
	                    else if (line_x > line_dest_x){
	                        obj.x1 = x;
	                        obj.y1 = y;
	    
	                        obj.x2 = x - dxa + dx;
	                        obj.y2 = y - dya - dy;
	    
	                        obj.x3 = x - dxa - dx;
	                        obj.y3 = y - dya + dy;
	                    }
	                }
	                else {
	                    if (line_x < line_dest_x){
	                        obj.x1 = x;
	                        obj.y1 = y;
	    
	                        obj.x2 = x + dxa - dx;
	                        obj.y2 = y - dya - dy;
	    
	                        obj.x3 = x + dxa + dx;
	                        obj.y3 = y - dya + dy;
	                    }
	                    else if (line_x > line_dest_x){
	                        obj.x1 = x;
	                        obj.y1 = y;
	    
	                        obj.x2 = x - dxa + dx;
	                        obj.y2 = y + dya + dy;
	    
	                        obj.x3 = x - dxa - dx;
	                        obj.y3 = y + dya - dy;
	                    }
	                }
	            }
	           
	            c_svg = document.createElementNS(ns, "path");
	            var p = "M " + obj.x1 +  "," + obj.y1 + " " + "L " + obj.x2 + "," + obj.y2 + " " + "L " + obj.x3 + "," + obj.y3 + " Z";
	            c_svg.setAttribute("d", p);
	            c_svg.setAttribute("id", _uuid.generate());
	            c_svg.setAttribute("fill", config.ends.tri.fill);
	            c_svg.setAttribute("stroke", config.ends.tri.stroke);
	            c_svg.setAttribute("stroke-width", config.ends.tri.strokeWidth);
	        }
	        else if (type == "circle"){

	            if (line_y == line_dest_y){
	                if (line_x < line_dest_x){
	                   obj.x = x + r;
	                   obj.y = y;
	                }
	                else {
	                    obj.x = x - r;
	                    obj.y = y;
	                }
	            }
	            else if (line_x == line_dest_x){
	                if (line_y < line_dest_y){
	                    obj.x = x;
	                    obj.y = y + r;
	                }
	                else {
	                    obj.x = x;
	                    obj.y = y - r;
	                }
	            }
	            else {
	                var slope = (line_dest_y - line_y) / (line_dest_x - line_x);

	                if (angle < 0){
	                    if (line_x < line_dest_x){
	                        obj.x = x + r * Math.cos(angle);
	                        obj.y = slope * obj.x + (line_y - slope * line_x);
	                    }
	                    else if (line_x > line_dest_x){
	                        obj.x = x - r * Math.cos(angle);
	                        obj.y = slope * obj.x + (line_y - slope * line_x);
	                    }
	                }
	                else {
	                    if (line_x < line_dest_x){
	                        obj.x = x + r * Math.cos(angle);
	                        obj.y = slope * obj.x + (line_y - slope * line_x);
	                    }
	                    else if (line_x > line_dest_x){
	                        obj.x = x - r * Math.cos(angle);
	                        obj.y = slope * obj.x + (line_y - slope * line_x);
	                    }
	                }
	            }
	            c_svg = document.createElementNS(ns, "circle");
	            c_svg.setAttribute("cx", obj.x);
	            c_svg.setAttribute("cy", obj.y);
	            c_svg.setAttribute("r", config.ends.circle.r);
	            c_svg.setAttribute("fill", config.ends.circle.fill);
	            c_svg.setAttribute("stroke", config.ends.circle.stroke);
	            c_svg.setAttribute("stroke-width", config.ends.circle.strokeWidth);
	            c_svg.setAttribute("id", _uuid.generate());
	        }
	        config.svg.appendChild(c_svg);
	        if (target == "source")
	            this.src_end_csvg = c_svg;
	        if (target == "destination")
	            this.dest_end_csvg = c_svg;
	    }

	    removeFromDOM(){
	        this.line.removeFromDOM();
	        if (this.src_end_csvg)
	            config.svg.removeChild(this.src_end_csvg);
	        if (this.dest_end_csvg)
	            config.svg.removeChild(this.dest_end_csvg);
	        var lk = _Register.find(this.uuid);
	        _Register.clear(lk.uuid);
	    }

	    breakline(source, destination){
		var obj = {
		    src: 1,
		    dest: 3,
		    c1: {},
		    c2: {},
		};
		var inflexion = "horizontal";

		if ((source.shape.c_points[1].y == destination.shape.c_points[3].y && (obj.src = 1) && (obj.dest = 3)) ||
		    (source.shape.c_points[3].y == destination.shape.c_points[1].y && (obj.src = 3) && (obj.dest = 1)) ||
		    (source.shape.c_points[0].x == destination.shape.c_points[2].x && (obj.src = 0) && (obj.dest = 2)) ||
		    (source.shape.c_points[2].x == destination.shape.c_points[0].x && (obj.src = 2) && (obj.dest = 0)))
		    inflexion = false;
		else {
		    if (source.shape.c_points[obj.src].x > destination.shape.c_points[obj.dest].x){
			obj.src = 3;
			obj.dest = 1;
		    }
		    if (source.shape.c_points[obj.src].y > destination.shape.c_points[obj.dest].y){
	            if ((Math.abs(destination.shape.c_points[obj.dest].x - source.shape.c_points[obj.src].x) <= 2 * config.ends.minspace)){
	                obj.src = 0;
	                obj.dest = 2;
	                inflexion = "vertical";
	            }
	        }
	        else {
	            if (Math.abs(destination.shape.c_points[obj.dest].x - source.shape.c_points[obj.src].x) <= 2 * config.ends.minspace){
	                obj.src = 2;
	                obj.dest = 0;
	                inflexion = "vertical";
	            }
	        }
		}
	    if (this.altpath){
	        if ((obj.src == 1 && obj.dest == 3) ||
	            (obj.src == 3 && obj.dest == 1)){
	            if (source.shape.c_points[obj.src].y < destination.shape.c_points[obj.dest].y){
	                obj.src = 2;
	                obj.dest = 2;
	            }
	            else {
	                obj.src = 0;
	                obj.dest = 0;
	            }
	        }
	        else if ((obj.src == 0 && obj.dest == 2) ||
	                (obj.src == 2 && obj.dest == 0)){
	            obj.src = 3;
	            obj.dest = 3;
	        }
	        inflexion = "altpath";
	    }
		if (inflexion == "vertical"){
	            obj.c1.x = source.shape.c_points[obj.src].x;
	            obj.c1.y = (source.shape.c_points[obj.src].y + destination.shape.c_points[obj.dest].y) / 2;
	            obj.c2.x = destination.shape.c_points[obj.dest].x;
	            obj.c2.y =  (source.shape.c_points[obj.src].y + destination.shape.c_points[obj.dest].y) / 2;
	        }
	    else if (inflexion == "horizontal"){
	        obj.c1.x =  (source.shape.c_points[obj.src].x + destination.shape.c_points[obj.dest].x) / 2;
	        obj.c1.y = source.shape.c_points[obj.src].y;
	        obj.c2.x =  (source.shape.c_points[obj.src].x + destination.shape.c_points[obj.dest].x) / 2;
	        obj.c2.y = destination.shape.c_points[obj.dest].y;
	    }
	    else if (inflexion == "altpath"){
	        if(obj.src == 0){
	            obj.c1.x =  source.shape.c_points[obj.src].x;
	            obj.c1.y = destination.shape.c_points[obj.dest].y - 2 * config.ends.minspace;
	            obj.c2.x =  destination.shape.c_points[obj.dest].x;
	            obj.c2.y = destination.shape.c_points[obj.dest].y - 2 * config.ends.minspace;
	        }
	        else if (obj.src == 2){
	            obj.c1.x =  source.shape.c_points[obj.src].x;
	            obj.c1.y = destination.shape.c_points[obj.dest].y + 2 * config.ends.minspace;
	            obj.c2.x =  destination.shape.c_points[obj.dest].x;
	            obj.c2.y = destination.shape.c_points[obj.dest].y + 2 * config.ends.minspace;
	        }
	        else {
	            obj.c1.x =  source.shape.c_points[obj.src].x - 3 * config.ends.minspace;
	            obj.c1.y = source.shape.c_points[obj.src].y;
	            obj.c2.x =  source.shape.c_points[obj.src].x - 3 * config.ends.minspace;
	            obj.c2.y = destination.shape.c_points[obj.dest].y;
	        }
	    }
	    else {
	        obj.c1.x = source.shape.c_points[obj.src].x;
	        obj.c1.y = source.shape.c_points[obj.src].y;
	        obj.c2.x = source.shape.c_points[obj.src].x;
	        obj.c2.y = source.shape.c_points[obj.src].y;
	    }   
		return obj;
	    }

	    redraw(){
	        var source = _Register.find(this.source.ref);
	        var destination = _Register.find(this.destination.ref);
		var obj = {};

		if (this.subtype != "broke")
	            obj = this.optimal(source, destination);
		else
	            obj = this.breakline(source, destination);

		/* reference on connexion points*/
	        this.source = source.shape.c_points[obj.src];
	        this.destination = destination.shape.c_points[obj.dest];

		this.line.x = this.source.x;
	        this.line.y = this.source.y;
	        this.line.dest_x = this.destination.x;
	        this.line.dest_y = this.destination.y;

		if (this.subtype == "broke"){ 
	            this.line.c1.x = obj.c1.x;
	            this.line.c1.y = obj.c1.y;
	            this.line.c2.x = obj.c2.x;
	            this.line.c2.y = obj.c2.y;
	        if (Math.abs(this.line.y - this.line.dest_y) > 9  &&
	            (obj.c1.x != obj.c2.x || obj.c1.y != obj.c2.y))
	            this.line.setPathCur([this.line.c1, this.line.c2]);
	        else
	            this.line.setPath([this.line.c1, this.line.c2]);
	    }

		this.line.redraw();

		if (this.end_start)
		    this.addEnd(this.end_start, "source");

		if (this.end_dest)
		    this.addEnd(this.end_dest, "destination");
	    }

	    optimal(src, dest){
	        var obj = {}, dmin;
	        var i,j, d;

	        for (i = 0; i < 4; i++){
	            for (j = 0; j < 4; j++){
	                d = (src.shape.c_points[i].x - dest.shape.c_points[j].x) * 
	                        (src.shape.c_points[i].x - dest.shape.c_points[j].x) + 
	                        (src.shape.c_points[i].y - dest.shape.c_points[j].y) * 
	                        (src.shape.c_points[i].y - dest.shape.c_points[j].y);
	                if (!dmin || 
	                    (d < dmin)){
	                        obj.src = i;
	                        obj.dest = j;
	                        dmin = d;
	                    }
	            }
	        }
	        return obj;
	    }
	}

	class Events {
	  static source = null;
	  static line = null;
	  static current_vertex;
	  static current_cpoint;
	  static state = null;
	  static dx = null;
	  static dy = null;

	  static mousedowncb(e) {  
	    var id, cp = null;
	    id = e.srcElement.id;

	    Events.dx = e.offsetX;
	    Events.dy = e.offsetY;

	    cp = _Register.find(id);

	    // Only the points have the ref property to refer to the shape that instantiates them.
	    // In source we have the component instance created.
	    if (cp)
	      Events.source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;

	    if(cp == undefined)
	      return;
	    // The displacement of the shape is triggered
	    // when the mousedown is done on the shape, and neither on the point nor the svg.
	    if ((cp != undefined && cp.ref == undefined))
	      Events.state = "moving";
	    else {
	      // Resizing is triggered when the mousedown takes place on one of the summits.
	      if ((Events.source.shape.vertex != undefined) && (Events.current_vertex = Events.source.shape.vertex.indexOf(cp)) >= 0) {
	        Events.state = "resizing";
	      }
	      else {
	        /**
	         * If the mousedown was not done on the svg, neither on a top nor on the shape,
	         * then it was certainly done on a connection point.
	         * In this case, we start tracing a link.
	         */

	          Events.state = "drawing_link";
	          Events.current_cpoint = {x: cp.x, y: cp.y};
	          Events.line = new Line(
	              _uuid.generate(),
	              Events.current_cpoint.x,
	              Events.current_cpoint.y,
	              Events.current_cpoint.x,
	              Events.current_cpoint.y,
	              );

	          Events.line.draw();
	          Events.line.makeHiddenVertex();
	      }
	    }
	    return Events.state;
	  }

	  static mousemovecb(e) {
	    var deltaX = e.offsetX - Events.dx;
	    var deltaY = e.offsetY - Events.dy;

	    Events.dx = e.offsetX;
	    Events.dy = e.offsetY;
	    var lk;

	    if (Events.state == "moving") {
	      var src, dest;
	      lk = _Register.findAllLink(Events.source);
	      // Ensure Events.source is a component
	      if(Events.source.shape != undefined){
	        lk.map((link) => {
	          Events.source.shape.c_points.map( (point) => {
	            if(point == link.source)
	              src = point;
	            else if(point == link.destination)
	              dest = point;
	          });
	          if(dest) {
	            link.line.dest_x = dest.x;
	            link.line.dest_y = dest.y;
	            link.redraw();
	          }
	          else {
	            link.line.x = src.x;
	            link.line.y = src.y;
	            link.redraw();
	          }
	        });
	        Events.source.shape.shift(deltaX, deltaY);
	        Events.source.shape.redraw();
	        lk.map((link) => {
	          link.redraw();
	        });
	      }
	    }
	    else if (Events.state == "drawing_link") {
	      Events.line.dest_x = e.clientX;
	      Events.line.dest_y = e.clientY;
	      Events.line.redraw();
	    }
	    else if (Events.state == "resizing") {
	      lk = _Register.findAllLink(Events.source);
	      Events.source.shape.resize(Events.current_vertex, deltaX, deltaY);
	      Events.source.shape.redraw();

	      lk.map((link ) => {
	        link.shape.redraw();
	      });
	    }
	  }

	  static mouseupcb(e) {
	      var id = e.srcElement.id;
	      if (Events.state == "drawing_link") {
		  var pnt = _Register.find(id);

		  if (pnt && pnt.ref == Events.source.uuid){
	        var ref = document.getElementById(Events.line.uuid);
	        ref.remove();
	        return;
	      }
		if (pnt && pnt.ref) {
	            Events.line.dest_x = pnt.x;
	            Events.line.dest_y = pnt.y;
	            var destination = _Register.find(pnt.ref);
		    new Link(
			Events.source.uuid,
			destination.uuid,
			{});
	            Events.line.removeFromDOM();
	            Events.line = null;
	            Events.source = null;
		}
		else {
	          var ref = document.getElementById(Events.line.uuid);
	          Events.line.children.map(({child}) => {
	              var rf = document.getElementById(child.uuid);
	              rf.remove();
	          });
	          Events.line.vertex.map((point) => {
	              var rf = document.getElementById(point.uuid);
	              rf.remove();
	          });
	          ref.remove();
	      }
	    }
	      Events.state = "";
	  }
	  static mouseovercb(e){
	    var id = e.srcElement.id;

	    var local_cp = _Register.find(id);

	    if(local_cp == undefined)
	      return;
	    if(local_cp.shape.type == "line"){
	      local_cp.shape.c_svg.setAttribute("class", "move");
	      local_cp.shape.vertex.map((vt) =>{
	        vt.c_svg.setAttribute("class", "default");
	      });
	    }
	    else {
	      if(local_cp.shape != undefined){
	        local_cp.shape.c_svg.setAttribute("class", "move");
	        local_cp.shape.c_points.map( (point) => {
	          point.c_svg.setAttribute("class", "show_point");
	        });
	        local_cp.shape.vertex.map( (vertex, index) => {
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
	  }
	  static mouseleavecb(e){
	    var components = _Register.findAllComponents();
	    components.map( async (component) => {
	      component.shape.c_points.map( (point) => {
	        point.c_svg.setAttribute("class", "hidden_point");
	      });
	      component.shape.vertex.map( (vertex) => {
	        vertex.c_svg.setAttribute("class", "hidden_point");
	      });
	    });
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
	  constructor(uuid, x = 0, y = 0, r = 5) {

	    this.ref = uuid;
	    this.uuid = _uuid.generate();

	    this.x = x;
	    this.y = y;
	    this.r = r;

	    this.scale = 1;

	    this.events = {};
	    this.config = config;

	    this.type = "point";

	    this.c_svg = "";
	    this.svg = this.config.svg;

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

	  deleteAllEvents(){
	    Object.keys(this.events).map((event) => {
	      this.deleteEvent(event);
	    });
	  }
	 
	  setScale(sc){
	    this.scale = sc;
	  }

	  getScale(){
	    return this.scale;
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

	  draw() {
	    var ns = "http://www.w3.org/2000/svg";

	    this.c_svg = document.createElementNS(ns, "circle");

	    this.c_svg.setAttribute("id", this.uuid);

	    this.c_svg.setAttribute("cx", this.x);

	    this.c_svg.setAttribute("cy", this.y);

	    this.c_svg.setAttribute("r", this.config.point.radius * this.scale);

	    // this.c_svg.setAttribute("class", "point");
	    this.c_svg.setAttribute("class", "hidden_point");
	    
	    this.addEvent("mousedown", Events.mousedowncb);
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
	 * @class Circle
	 */
	class Circle extends Shape {
	    /**
	     * 
	     * @param {string} uuid 
	     * @param {number} x 
	     * @param {number} y 
	     * @param {number} r 
	     */
	    constructor(uuid, x = 0, y = 0, r = 3){

	        super();

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;
	        this.r = r;

	        this.events = {};

	        this.config = config;

	        this.box = "";

	        this.c_svg = "";

	        this.svg = this.config.svg;

	        this.type = "circle";

	        this.scale = 1;

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.angle = 0;
	  
	        this.children = [];
	      
	        this.c_points = [
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3)
	        ];

	        this.vertex = [
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3),
	            new Point(this.uuid,0, 0, 3)
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

	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
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
	        if(this.c_points.length == 0 || this.vertex.length == 0)
	            return;
	  
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
	        this.drawVertex();
	        this.drawConnector();
	        this.drawBox();  
	        
	        this.box.setAttribute("id", this.uuid);
	        this.box.setAttributeNS(null, "fill", this.config.box.fill);
	        this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
	        this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
	        this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

	        this.svg.appendChild(this.c_svg);
	        this.svg.appendChild(this.box);

	        this.c_points.map((point) => {
	            point.draw();
	        });

	        this.vertex.map((point) => {
	            point.draw();
	        });

	        this.children.map(({child}) => {
	            child.draw();
	        });
	        this.addEvent("mousedown", (e) => {
	            Events.mousedowncb(e);
	        });
	        this.addEvent("mouseleave", (e) => {
	            Events.mouseleavecb(e);
	        });
	        this.addEvent("mouseover", (e) => {
	            Events.mouseovercb(e);
	        });
	    }

	    removeChildren(){
	        this.children.map(({child}) => {
	            child.removeFromDOM();
	        });
	    }
	    
	    makeHiddenCpoints(){
	        this.c_points.map((pt) => {
	            pt.c_svg.setAttribute("fill", "none");
	        });
	    }
	    
	    makeHiddenVertex(){
	        this.vertex.map((vt) => {
	            vt.c_svg.setAttribute("fill", "none");
	        });
	    }

	    makeVisibleCpoints(){
	        this.c_points.map((pt) => {
	            pt.c_svg.setAttribute("fill", "black");
	        });
	    }

	    makeVisibleVertex(){
	        this.vertex.map((vt) => {
	            vt.c_svg.setAttribute("fill", "black");
	        });
	    }

	    removeBoxFromDOM(){
	        this.svg.removeChild(this.box);
	    }
	   

	    removeFromDOM(){
	        this.c_points.map((pt) => {
	            pt.removeFromDOM();
	        });
	        this.vertex.map((vt) => {
	            vt.removeFromDOM();
	        });
	        this.children.map(({child}) => {
	            child.removeFromDOM();
	        });
	        this.svg.removeChild(this.c_svg);
	    }
	    
	    shift(dx, dy){
	        this.x += dx;
	        this.y += dy;

	        this.children.map(({child}) => {
	            child.shift(dx, dy);
	        }); 
	    }

	    redraw(){
	        this.c_svg.setAttribute("cx", (this.x + this.offsetX));
	        this.c_svg.setAttribute("cy", (this.y + this.offsetY));
	        this.c_svg.setAttribute("r", (this.r * this.scale));

	        this.drawConnector();
	        this.drawVertex();
	        this.drawBox();

	        this.vertex.map((vt) => {
	            vt.redraw();
	        });

	        this.c_points.map((pt) => {
	            pt.redraw();
	        });

	        this.children.map(({child}) => {
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

	        this.children.map(({child}) => {
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
	}

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
	      Events.mousedowncb(e);
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
	      });
	  }

	}

	/**
	 * @class Triangle
	 */

	class Triangle extends Shape {

	  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10)
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
	    
	    this.config = config;

	    this.c_svg = "";
	    this.svg = this.config.svg;

	    this.type = "triangle";

	    this.children = [];

	    this.offsetX = 0;
	    this.offsetY = 0;

	    this.scaleX = 0;
	    this.scaleY = 0;

	    this.angle = 0;
	    
	    this.centerX = 0;
	    this.centerY = 0;

	    this.c_points = [];

	    this.vertex = [];
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

	  /**
	   * *@description
	   * This method allows us to delete all events defined on the c_svg property.
	   */
	  deleteAllEvents(){
	    Object.keys(this.events).map((event) => {
	      this.deleteEvent(event);
	    });
	  }

	  setOffsetX(x){
	    this.offsetX = x;
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
	    this.c_svg.setAttribute("fill", this.config.form.fill);
	    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
	    this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);


	    this.svg.appendChild(this.c_svg);

	    this.addEvent("mousedown", (e) => {
	      Events.mousedowncb(e);
	    });
	 
	    this.addEvent("mouseleave", (e) => {
	        Events.mouseleavecb(e);
	    });
	    this.addEvent("mouseover", (e) => {
	        Events.mouseovercb(e);
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

	    this.children.map(({child}) => {
	      child.shift(dx, dy);
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
	}

	/**
	 * @class Lozenge
	 */


	class Lozenge extends Shape{

	/**
	 * 
	 * @param {string} uuid 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 */
	  constructor(uuid, x = 0, y = 0, width = 10, height = 30,)
	  {
	      super();
	  
	      this.uuid = uuid;

	      this.x = x;
	      this.y = y;

	      this.width = width;
	      this.height =  height;

	      this.events = {};
	            
	      this.config = config;

	      this.c_svg = "";
	      this.svg = this.config.svg;
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
	        new Point(this.uuid,0,0, 5),
	        new Point(this.uuid,0,0, 5),
	        new Point(this.uuid,0,0, 5),
	        new Point(this.uuid,0,0, 5),
	      ];

	      this.vertex = [
	        new Point(this.uuid, 0, 0, 5),
	        new Point(this.uuid, 0, 0, 5),
	        new Point(this.uuid, 0, 0, 5),
	        new Point(this.uuid, 0, 0, 5),
	      ];
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

	  addEvent(event, callback){
	    this.c_svg.addEventListener(event, callback);
	    this.events[event] = callback;
	  }

	  deleteEvent(event){
	    var callback = this.events[event];
	    this.c_svg.removeEventListener(event, callback);
	    delete this.events[event];
	  }

	  deleteAllEvents(){
	    Object.keys(this.events).map((event) => {
	      this.deleteEvent(event);
	    });
	  }

	  removeChildren(){
	    this.children.map(({child}) => {
	        child.removeFromDOM();
	    });
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
	    this.c_svg.setAttribute("fill", this.config.form.fill);
	    this.c_svg.setAttributeNS(null, "stroke", this.config.form.stroke);
	      this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
	      
	      this.addEvent("mousedown", (e) => {
		  Events.mousedowncb(e);
	      });
	      this.addEvent("mouseleave", (e) => {
	          Events.mouseleavecb(e);
	      });
	      this.addEvent("mouseover", (e) => {
	          Events.mouseovercb(e);
	      });
	      this.svg.appendChild(this.c_svg);
	      this.svg.appendChild(this.box);
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
	      Events.mousedowncb(e);
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

	    if(this.width < this.config.form.limitWidth)
	      this.width = this.config.form.limitWidth;

	     if(this.height < this.config.form.limitHeight)
	      this.height = this.config.form.limitHeight;


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
	}

	/**
	 * @class Polyline
	 */

	class Polyline extends Shape {
	    constructor(uuid, points = []){

	        super();

	        this.uuid = uuid;

	        this.x = points[0];
	        this.y = points[1];

	        this.dest_x = points[points.length - 2];
	        this.dest_y = points[points.length - 1];

	        this.points = points;

	        this.events = {};
	        
	        this.config = config;

	        this.c_svg = "";
	        this.svg = this.config.svg;

	        this.type = "polyline";

	        this.offsetX = 0;
	        this.offsetY = 0;
	    
	        this.scaleX = 1;
	        this.scaleY = 1;
	    
	        this.angle = 0;

	        this.children = [];

	        this.vertex = [
	            new Point(this.uuid, 0, 0, 5),
	            new Point(this.uuid, 0, 0, 5),
	        ];
	        this.c_points = [
	            new Point(this.uuid, 0, 0, 5),
	            new Point(this.uuid, 0, 0, 5),
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

	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
	    }

	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	    }

	    drawConnector(){
	        if(this.c_points.length == 0)
	            return;
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

	    draw(){
	        const ns = "http://www.w3.org/2000/svg";
	        this.c_svg = document.createElementNS(ns,'polyline');

	        var path = "";
	        for(var i = 0; i < this.points.length; i++){
	            if(i % 2 == 0)
	                path += this.points[i] + this.offsetX + ",";
	            else
	                path += this.points[i] + this.offsetY + " ";
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

	        this.children.map(({child}) =>{
	            child.draw();
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


	    shift(dx,dy){
	        console.log("sift de aya" + dx + " " + dy);
	        this.points.map(pt =>{
	            console.table(pt);
	        });
	        for (var i = 0; i < this.points.length; i++){
	            if (i%2 == 0)
	                this.points[i] += dx;
	            else
	                this.points[i] += dy;
	        }
	        console.log("after shifting in aya");
	        this.points.map(pt =>{
	            console.table(pt);
	        });
	        this.children.map ( ({child}) => {
	            child.shift(dx, dy);
	        }); 
	    }

	    redraw(){
	        this.drawVertex();
	        this.vertex.map( (vertex) => {
	            vertex.redraw();
	        });
	        var path = "";
	        for(var i = 0; i < this.points.length; i++){
	            if(i % 2 == 0)
	                path += this.points[i] + this.offsetX + ",";
	            else
	                path += this.points[i] + this.offsetY + " ";
	        }

	        this.c_svg.setAttribute("points", path);

	        this.children.map ( ({child}) => {
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
	        this.children.map ( ({child}) => {
	            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
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
	}

	/**
	 * @class Arc
	 */
	class Arc extends Shape {
	    /**
	     * 
	     * @param {string} uuid 
	     */
	    constructor(uuid, x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2){

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

	        this.config = config;

	        this.c_svg = "";
	        this.svg = this.config.svg;

	        this.type = "arc";

	        this.scaleX = 1;
	        this.scaleY = 1;

	        this.radius = Math.sqrt (((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * ((this.x + this.offsetX) - (this.x0  + this.offsetX0)) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * ((this.y + this.offsetY) - (this.y0 + this.offsetY0)));
	        this.ratio = ratio;

	        this.children = [];

	        this.vertex = [];
	        this.c_points = [];
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

	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
	    }
	    
	    drawVertex(){
	        if(this.vertex.length == 0)
	            return;
	    }

	    drawConnector(){
	        if(this.c_points.length == 0)
	            return;
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

	        this.addEvent("mouseover", () =>{
	            this.c_svg.setAttribute("class", "move");
	            Events.mouseovercb(e);
	        });
	        this.addEvent("mousedown", (e) => {
	            Events.mousedowncb(e);
	        });
	        this.addEvent("mouseleave", (e) => {
	            Events.mouseleavecb(e);
	        });
	    }

	    removeChildren(){
	        this.children.map(({child}) => {
	            child.removeFromDOM();
	        });
	    }

	    removeFromDOM(){
	        this.c_points.map((pt) => {
	            pt.removeFromDOM();
	        });
	        this.vertex.map((vt) => {
	            vt.removeFromDOM();
	        });
	        this.children.map(({child}) => {
	            child.removeFromDOM();
	        });
	        this.svg.removeChild(this.c_svg);
	    }

	    shift(dx,dy){
	        this.x0 += dx;
	        this.y0 += dy;

	        this.x += dx;
	        this.y += dy;

	        this.children.map(({child}) => {
	            child.shift(dx, dy);
	        });   
	    }


	    redraw(){
	        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
	        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

	        this.p = "M " + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y;
	        this.c_svg.setAttribute("d", this.p);

	        this.children.map(({child}) => {
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
	        this.children.map(({child}) => {
	            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
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
	}

	/**
	 * @class
	 * 
	 * @description
	 * 
	 */
	class Text{
	    constructor(uuid, x = 0, y = 0, text = "text", size = 0){

	        this.uuid = uuid;

	        this.x = x;
	        this.y = y;

	        this.size = size;

	        this.text = text;

	        this.type = 'text';

	        this.config = config;

	        this.svg = this.config.svg;
	        this.c_svg = "";

	        this.events = {};

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

	        this.path_id = null;
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

	    /**
	     * *@description
	     * This method allows us to delete all events defined on the c_svg property.
	     */
	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
	    }

	    setRotateCenter(centerX, centerY){
	        this.centerX = centerX;
	        this.centerY = centerY;
	    }

	    setRotateAngle(angle){
	        this.angle = angle;
	    }

	    setPath(id){
	        this.path_id = id;
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
	        if (o.fontsize)
	            this.c_svg.setAttribute("font-size", o.fontsize);
	        if (o.fontfamily)
	            this.c_svg.setAttribute("font-family", o.fontfamily);
	        if (o.fontstyle)        
	            this.c_svg.setAttribute("font-style", o.fontstyle);
	        if (o.wordspacing)
	            this.c_svg.setAttribute("word-spacing", o.wordspacing);
	        if (o.letterspacing)
	            this.c_svg.setAttribute("letter-spacing", o.letterspacing);
	        if (o.textlength)
	            this.c_svg.setAttributeNS(null, "textLength", o.textlength);
	    }
	    

	    draw(){
	        const svgns = "http://www.w3.org/2000/svg";

	        this.c_svg = document.createElementNS(svgns, "text");
	        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
	        this.c_svg.setAttributeNS(null, "textLength", this.size || this.config.text.size);
	        this.c_svg.setAttributeNS(null, "id", this.uuid);
	        this.c_svg.setAttribute("font-family", this.config.text.fontfamily);
	        this.c_svg.setAttribute("font-size", this.config.text.fontsize);
	        this.c_svg.setAttributeNS(null, "fill", this.config.text.fill);
	        this.c_svg.setAttributeNS(null, "stroke", this.config.text.stroke);
	        this.c_svg.setAttributeNS(null, "stroke-width", this.config.text.strokeWidth);
	        this.c_svg.setAttributeNS(null, "fill-opacity", this.config.text.fillOpacity);
	        this.c_svg.setAttributeNS(null, "stroke-dasharray", this.config.text.strokeDasharray);
	        this.c_svg.setAttributeNS(null, "stroke-dashoffset", this.config.text.strokeDashoffset);
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

	        this.title = document.createElementNS(svgns, "title");

	        this.title.textContent = this.text;

	        this.c_svg.textContent = this.text;

	        this.c_svg.appendChild(this.title);

	        // this.updateWidthText();
	        this.svg.appendChild(this.c_svg);
	    }

	    redraw(){
	    	this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
	        this.c_svg.setAttributeNS(null, "textLength", this.size);
		    this.c_svg.textContent = this.text;
	        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
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
	        this.c_svg.textContent = "";
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
	 * @class FactoryShape
	 */
	class Factory
	{
	    /**
	     * 
	     * @param {*} uuid 
	     * @param {*} type 
	     * @param {*} props 
	     * @returns 
	     */
	   static createShape(uuid, type, props = {})
	    {
	        if(type == "circle")
	            return new Circle(uuid, props.x, props.y, props.r);
	        else if(type == "rectangle")
	            return new Rectangle(uuid, props.x, props.y, props.width, props.height);
	        else if(type == "line")
	            return new Line(uuid, props.x, props.y, props.dest_x, props.dest_y);
	        else if(type == "triangle")
	            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3);
	        else if(type == "lozenge")
	            return new Lozenge(uuid, props.x, props.y, props.width, props.height);
	        else if(type == "polyline")
	            return new Polyline(uuid, props.points);
	        else if(type == "arc")
	            return new Arc(uuid, props.x0, props.y0, props.x, props.y, props.angle, props.ratio);
	        else if(type == "text")
	            return new Text(uuid, props.x, props.y, props.text, props.size);
	    }
	}

	class Component
	{
	    /**
	     * 
	     * @param {*} type 
	     * @param {*} props 
	     * @param {*} svg 
	     */
	    constructor(type, props)
	    {
	        this.uuid = _uuid.generate();
	        this.type = type;
	        this.shape = Factory.createShape(this.uuid, type, props);
	        this.shape.draw();
	        _Register.add(this);
	    }

	    move(dx,dy){
	        this.shape.x += dx;
	        this.shape.y += dy;

	        this.shape.redraw();
		
	        var lk = _Register.findAllLink(this);
	        
	        lk.map((link) => {
	            link.redraw();
	        });
	    }

	  /**
	   * @description
	   * We can build any shape by adding to a basic component a children shape.
	   * 
	   * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Shape) is added 
	   * as a child to a component with a form.
	   * @param { Function } translate - { x:, y: } This object allows us to position the child relative to its parent.
	   * @param {Function } rotate  - { x:, y: , r: } This object allows us to apply a rotation of the child taking into 
	   * account its relative position and the center of rotation.
	   */
	  addChild(child, translate = null, rotate = null, drawing = true){
	    /* resizing and connection to child isn't possible */
	    child.vertex = [];
	    child.c_points = [];

	    if(translate != null){
	        child.offsetX = translate.x;
	        child.offsetY = translate.y;
	    }
	    if(rotate != null){
	        child.centerX = rotate.x;
	        child.centerY = rotate.y;
	        child.angle = rotate.angle;
	    }       
	    if(drawing == true)
	        child.draw();
	    this.shape.children.push({child});
	  }

	  remove(){
	    this.shape.removeFromDOM();
	  }
	}

	class Image{
	    constructor(uuid, x = 0, y = 0, width = 50, height = 50, path, name){
	       
	        this.uuid = uuid;
	       
	        this.width = width;
	        this.height = height;
	       
	        this.x = x;
	        this.y = y;
	       
	        this.path = path;
	        this.name = name;

	        this.c_svg = "";

	        this.offsetX = 0;
	        this.offsetY = 0;
	        
	        this.events = {};
	        
	        this.config = config;
	        
	        this.type = 'image';
	        this.svg = this.config.svg;
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

	    deleteAllEvents(){
	        Object.keys(this.events).map((event) => {
	            this.deleteEvent(event);
	        });
	    }

	    draw(){
	        this.c_svg = document.createElementNS('http://www.w3.org/2000/svg','image');
	        this.c_svg.setAttributeNS(null,'id',this.uuid);
	        this.c_svg.setAttributeNS(null,'height',this.height);
	        this.c_svg.setAttributeNS(null,'width',this.width);
	        this.c_svg.setAttributeNS('http://www.w3.org/1999/xlink','href', this.path);
	        this.c_svg.setAttributeNS(null,'x',this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null,'y',this.y + this.offsetY);

	        this.svg.append(this.c_svg);
	    }

	    shift(dx, dy){
	        this.x += dx;
	        this.y +=dy;
	    }

	    redraw(){
	        this.c_svg.setAttributeNS(null,'x',this.x + this.offsetX);
	        this.c_svg.setAttributeNS(null,'y',this.y + this.offsetY);
	    }

	    removeFromDOM(){
	        this.svg.removeChild(this.c_svg);
	    }
	}

	class Grid {
	  constructor(svg, cellW = 40, cellH = 40, subdivisionX = 2, subdivisionY = 2,
	    bgColor = 'white', lineColor = 'gray', lineThicness = 0.2) {
	    if (svg == undefined) {
	      throw "missing parameter"
	    }
	    this.cellW = cellW;
	    this.cellH = cellH;
	    this.subdivisionX = subdivisionX;
	    this.subdivisionY = subdivisionY;
	    this.bgColor = bgColor;
	    this.lineColor = lineColor;
	    this.lineThicness = lineThicness;

	    this.subpattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
	    this.subpattern.setAttribute("id", "subpatternId");
	    this.subpattern.setAttribute("width", this.cellW / this.subdivisionX);
	    this.subpattern.setAttribute("height", this.cellH / this.subdivisionY);
	    this.subpattern.setAttribute("patternUnits", "userSpaceOnUse");
	    
	    this.subpatternRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	    this.subpatternRect.setAttribute("width", "100%");
	    this.subpatternRect.setAttribute("height", "100%");
	    this.subpatternRect.setAttribute("height", "100%");
	    this.subpatternRect.setAttribute("fill", this.bgColor);
	    this.subpatternRect.setAttribute("stroke", this.lineColor);
	    this.subpatternRect.setAttribute("stroke-width", this.lineThicness / 2);
	    this.subpattern.append(this.subpatternRect );
	    svg.append(this.subpattern);

	    this.pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");

	    this.pattern.setAttribute("id", "patternId");
	    this.pattern.setAttribute("width", this.cellW);
	    this.pattern.setAttribute("height", this.cellH);
	    this.pattern.setAttribute("patternUnits", "userSpaceOnUse");
	   
	    this.patternrect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	   
	    this.patternrect.setAttribute("width", "100%");
	    this.patternrect.setAttribute("height", "100%");
	    this.patternrect.setAttribute("fill", "url(#subpatternId)");
	    this.patternrect.setAttribute("stroke", this.lineColor);
	    this.patternrect.setAttribute("stroke-width", this.lineThicness);
	    this.pattern.append(this.patternrect );
	    svg.append(this.pattern);

	    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");   
	    this.rect.setAttribute("id", "gridRect");
	    this.rect.setAttribute("fill", "url(#patternId)");
	    this.rect.setAttribute("width", "100%");
	    this.rect.setAttribute("height", "100%");
	    svg.append(this.rect);

	    this.subpattern.addEventListener("mousemove", ()=>{});
	    this.subpattern.addEventListener("mouseup", ()=>{});
	    this.subpatternRect.addEventListener("mousemove", ()=>{});
	    this.subpatternRect.addEventListener("mouseup", ()=>{});
	    this.pattern.addEventListener("mousemove", ()=>{});
	    this.pattern.addEventListener("mouseup", ()=>{});

	    this.patternrect.addEventListener("mousemove", ()=>{});
	    this.patternrect.addEventListener("mouseup", ()=>{});
	    this.rect.addEventListener("mousemove", ()=>{});
	    this.rect.addEventListener("mouseup", ()=>{});
	  }

	  redraw(){
	    this.subpattern.setAttribute("width", this.cellW / this.subdivisionX);
	    this.subpattern.setAttribute("height", this.cellH / this.subdivisionY);

	    this.subpatternRect.setAttribute("width", "100%");
	    this.subpatternRect.setAttribute("height", "100%");
	    this.subpatternRect.setAttribute("fill", this.bgColor);
	    this.subpatternRect.setAttribute("stroke", this.lineColor);
	    this.subpatternRect.setAttribute("stroke-width", this.lineThicness / 2);

	    this.pattern.setAttribute("id", "patternId");
	    this.pattern.setAttribute("width", this.cellW);
	    this.pattern.setAttribute("height", this.cellH);

	    this.patternrect.setAttribute("width", "100%");
	    this.patternrect.setAttribute("height", "100%");
	    this.patternrect.setAttribute("fill", "url(#subpatternId)");
	    this.patternrect.setAttribute("stroke", this.lineColor);
	    this.patternrect.setAttribute("stroke-width", this.lineThicness);

	    this.rect.setAttribute("id", "gridRect");
	    this.rect.setAttribute("fill", "url(#patternId)");
	    this.rect.setAttribute("width", "100%");
	    this.rect.setAttribute("height", "100%");
	  }
	}

	class Init{
	    constructor(width = 1343, height = 1343){

	        this.uuid = _uuid.generate();

	        this.width = width;
	        this.height = height;
	 
	        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

	        this.svg.setAttribute("width", this.width);
	        this.svg.setAttribute("height", this.height);
	        this.svg.setAttribute("id", this.uuid);

	        this.grid = new Grid(this.svg, 40, 40, 2, 4);

	        this.config = config;

	        config.svg = this.svg;

	        this.svg.addEventListener("mousemove", Events.mousemovecb);
	        this.svg.addEventListener("mouseup", Events.mouseupcb);
	    }

	    setGridSize(o){
	        if (o.cellw)
	            this.grid.cellW = o.cellw;
	        if (o.cellh)
	            this.grid.cellH = o.cellh;
	        if (o.subdx)
	            this.grid.subdivisionX = o.subdx;
	        if (o.subdy)
	            this.grid.subdivisionY = o.subdy;
	        if (o.bgc)
	            this.grid.bgColor = o.bgc;
	        if (o.lc)
	            this.grid.lineColor = o.lc;
	        if (o.border)
	            this.grid.lineThicness = o.border;
	        if (o.width)
	            this.svg.setAttribute("width", o.width);
	        if (o.height)
	            this.svg.setAttribute("height", o.height);    
	        this.grid.redraw();
	    }

	    _uuid(){
	        return _uuid;
	    }

	    Component(type, props){
	        return new Component(type, props);
	    }

	    Rectangle(x = 0, y = 0, width = 10, height = 10){
	        return new Rectangle(_uuid.generate(), x, y, width, height);
	    }

	    Lozenge(x = 0, y = 0, width = 10, height = 10){
	        return new Lozenge(_uuid.generate(), x, y, width, height);
	    }

	    Triangle(x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10){
	        return new Triangle(_uuid.generate(), x1, y1, x2, y2, x3, y3);
	    }

	    Circle( x = 0, y = 0, r = 5){
	        return new Circle(_uuid.generate(), x, y, r);
	    }

	    Text(x = 0, y = 0, text = "text", size = 100){
	        return new Text(_uuid.generate(), x, y, text, size);
	    }

	    Line(x=0, y=0, dest_x = x, dest_y = y){
	        return new Line(_uuid.generate(), x, y, dest_x, dest_y);
	    }

	    Link(src_id, dest_id, userconfig = {}){
	        return new Link(src_id, dest_id, userconfig);
	    }

	    Polyline( points = []){
	        return new Polyline(_uuid.generate(), points);
	    }

	    Point( x = 0, y = 0, r = 5){
	        return new Point(_uuid.generate(), x, y, r);
	    }

	    Arc(x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2){
	        return new Arc(_uuid.generate(), x0, y0, x, y, angle, ratio);
	    }
	    
	    Image(x,y, width, height, path = "", name = ""){
	        return new Image(_uuid.generate(), x, y, width, height, path, name);
	    }
	}

	exports.Init = Init;

}));
