import { _uuid } from "./uuid";
import { _Register } from "../register";
import { EventManager } from "../eventManager";
import {events} from "../events";


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

    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y){

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.events = new EventManager();

        this.c_svg = "";
        this.type = "line";

        this.children = [];
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        this.p = "M "+  this.x + ","+ this.y + " "+ "C " + this.x+ "," + this.y + " " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", this.p);
        this.c_svg.setAttribute("fill", "none");
        this.c_svg.setAttribute("stroke", "indigo");
        this.c_svg.setAttributeNS(null, "stroke-width", "2px");

        svgs.appendChild(this.c_svg);

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

        this.events.create();

    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.p = "M "+  this.x + ","+ this.y + " "+ "C " + this.x+ "," + this.y + " " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        this.c_svg.setAttribute("d", this.p);
    }

    resize(pos, dx, dy, param = {}){

        var p = _Register.find(this.parent);

        if(Object.keys(param).length > 0){

        }
        else{
            if( pos == 0){
                var c_p = p.form.c_points[pos];
    
                // vertical line
                if( this.x == this.dest_x && this.y != this.dest_y){
                    if( (this.y - c_p.y) <   (this.dest_y - c_p.y)){
                        this.y += dy;
                    }
                    else{
                        this.dest_y += -dy;
                    }
                }
    
                // horizontal line
                else if( this.y == this.dest_y && this.x != this.dest_x){
                    if(  (this.x - c_p.x) <   (this.dest_x - c_p.x)  ){
    
                        this.x += dx;
                    }
                    else{
                        this.dest_x += dx;
                    }
                }
                else{
    
                }
    
            }
            else if(pos == 1){
                var c_p = p.form.c_points[pos];
    
                // vertical line
                if( this.x == this.dest_x && this.y != this.dest_y){
                    if(  ( this.y - c_p.y  ) <= ( this.dest_y - c_p.y) ){
                        this.y += dy;
                    }
                    else{
                        this.dest_y += -dy;
                    }
                }
                // horizontal line
                else if( this.y == this.dest_y && this.x != this.dest_x){
                    if( ( c_p.x - this.x) <= ( c_p.x - this.dest_x) ){
    
                        this.x += dx;
                    }
                    else{
                        this.dest_x += dx;
                    }
                }
                else{
    
                }
    
            }
            else if(pos == 2){
                var c_p = p.form.c_points[pos];
    
                // vertical line
                if( this.x == this.dest_x && this.y != this.dest_y){
                    if(  ( c_p.y - this.y ) <= ( c_p.y - this.dest_y ) ){
                        this.y += dy;
                    }
                    else{
                        this.dest_y += dy;
                    }
                }
                // horizontal line
                else if( this.y == this.dest_y && this.x != this.dest_x){
                    if( ( c_p.x - this.x) <= ( c_p.x - this.dest_x) ){
    
                        this.x += dx;
                    }
                    else{
                        this.dest_x += dx;
                    }
                }
                else{
    
                }
    
            }
            else if(pos == 3){
                var c_p = p.form.c_points[pos];
    
                // vertical line
                if( this.x == this.dest_x && this.y != this.dest_y){
                    if(  ( c_p.y - this.y ) <= ( c_p.y - this.dest_y ) ){
                        this.y += dy;
                    }
                    else{
                        this.dest_y += dy;
                    }
                }
                // horizontal line
                else if( this.y == this.dest_y && this.x != this.dest_x){
                    if( ( this.x - c_p.x ) <= ( this.dest_x - c_p.x) ){
    
                        this.x += dx;
                    }
                    else{
                        this.dest_x += dx;
                    }
                }
                else{
    
                }
    
            }
        }
    }


    createChildren(children){
        children.map((chd) => {
            if(chd.type == "triangle"){
                var _x1 = this.x + (chd.ratio.p1.x * this.width);
                var _y1 = this.y + (chd.ratio.p1.y * this.height); 
              
                var _x2 = this.x + (chd.ratio.p2.x * this.width);
                var _y2 = this.y + (chd.ratio.p2.y * this.height); 
        
                var _x3 = this.x + (chd.ratio.p3.x * this.width);
                var _y3 = this.y + (chd.ratio.p3.y * this.height); 
        
                var child = FactoryForm.createForm(_uuid.generate(), chd.type, {x1: _x1, y1: _y1, x2: _x2, y2: _y2, x3: _x3, y3: _y3}, [], chd.ratio, chd.zoom);
                this.children.push(child);
            }
        });
    }
}
export {Line};
 

