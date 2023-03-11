import { _uuid } from "./uuid";
import { _Register } from "../register";
import { Point } from "./point";
import { Shape } from "../abstraction/shape";

/**
 * @class Polyline
 */

class Polyline extends Shape {
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

    drawBox(){
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

        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
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
        for (var i = 0; i < this.points.length; i++){
            if (i%2)
                this.points[i] += dx;
            else
                this.points[i] += dy;
        }
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
        else{
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

    optimalPath(){

    }
}
export {Polyline}; 
