import { events } from "../events";
import { _uuid } from "./uuid";
import {config} from "../../config";


class Group{

    /**
     * 
     * @param {string} uuid 
     */

    constructor(uuid){

        this.uuid = uuid;

        this.events = "";


        this.c_svg = "";
        this.type = "group";

          /**
     * @description
     * .This variable represents the value of the rotation angle to be
     *  applied to rotate the group.
     * 
     * @type { Number } - The angle is given in radian.
     */
    this.angle = 0;



    /**
     * @description
     * The center of rotation is defined by defining centerX.
     * 
     * @type { Number } - centerX
     */
    this.centerX = 0;

    /**
     * @description
     * The center of rotation is defined by defining centerY.
     * 
     * @type { Number } - centerY
     */
    this.centerY = 0;

    this.c_svg = "";

    this.children = [];
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
        child.draw(this.c_svg);
        this.children.push({child, translate, rotate});
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

    /**
     * @param {DOMElement} svgs 
     */
    draw(svgs){
        const svgns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(svgns, "g");

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("fill", "black");
        this.c_svg.setAttribute("stroke", config.form.stroke);
        this.c_svg.setAttribute("transform", "rotate(0, 0, 0)");
        this.c_svg.setAttribute("transform", "translate(0, 0)");

        svgs.appendChild(this.c_svg);
        this.addEvent("mousedown", events.mouseDownCb);
    }

    removeFromDOM(){
        svg.removeChild(this.c_svg);
    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
    }

    resize(pos, dx, dy, param = {}){
    }
}
export {Group};