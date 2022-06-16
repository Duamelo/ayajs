import { _Register } from "../register";
import { _uuid } from "./uuid";
import { Point } from "./point";
import { Form } from "../abstraction/form";

/**
 * @class Circle
 */
class Circle extends Form {
    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     */

    constructor(uuid, x = 0, y = 0, r = 5, svg, event, config){

        super();

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        this.r = r;

        this.events = {};
        this.nativeEvent = event;
        this.config = config;

        this.box = ""
        this.c_svg = "";
        this.svg = svg;

        this.type = "circle";

        this.scale = 1;

        this.offsetX = 0;
        this.offsetY = 0;
    
        this.angle = 0;
  
        this.children = [];
      
        this.c_points = [
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent)
        ];

        this.vertex = [
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent)
        ];
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
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        translate(this, child);
        rotate(this, child);
        child.draw();
        this.children.push({child, translate, rotate});
    }
  
    drawVertex(){
        if(this.vertex.length == 0)
            return;
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
        if(this.c_points.length == 0)
            return;
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
    
    draw(){
        var ns="http://www.w3.org/2000/svg";

        this.box = document.createElementNS(ns, "path");
        this.c_svg = document.createElementNS(ns,"circle");

        this.c_svg.setAttribute("id", this.uuid);

        this.c_svg.setAttribute("cx", this.x + this.offsetX);

        this.c_svg.setAttribute("cy",this.y + this.offsetY);

        this.c_svg.setAttribute("r", this.r * this.scale);
        

        this.c_svg.setAttribute("fill", this.config.form.fill);

        this.c_svg.setAttribute("stroke", this.config.form.stroke);

    
        this.c_svg.setAttribute("stroke-width", this.config.form.strokeWidth);
    
      
        /** draw box */
        this.box.setAttributeNS(null, "stroke", config.box.stroke);
        this.box.setAttributeNS(null, "stroke-width", config.box.strokeWidth);
        this.box.setAttributeNS(null, "fill", config.box.fill);
        this.box.setAttribute("stroke-dasharray", config.box.strokeDasharray);

        
        this.svg.appendChild(this.c_svg);
        this.svg.appendChild(this.box);

        this.drawVertex();
        this.drawConnector();
        this.drawBox();

        this.c_points.map((point) => {
            point.draw();
        });

        this.vertex.map((point) => {
            point.draw();
        });

        this.children.map( ({child, translate, rotate}) => {
            translate(this, child);
            rotate(this, child);
            child.redraw();
        });

        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
    }


    removeFromDOM(){
        this.svg.removeChild(this.box);
        this.svg.removeChild(this.c_svg);
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

        this.children.map( ({child, translate, rotate}) => {
            translate(this, child);
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

        this.children.map( ({child, translate, rotate}) => {
            translate(this, child);
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
