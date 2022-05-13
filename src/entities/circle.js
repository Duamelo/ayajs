import { _Register } from "../register";
import { _uuid } from "./uuid";
import {events} from "../events";
import { EventManager } from "../eventManager";
/**
 * @class Circle
 */

class Circle
{
    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     * @param {array of object} children 
     * @param {object} ratio 
     * @param {boolean} zoom 
     */

    constructor(uuid, x = 0, y = 0, r = 5, children = [], ratio = {}, zoom){

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        this.r = r;

        this.events = new EventManager();

        this.children = [];

        this.c_svg = "";
        this.type = "circle";

        this.ratio = ratio;
        this.zoom = zoom;

        this.createChildren(children);
        _Register.add(this);
    }

    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";

        this.c_svg = document.createElementNS(ns,"circle");

        this.c_svg.setAttribute("id", this.uuid);

        this.c_svg.setAttribute("cx", this.x);

        this.c_svg.setAttribute("cy",this.y);

        this.c_svg.setAttribute("r", this.r);

        this.c_svg.setAttributeNS(null, "fill", "indigo");

        svgs.appendChild(this.c_svg);

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

        this.events.create();
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

    resize(pos, dx, dy, param = {}){
        if(param.parent == "rectangle"){
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

    createChildren(children){
        children.map( (chd) => {

        });
    }
}
export {Circle};
