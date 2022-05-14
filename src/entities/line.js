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

    constructor(uuid, x=0, y=0, dest_x = x, dest_y = y, children = [], ratio = {}){

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;
        
        //points d'inflexion

        this.c1 = { x : this.x, y : this.y};
        this.c2 = { x : this.x, y : this.y};


        this.events = new EventManager();

        this.c_svg = "";
        this.type = "line";

        this.ratio = ratio;
        this.children = [];


        this.createChildren(children);
        _Register.add(this);
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        // var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        // var p = "M "+  this.x + ","+ this.y + " "+ "C " + this.c1.x+ "," + this.c1.y + " " + this.c2.x + "," + this.c2.y + " " + this.dest_x  + "," + this.dest_y;
        var p = "M "+  this.x + ","+ this.y + " "+ "L" + this.c1.x+ "," + this.c1.y + "  L" + this.c2.x + "," + this.c2.y + "  L" + this.dest_x  + "," + this.dest_y;

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("stroke", "indigo");
        this.c_svg.setAttribute("fill", "none");
        this.c_svg.setAttributeNS(null, "stroke-width", "1px");

        svgs.appendChild(this.c_svg);

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

        this.events.create();

    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        // var p = "M "+  this.x + ","+ this.y + " "+ "C " + this.c1.x+ "," + this.c1.y + " " + this.c2.x + "," + this.c2.y + " " + this.dest_x  + "," + this.dest_y;
        var p = "M "+  this.x + ","+ this.y + " "+ "L" + this.c1.x+ "," + this.c1.y + "  L" + this.c2.x + "," + this.c2.y + "  L" + this.dest_x  + "," + this.dest_y;
        
        this.c_svg.setAttribute("d", p);
    }

    resize(pos, dx, dy, param = {}){

        var p = _Register.find(this.parent);

        if( pos == 0){
            console.log("pos = 0");
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
            console.log("pos = 1");
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
            console.log("pos = 2");
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
            console.log("pos = 3");
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


    createChildren(children){
        children.map((chd) => {

        });
    }
}
export {Line};
 

