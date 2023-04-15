import { _uuid } from "../uuid";
import { Point } from "./point";
import { Shape } from "../abstraction/shape";
import { config } from "../../config";
import { Events } from "../events";

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
            Events.mousedowncb(e)
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
export {Circle};
