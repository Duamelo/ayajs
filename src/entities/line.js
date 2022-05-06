import { _uuid } from "./uuid";
import { _Register } from "../register";

/**
 * @class Line
 */

class Line 
{
    constructor(uuid, x=0, y=0, events, dest_x = x, dest_y = y){
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.dest_x = dest_x;
        this.dest_y = dest_y;
        this.events = events;
        this.c_svg = "";
        this.p = "";
        _Register.add(this);
        
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", this.p);
        this.c_svg.setAttribute("stroke", "black");
        this.c_svg.setAttributeNS(null, "stroke-width", "4px");

        
        svgs.appendChild(this.c_svg);
    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        this.c_svg.setAttribute("d", this.p);
    }

    resize(pos, dx, dy, zoom = false){

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
}
 
export {Line};
 

