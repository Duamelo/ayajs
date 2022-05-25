import { _uuid } from "./uuid";
import { _Register } from "../register";
import { EventManager } from "../eventManager";
import {events} from "../events";
import { Point } from "./point";


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
     */

    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y){

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.pente = (this.dest_y - this.y) / (this.dest_x - this.x);

        this.events = new EventManager();

        this.c_svg = "";
        this.type = "line";

        this.offsetX = 0;
        this.offsetY = 0;
    
        this.scaleX = 1;
        this.scaleY = 1;
    
        this.angle = 0;

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0),
            new Point(this.uuid, 0, 0),
        ];
        this.c_points = [
            new Point(this.uuid, 0, 0),
            new Point(this.uuid, 0, 0),
        ];
    }

    addChild(child, translate, rotate){
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        translate(this, child);
        rotate(this, child);
        child.draw(svg);
        this.children.push({child, translate, rotate});
    }
    
    drawVertex(){
        this.vertex[0].x = this.x + this.offsetX;
        this.vertex[0].y = this.y + this.offsetY;

        this.vertex[1].x = (this.dest_x + this.offsetX) * this.scaleX;
        this.vertex[1].y = (this.dest_y + this.offsetY) * this.scaleY;
    }


    draw(svgs){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("fill", "none");
        this.c_svg.setAttribute("stroke", "indigo");
        this.c_svg.setAttributeNS(null, "stroke-width", "2px");

        svgs.appendChild(this.c_svg);

        this.drawVertex();

        this.c_points.map((point) => {
            point.draw(svgs);
        });

          
        this.vertex.map( (vertex) => {
            vertex.draw(svgs);
        });

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
        this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
        this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

        this.events.create();
    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
        this.dest_x += dx;
        this.dest_y += dy;
    }

    redraw(){
        this.drawVertex();
        this.vertex.map( (vertex) => {
            vertex.redraw();
        });

        var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);
        this.c_svg.setAttribute("d", p);

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
}
export {Line};