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

    constructor(uuid, x = 0, y = 0, r = 5){

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        this.r = r;

        this.events = new EventManager();

        this.box = ""
        this.c_svg = "";
        this.type = "circle";

        this.scale = 1;

        this.offsetX = 0;
        this.offsetY = 0;
    
        this.angle = 0;
  
        this.children = [];
      
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
    }

    addChild(child, scale, rotate){
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        scale(this, child);
        rotate(this, child);
        child.draw(svg);
        this.children.push({child, scale, rotate});
    }
  
    drawVertex(){
        this.vertex[0].x = this.x + this.offsetX - this.r * this.scale;
        this.vertex[0].y = this.y + this.offsetY - this.r * this.scale;
    
        this.vertex[1].x = this.x + this.offsetX + this.r * this.scale;
        this.vertex[1].y = this.y + this.offsetY - this.r * this.scale;

        this.vertex[2].x = this.x + this.offsetX + this.r * this.scale;
        this.vertex[2].y = this.y + this.offsetY + this.r * this.scale;
    
        this.vertex[3].x = this.x + this.offsetX - this.r * this.scale;
        this.vertex[3].y = this.y + this.offsetY + this.r * this.scale;
    }
    
    drawConnector() {
        this.c_points[0].x = this.x + this.offsetX;
        this.c_points[0].y = this.y + this.offsetY - this.r * this.scale;

        this.c_points[1].x = this.x + this.offsetX + this.r * this.scale;
        this.c_points[1].y = this.y + this.offsetY;

        this.c_points[2].x = this.x + this.offsetX;
        this.c_points[2].y = this.y + this.offsetY + this.r * this.scale;

        this.c_points[3].x = this.x + this.offsetX - this.r * this.scale;
        this.c_points[3].y = this.y + this.offsetY;
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

        this.c_svg.setAttribute("cx", this.x + this.offsetX);

        this.c_svg.setAttribute("cy",this.y + this.offsetY);

        this.c_svg.setAttribute("r", this.r * this.scale);
        

        this.c_svg.setAttribute("fill", "white");

        this.c_svg.setAttribute("stroke", "rgb(82, 170, 214)");

    
        this.c_svg.setAttribute("stroke-width", "1.5");
    
      
        /** draw box */
        this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
        this.box.setAttributeNS(null, "stroke-width", "1px");
        this.box.setAttributeNS(null, "fill", "none");
        this.box.setAttribute("stroke-dasharray", "4");

        
        svgs.appendChild(this.c_svg);
        svgs.appendChild(this.box);

        this.drawVertex();
        this.drawConnector();
        this.drawBox();

        this.c_points.map((point) => {
            point.draw(svgs);
        });

        this.vertex.map((point) => {
            point.draw(svgs);
        });

        this.children.map( ({child, scale, rotate}) => {
            scale(this, child);
            rotate(this, child);
            child.redraw();
        });

        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

        this.events.create();
    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.c_svg.setAttribute("cx", this.x + this.offsetX);
        this.c_svg.setAttribute("cy",this.y + this.offsetY);
        this.c_svg.setAttribute("r", this.r * this.scale);

        this.drawConnector();
        this.drawVertex();
        this.drawBox();

        this.vertex.map((vert) => {
            vert.redraw();
        });

        this.c_points.map( (point) => {
            point.redraw();
        });

        this.children.map( ({child, scale, rotate}) => {
            scale(this, child);
            rotate(this, child);
            child.redraw();
        });
    }

    resize(pos, dx, dy){
        if(pos == 0)
            this.r += -dx;
        else if(pos == 1)
            this.r += dx;
        else if(pos == 2)
            this.r += dx;
        else
            this.r -= dx;

        this.children.map( ({child, scale, rotate}) => {
            scale(this, child);
            rotate(this, child);
            child.redraw();
        });
    }

    setRotateAngle(angle){
        this.angle = angle;
    }
    
    setOffsetX(x){
       this.offsetX = x;
    }

    setOffsetY(y){
        this.offsetY = y;
    }

    setScale(sc){
        this.scale = sc;
    }
    getOffsetX(){
        return this.offsetX;
    }

    getOffsetY(){
        return this.offsetY;
    }

    getScale(){
        return this.scale;
    }

    optimalPath(line){
        var _x, _y;
        var a = (line.dest_y - line.y)/(line.dest_x - line.x);
        var b = line.y - a * line.x;
    
        for (var i = 0; i <= 3; i++){
            if(i % 2 == 0){
                _y = this.vertex[i].y;
                _x = (_y - b)/a;
            }
            else{
                _x = this.vertex[i].x;
                _y = a * _x + b;
            }
    
            if( (_x == line.x && _y == line.y) || (_x == line.dest_x && _y == line.dest_y))
              continue;
    
              if(((i == 0 &&  _x > this.vertex[i].x && _x < this.vertex[i+1].x) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) ||
               ((i == 1 &&  _y > this.vertex[i].y && _y < this.vertex[i+1].y) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) || 
               ((i == 2 &&  _x > this.vertex[i+1].x && _x < this.vertex[i].x) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  )|| 
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ))) ||
               ((i == 3 &&  _y >= this.vertex[0].y && _y <= this.vertex[i].y) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) || 
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) ) )) {
                return this.c_points[i];
               }
          }
        return null;
      }
}
export {Circle};
