import { _Register } from "../register";
import { _uuid } from "./uuid";
import {events} from "../events";
/**
 * @class Circle
 */

class Circle
{
    /**
     * 
     * @param {string} uuid id
     * @param {number} x center abscissa
     * @param {number} y   center ordinate
     * @param {number} r radius of circle
     * @param {array} events   array of object events
     */

    constructor(uuid, x = 0, y = 0, r = 5, events = [], children = [], ratio = {}, zoom){

        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r;
        this.ratio = ratio;
        this.events = events;
        this.c_svg = "";
        this.type = "circle";
        this.zoom = zoom;
        _Register.add(this);
    }

    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";
    
        this.c_svg = document.createElementNS(ns,"circle");
    
        this.c_svg.setAttribute("cx", this.x);
    
        this.c_svg.setAttribute("cy",this.y);
    
        this.c_svg.setAttribute("r", this.r);

        this.c_svg.setAttributeNS(null, "fill", "red");

    
        this.c_svg.setAttribute("id", this.uuid);

        svgs.appendChild(this.c_svg);

        this.c_svg.addEventListener("mousedown", events.mouseDownCb);

    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){

        this.c_svg.setAttribute("cx", this.x);
        this.c_svg.setAttribute("cy",this.y);
        this.c_svg.setAttribute("r", this.r);
    }

    resize(pos, dx, dy, param = {}, zoom = false){
        if( this.zoom == false && Object.keys(this.ratio).length > 0 ){
            this.x = param.x + this.ratio.x * param.width;
            this.y = param.y + this.ratio.y * param.height;
        }else{
            this.x = param.x + this.ratio.x * param.width;
            this.y = param.y + this.ratio.y * param.height;
            (param.width <= param.height) ? this.r = this.ratio.r * param.width : this.r = this.ratio.r * param.height;
        }
    }
}
export {Circle};
