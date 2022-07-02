import { _uuid } from "./uuid";
import { Point } from "./point";
import { Form } from "../abstraction/form";


/**
 * @class Arc
 */

class Arc extends Form {
    /**
     * 
     * @param {string} uuid 
     */
    constructor(uuid, x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, svg, event, config){

        super();

        this.uuid = uuid;

        this.x0 = x0;
        this.y0= y0;

        this.x = x;
        this.y= y;

        this.angle = angle;

        this.dest_x = Math.round (this.x0 + (this.x - this.x0) * Math.cos ((this.angle * Math.PI )/ 180) + (this.y - this.y0) * Math.sin ((this.angle * Math.PI) / 180));
        this.dest_y = Math.round (this.y0 - (this.x - this.x0) * Math.sin ((this.angle * Math.PI) / 180) + (this.y - this.y0) * Math.cos ((this.angle * Math.PI) / 180));

        this.events = {};

        this.nativeEvent = event;

        this.config = config;


        this.c_svg = "";
        this.svg = svg;

        this.type = "arc";

        this.offsetX = 0;
        this.offsetY = 0;

        this.scaleX = 1;
        this.scaleY = 1;

        this.radius = Math.sqrt ((this.x - this.x0) * (this.x - this.x0) + (this.y - this.y0) * (this.y - this.y0));

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent),
        ];
        this.c_points = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent),
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

    addChild(child, translate, rotate){
        child.vertex = [];
        child.c_points = [];
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        translate(this, child);
        rotate(this, child);
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
        this.c_svg = document.createElementNS(ns,'path');

        this.p = "M " + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y;
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("fill", this.config.form.fill);
        this.c_svg.setAttribute("stroke", this.config.form.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);
        this.c_svg.setAttribute("d", this.p);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();
        this.drawConnector();

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

        this.p = "M " + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y;
        this.c_svg.setAttribute("d", this.p);

        this.children.map ( ({child, translate, rotate}) => {
            translate(this, child);
            rotate(this, child);
            child.redraw();
        });
    }

    calculateAngle(){
        var angle;
        this.pente = (this.dest_y - this.y) / (this.dest_x - this.x);

        if(this.pente == 0)
            angle = 0;
        if( this.pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(this.pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if( this.pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(this.pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
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
export {Arc};