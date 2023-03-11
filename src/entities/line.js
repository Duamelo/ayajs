import { _uuid } from "./uuid";
import { _Register } from "../register";
import { Point } from "./point";
import { Shape } from "../abstraction/shape";

/**
 * @class Line
 */
class Line extends Shape {

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

        this.c1 = {
            x: this.x,
            y: this.y
        };

        this.c2 = {
            x: this.x,
            y: this.y
        };

        this.c3 = {
            x: this.dest_x,
            y: this.dest_y
        };

        this.c4 = {
            x: this.dest_x,
            y: this.dest_y
        };

        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.events = {};

        this.config = config;

        this.svg = svg;

        this.id_svg = id_svg;

        this.nativeEvent = event;

        this.c_svg = "";
        this.type = "line";
        this.line_t = null;

        this.offsetX = 0;
        this.offsetY = 0;
    
        this.scaleX = 1;
        this.scaleY = 1;
    
        this.angle = 0;

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0, 3, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid, 0, 0, 3, this.svg, this.nativeEvent, this.config),
        ];
        this.c_points = [];
    }

    setTypeLink(type){
        this.line_t = type;
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

    drawBox(){
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
        this.p = "M "+  (this.x) + ","+ (this.y) + " ";

        points.map((pt)=>{
            this.p += "L"  + (pt.x) + ","+ (pt.y) + " ";
        });
        this.p += "L" + (this.dest_x)  + "," + (this.dest_y);
    }
    draw(){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        if (!this.line_t)
            this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", this.p);
        this.c_svg.setAttribute("fill", this.config.line.fill);
        this.c_svg.setAttribute("stroke", this.config.form.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.line.strokeWidth);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();

        this.vertex.map((vertex) => {
            vertex.draw();
        });

        this.children.map(({child}) =>{
            child.draw();
        });

        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
        this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
        this.addEvent("mouseleave", this.nativeEvent.mouseLeaveCb);
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

        if (!this.line_t)
            this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("d", this.p);

        this.children.map(({child, translate, rotate}) => {
            translate(this, child);
            rotate(this, child);
            child.redraw();
        });
   }

    calculateAngle(){
        var angle = 0;
        
        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);
        if(this.dest_x == this.x)
            angle = Math.PI/2;
        if(pente == 0)
            angle = 0;
        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
            angle = Math.PI - Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        return angle;
    }

    resize(pos, dx, dy){
        if(pos == 0){
            this.x += dx;
            this.y += dy;

            if (this.children[0]) 
                this.children[0].child.shift(dx, dy);
        }
        else{
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

    optimalPath(){}
}
export {Line};
