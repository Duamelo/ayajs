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

        this.events = new EventManager();

        this.c_svg = "";
        this.type = "line";

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0),
            new Point(this.uuid, 0, 0),
        ];
    }

    drawVertex(){
        this.vertex[0].x = this.x;
        this.vertex[0].y = this.y;

        this.vertex[1].x = this.dest_x;
        this.vertex[1].y = this.dest_y;
    }


    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("fill", "none");
        this.c_svg.setAttribute("stroke", "indigo");
        this.c_svg.setAttributeNS(null, "stroke-width", "2px");

        svgs.appendChild(this.c_svg);

        this.drawVertex();

        this.vertex.map( (vertex) => {
            vertex.draw(svgs);
        });

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

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

        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        this.c_svg.setAttribute("d", p);
    }

    resize(pos, dx, dy){
        if(pos == 0){
            this.x += dx;
            this.y += dy;
            this.c1.x += dx;
            this.c1.y += dy;
            this.c2.x += dx;
            this.c2.y += dy;
        }
        else{
            this.dest_x += dx;
            this.dest_y += dy;
        }
    }
}
export {Line};
 

