import { _uuid } from "./uuid";
import { _Register } from "../register";
import { Point } from "./point";
import { FactoryForm } from "../factoryForm";
import { Form } from "../abstraction/form";
import { Events } from "../events";


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
    constructor(id_svg, svg, event, config, uuid, x=0, y=0, dest_x = x, dest_y = y){

        super();

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.pente = (this.dest_y - this.y) / (this.dest_x - this.x);

        this.events = {};

        this.config = config;

        this.svg = svg;

        this.id_svg = id_svg;

        this.nativeEvent = event || Events.setup(this.svg, this.id_svg, this.config);

        this.c_svg = "";
        this.type = "line";

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

        if(this.config.line != undefined && Object.keys(this.config.line.ends.start).length > 0){
            var child = FactoryForm.createForm(_uuid.generate(), this.config.line.ends.start.type, this.config.line.ends.start.props, this.svg, this.nativeEvent, this.config);
            if(this.config.line.ends.start.type == 'triangle')
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x);
                    c.setOffsetY(p.y - (this.config.line.ends.start.props.y3 - this.config.line.ends.start.props.y1)/2);
                },  (p, c) => {
                    c.setRotateCenter((c.x1 +c.x3) /2, (c.y1 + c.y3)  / 2);
                    c.setRotateAngle(p.calculateAngle());
                } );
            else if(this.config.line.ends.start.type == 'circle')
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x);
                    c.setOffsetY(p.y);
                },  (p, c) => {
                    c.setRotateCenter(c.x, c.y);
                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
                } );
            else
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x - this.config.line.ends.start.props.height/2);
                    c.setOffsetY(p.y - this.config.line.ends.start.props.height/2);
                },  (p, c) => {
                    c.setRotateCenter(c.x, c.y);
                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
                } );
        }

        if(this.config.line != undefined && Object.keys(this.config.line.ends.dest).length > 0){
            var child = FactoryForm.createForm(_uuid.generate(), this.config.line.ends.dest.type, this.config.line.ends.dest.props, this.svg, this.nativeEvent, this.config);
            if(this.config.line.ends.dest.type == 'triangle'){
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.dest_x);
                    c.setOffsetY(p.dest_y - (this.config.line.ends.dest.props.y3 - this.config.line.ends.dest.props.y1)/2);
                },  (p, c) => {
                    c.setRotateCenter((c.x1 +c.x3) /2, (c.y1 + c.y3)  / 2);
                    c.setRotateAngle(p.calculateAngle()+ ( Math.PI * 90)/180);
                } );
            }
            else {
                this.addChild(child, (p, c) => {
                    c.setOffsetX(p.x - this.config.line.ends.dest.props.height/2);
                    c.setOffsetY(p.y - this.config.line.ends.dest.props.height/2);
                },  (p, c) => {
                    c.setRotateCenter(c.x, c.y);
                    c.setRotateAngle(p.calculateAngle() + ( Math.PI * 90)/180 );
                } );
            }
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
        child.draw();
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
        if(this.c_points.length == 0)
            return;
    }

    drawBox(){

    }

    draw(){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        var p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("fill", this.config.form.fill);
        this.c_svg.setAttribute("stroke", this.config.form.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.form.strokeWidth);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();

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
        this.pente = (this.dest_x - this.x) != 0 ? (this.dest_y - this.y) / (this.dest_x - this.x) : undefined;

        if(this.pente == 0 || this.pente == undefined)
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