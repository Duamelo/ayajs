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
        this.line_svg = "";

        this.c_points = Connector.create("circle", uuid);
        this.vertex = Connector.create("circle", uuid);
        this.drawConnector();
        this.drawVertex();
        this.drawLineConnector(svg);
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
        
        this.c_svg.setAttribute("fill", "rgb(224, 115, 115)");

        this.c_svg.setAttribute("stroke", "rgb(82, 170, 214)");
        
        this.c_svg.setAttribute("stroke-width", "1.5");
    
        this.c_svg.setAttribute("id", this.uuid);

        svgs.appendChild(this.c_svg);
      
        this.vertex.map((vert) => {
          vert.draw(svgs);
         });

        this.c_points.map((point) => {
           point.draw(svgs);
          });

        this.c_svg.addEventListener("mousedown", events.mouseDownCb);
        this.c_svg.addEventListener("mouseup", events.mouseUpCb);
        this.c_svg.addEventListener("mouseover", events.mouseOverCb);
        this.c_svg.addEventListener("mouseleave", events.mouseLeaveCb);
       
  }

  drawLineConnector(svg){
    const ns = "http://www.w3.org/2000/svg";
    this.line_svg = document.createElementNS(ns, "path");

    this.p = `M ${this.vertex[0].x} ${this.vertex[0].y}
              L ${this.c_points[1].x} ${this.c_points[1].y} 
              L ${this.vertex[1].x}   ${this.vertex[1].y} 
              L ${this.c_points[2].x} ${this.c_points[2].y}
              L ${this.vertex[2].x}   ${this.vertex[2].y}
              L ${this.c_points[3].x} ${this.c_points[3].y} 
              L ${this.vertex[3].x}   ${this.vertex[3].y} 
              L ${this.c_points[0].x} ${this.c_points[0].y} Z`;

    this.line_svg.setAttribute("id", this.uuid);
    this.line_svg.setAttribute("d", this.p);
    this.line_svg.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
    this.line_svg.setAttributeNS(null, "stroke-width", "1px");
    this.line_svg.setAttributeNS(null, "fill", "none");
    this.line_svg.setAttribute("stroke-dasharray", "4");

    svg.appendChild(this.line_svg);

  }

  drawVertex(){
    this.vertex[0].x = this.x - this.r;
    this.vertex[0].y = this.y - this.r;

    this.vertex[1].x = this.x - this.r;
    this.vertex[1].y = this.y + this.r;

    this.vertex[2].x = this.x + this.r;
    this.vertex[2].y = this.y + this.r;

    this.vertex[3].x = this.x + this.r;
    this.vertex[3].y = this.y - this.r;
   }

  drawConnector() {
    this.c_points[0].x = this.x;
    this.c_points[0].y = this.y - this.r;

    this.c_points[1].x = this.x - this.r;
    this.c_points[1].y = this.y;

    this.c_points[2].x = this.x;
    this.c_points[2].y = this.y + this.r;

    this.c_points[3].x = this.x + this.r;
    this.c_points[3].y = this.y;
  }


  resize(pos,deltaX) {

    if(pos == 0 || pos == 1 ) {
      this.r -= deltaX;
      this.drawConnector();
      this.drawVertex();
    }
    else {
      this.r += deltaX;
      this.drawConnector();
      this.drawVertex();
    }

    if(this.r <= 20)
      this.r = 20;
    
    }
    

  redraw() {
    this.c_svg.setAttribute("cx", this.x);
    this.c_svg.setAttribute("cy", this.y);
    this.c_svg.setAttribute("r", this.r);
  
    this.c_points.map((p) => {
      p.redraw();
    });

    this.vertex.map((vert) => {
      vert.redraw();
    });

  }

  redrawLineConnector()
  {
    this.p = `M ${this.vertex[0].x} ${this.vertex[0].y}
              L ${this.c_points[1].x} ${this.c_points[1].y} 
              L ${this.vertex[1].x}   ${this.vertex[1].y} 
              L ${this.c_points[2].x} ${this.c_points[2].y}
              L ${this.vertex[2].x}   ${this.vertex[2].y}
              L ${this.c_points[3].x} ${this.c_points[3].y} 
              L ${this.vertex[3].x}   ${this.vertex[3].y} 
              L ${this.c_points[0].x} ${this.c_points[0].y} Z`;
    
    this.line_svg.setAttribute("d", this.p);
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

export {Circle};
