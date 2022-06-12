import { _uuid } from "./uuid";
import { _Register } from "../register";
import {events} from "../events";
import { Point } from "./point";
import { config } from "../../config";
import { FactoryForm } from "../factoryForm";
import { Form } from "../abstraction/form";


/**
 * @class Line
 */

class Line extends Form {
    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} dest_x 
     * @param {number} dest_y 
     */
    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y){

        super();

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.pente = (this.dest_y - this.y) / (this.dest_x - this.x);

        this.events = {};

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

        if(config.line != undefined && Object.keys(config.line.ends.left).length > 0){
            var child = FactoryForm.createForm(_uuid.generate(), config.line.ends.left.type, config.line.ends.left.props);
            if(config.line.ends.left.type == 'triangle')
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.dest_x);
                    c.setOffsetY(p.dest_y - (config.line.ends.right.props.y3 - config.line.ends.right.props.y1)/2);
                },  (p, c) => {
                    c.setRotateCenter((c.x1 +c.x3) /2, (c.y1 + c.y3)  / 2);
                    c.setRotateAngle(p.calculateAngle());
                } );
            else
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x - config.line.ends.left.props.height/2);
                    c.setOffsetY(p.y - config.line.ends.left.props.height/2);
                },  (p, c) => {
                    c.setRotateCenter(c.x, c.y);
                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
                } );
        }

        if(config.line != undefined && Object.keys(config.line.ends.right).length > 0){
            var child = FactoryForm.createForm(_uuid.generate(), config.line.ends.right.type, config.line.ends.right.props);
            if(config.line.ends.right.type == 'triangle')
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.dest_x);
                    c.setOffsetY(p.dest_y - (config.line.ends.right.props.y3 - config.line.ends.right.props.y1)/2);
                },  (p, c) => {
                    c.setRotateCenter((c.x1 +c.x3) /2, (c.y1 + c.y3)  / 2);
                    c.setRotateAngle(p.calculateAngle());
                } );
            else
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x - config.line.ends.left.props.height/2);
                    c.setOffsetY(p.y - config.line.ends.left.props.height/2);
                },  (p, c) => {
                    c.setRotateCenter(c.x, c.y);
                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
                } );
        }
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
        child.draw(svg);
        this.children.push({child, translate, rotate});
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

    }

    drawBox(){

    }

    draw(svg){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("fill", config.form.fill);
        this.c_svg.setAttribute("stroke", config.form.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", config.form.strokeWidth);

        svg.appendChild(this.c_svg);

        this.drawVertex();

        this.c_points.map((point) => {
            point.draw(svg);
        });

        this.vertex.map( (vertex) => {
            vertex.draw(svg);
        });

        this.addEvent("mousedown", events.mouseDownCb);
    }

    removeFromDOM(){
        svg.removeChild(this.c_svg);
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


    optimalPath(){

    }
}
export {Line};