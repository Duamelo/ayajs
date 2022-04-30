import { _uuid } from "./uuid";
import {events} from "../events";
import { _Register } from "../register";
/**
 * @class Line class
 */

class Line 
{
    constructor(uuid, x=0, y=0, events, dest_x = x, dest_y = y){
        
        // this.parent = uuid;
        this.uuid = _uuid.generate();
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

        this.c_svg.addEventListener("mousedown", events.mouseDownCb);

    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        this.c_svg.setAttribute("d", this.p);
    }
    
}
 
export {Line};
 

