import { Events } from "../events";
import { Component } from "../component";

/**
 * @class Circle
 */
class Circle extends Component{
    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     */
    constructor(x = 0, y = 0, r = 3, isdrawing = true, save = true, id = undefined, config){
        super({uuid: id, isSave: save, config: config});

        this.x = x;
        this.y = y;
        this.r = r;

        this.box = "";

        this.c_svg = "";

        this.type = "circle";

        this.scale = 1;
    
        this.angle = 0;
        if (isdrawing)
            this.draw();
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
        if(this.c_points.length == 0 || this.vertex.length == 0)
            return;
  
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

        this.c_svg.setAttribute("cx", (this.x + this.offsetX));

        this.c_svg.setAttribute("cy", (this.y + this.offsetY));

        this.c_svg.setAttribute("r", (this.r * this.scale));

        this.c_svg.setAttribute("fill", this.config.shape.fill);

        this.c_svg.setAttribute("stroke", this.config.shape.stroke);
    
        this.c_svg.setAttribute("stroke-width", this.config.shape.strokeWidth);
    
        /** draw box */
        this.drawVertex();
        this.drawConnector();
        this.drawBox();  
        
        this.box.setAttribute("id", this.uuid);
        this.box.setAttributeNS(null, "fill", this.config.box.fill);
        this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
        this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
        this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

        this.svg.appendChild(this.c_svg);
        this.svg.appendChild(this.box);

        this.c_points.map((point) => {
            point.draw();
        });

        this.vertex.map((point) => {
            point.draw();
        });

        this.children.map(({child}) => {
            child.draw();
        });
        this.addEvent("mousedown", (e) => {
            Events.mousedowncb(e, this.config)
        });
        this.addEvent("mouseleave", (e) => {
            Events.mouseleavecb(e, this.config);
        });
        this.addEvent("mouseover", (e) => {
            Events.mouseovercb(e, this.config);
        });
    }

    removeBoxFromDOM(){
        this.svg.removeChild(this.box);
    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;

        this.children.map(({child}) => {
            child.shift(dx, dy);
        }); 
    }

    redraw(){
        this.c_svg.setAttribute("cx", (this.x + this.offsetX));
        this.c_svg.setAttribute("cy", (this.y + this.offsetY));
        this.c_svg.setAttribute("r", (this.r * this.scale));

        this.drawConnector();
        this.drawVertex();
        this.drawBox();

        this.vertex.map((vt) => {
            vt.redraw();
        });

        this.c_points.map((pt) => {
            pt.redraw();
        });

        this.children.map(({child}) => {
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

        this.children.map(({child}) => {
            child.redraw();
        });
    }
}
export {Circle};
