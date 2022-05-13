import { _Register } from "../register";
import { _uuid } from "./uuid";
import {events} from "../events";
import { EventManager } from "../eventManager";
import { Point } from "./point";

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

        this.box = ""
        this.c_svg = "";
        this.type = "circle";

        this.ratio = ratio;
        this.zoom = zoom;
      
        this.c_points = [
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 )
        ];
        this.vertex = [
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 ),
            new Point(this.uuid,0, 0 )
        ];

        this.createChildren(children);
       
        _Register.add(this);
    }


  
    drawVertex(){
        this.vertex[0].x = this.x - this.r;
        this.vertex[0].y = this.y - this.r;
    
        this.vertex[1].x = this.x + this.r;
        this.vertex[1].y = this.y - this.r;

        this.vertex[2].x = this.x + this.r;
        this.vertex[2].y = this.y + this.r;
    
        this.vertex[3].x = this.x - this.r;
        this.vertex[3].y = this.y + this.r;

        
    }
    
    drawConnector() {
        this.c_points[0].x = this.x;
        this.c_points[0].y = this.y - this.r;

        this.c_points[1].x = this.x + this.r;
        this.c_points[1].y = this.y;


        this.c_points[2].x = this.x;
        this.c_points[2].y = this.y + this.r;

        this.c_points[3].x = this.x - this.r;
        this.c_points[3].y = this.y;
    }

    drawBox(){

        var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
                  L ${this.c_points[0].x} ${this.c_points[0].y} 
                  L ${this.vertex[1].x}   ${this.vertex[1].y} 
                  L ${this.c_points[1].x} ${this.c_points[1].y}
                  L ${this.vertex[2].x}   ${this.vertex[2].y}
                  L ${this.c_points[2].x} ${this.c_points[2].y} 
                  L ${this.vertex[3].x}   ${this.vertex[3].y} 
                  L ${this.c_points[3].x} ${this.c_points[3].y} Z`;
    
        this.box.setAttribute("d", p);
      }
    
    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";

        this.box = document.createElementNS(ns, "path");
        this.c_svg = document.createElementNS(ns,"circle");

        this.c_svg.setAttribute("id", this.uuid);

        this.c_svg.setAttribute("cx", this.x);

        this.c_svg.setAttribute("cy",this.y);

        this.c_svg.setAttribute("r", this.r);
        
        this.c_svg.setAttribute("fill", "rgb(224, 115, 115)");

        this.c_svg.setAttribute("fill", "rgb(224, 115, 115)");

        this.c_svg.setAttribute("stroke", "rgb(82, 170, 214)");

    
        this.c_svg.setAttribute("stroke-width", "1.5");
    
      
        /** draw box */
        this.drawBox();
        this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
        this.box.setAttributeNS(null, "stroke-width", "1px");
        this.box.setAttributeNS(null, "fill", "none");
        this.box.setAttribute("stroke-dasharray", "4");

        
        svgs.appendChild(this.c_svg);
        svgs.appendChild(this.box);

        this.drawVertex();
        this.drawConnector();

        this.c_points.map((point) => {
            point.draw(svgs);
          });
      
          this.vertex.map((point) => {
            point.draw(svgs);
          });
      

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

        this.drawConnector();
        this.drawVertex();
        this.drawBox();


        this.vertex.map((vert) => {
            vert.redraw();
            });

            this.c_points.map( (point) => {
            point.redraw();
        });

    }

    resize(pos, dx, dy, param = {}){
        if(Object.keys(param).length > 0){
            if( this.zoom == false && Object.keys(this.ratio).length > 0 ){
                this.x = param.x + this.ratio.x * param.width;
                this.y = param.y + this.ratio.y * param.height;
            }
            else{
                this.x = param.x + this.ratio.x * param.width;
                this.y = param.y + this.ratio.y * param.height;
                (param.width <= param.height) ? this.r = this.ratio.r * param.width : this.r = this.ratio.r * param.height;
            }
        }
        else{
            if(pos == 0)
                this.r += -dx;
            else if(pos == 1)
                this.r += dx;
            else if(pos == 2)
                this.r += dx;
            else
                this.r -= dx;
        }

        
    }

    createChildren(children){
        children.map( (chd) => {

        });
    }

}
export {Circle};
