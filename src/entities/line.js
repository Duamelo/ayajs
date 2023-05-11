import { _Register } from "../register";
import { Point } from "./point";
import { Events } from "../events";
import { Component } from "../component";

/**
 * @class Line
 */
class Line extends Component{

    /**
     * @param {String} id 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} dest_x 
     * @param {Number} dest_y 
     */
    constructor(x=0, y=0, dest_x = x, dest_y = y, isdrawing = true, save = true, id = undefined, config){

        super({uuid: id, isSave: save, config: config});

        this.x = x;
        this.y = y;

        this.c1 = {
            x: this.x,
            y: this.y
        };

        this.c2 = {
            x: this.x,
            y: this.y
        };
        
        this.dest_x = dest_x;
        this.dest_y = dest_y;

        this.type = "line";
        this.p = null;
        this.path_is_set = false;

        this.vertex = [
            new Point(this.uuid, 0, 0, 3, config),
            new Point(this.uuid, 0, 0, 3, config),
        ];
        this.c_points = [];
        if (isdrawing)
            this.draw();
    }
    
    drawVertex(){
        if(this.vertex.length == 0)
            return;
        
        this.vertex[0].x = this.x + this.offsetX;
        this.vertex[0].y = this.y + this.offsetY;

        this.vertex[1].x = (this.dest_x + this.offsetX) * this.scaleX;
        this.vertex[1].y = (this.dest_y + this.offsetY) * this.scaleY;
    }

    drawConnector(){
        if(this.c_points.length == 0)
            return;
    }
    
    setPath(points = [{}]){
        this.path_is_set = true;
        this.p = "M "+  (this.x) + ","+ (this.y) + " ";

        points.map((pt)=>{
            this.p +=  "L "  + (pt.x) + ","+ (pt.y) + " ";
        });
        this.p += "L " +  (this.dest_x)  + "," + (this.dest_y);
    }

    setPathCur(points = [{}]){
        this.path_is_set = true;
        var vertical = false;
        var y_inverse = 1;
        var x_inverse = 1;
        var i_inverse = 1;
        var i_xinverse = 1;
        this.p = "M "+  (this.x) + ","+ (this.y) + " ";

        if ((this.y < points[0].y && this.dest_y < points[1].y) ||
            (this.y > points[0].y && this.dest_y > points[1].y))
            i_inverse = -1;

        if ((this.x < points[0].x && this.dest_x < points[1].x) ||
            (this.x > points[0].x && this.dest_x > points[1].x))
            i_xinverse = -1;

        if (this.x > this.dest_x)
            x_inverse = -1;

        if (this.dest_y > this.y)
            y_inverse = -1;

        if (points[0].x == points[1].x)
            vertical = true;
        
        for (var i = 0; i < points.length; i++){
            if (vertical){
                this.p += "L " + (points[i].x - 5 * (i == 0) * x_inverse * i_xinverse) + "," + (points[i].y + 5 * i * y_inverse) + " ";

                this.p += "C " + (points[i].x - 2.5 * (i == 0) * x_inverse * i_xinverse) + "," + (points[i].y + 2.5 * i * y_inverse) + " , " + 
                                (points[i].x  + 2.5 * i * x_inverse) + "," + (points[i].y - 2.5 * (i == 0) * y_inverse) + " , " + 
                                (points[i].x + 5 * i * x_inverse) + "," + (points[i].y - 5 * (i == 0) * y_inverse); 
            }
            else{
                this.p += "L " + (points[i].x - 5 * i * x_inverse) + "," + (points[i].y + 5 * y_inverse *  !i) + " ";
        
                this.p += "C " + (points[i].x - 2.5 * i * x_inverse) + "," + (points[i].y + 2.5 * y_inverse * !i) + " , " + 
                                (points[i].x + 2.5 * x_inverse * !i) + "," + (points[i].y -( 2.5 * y_inverse * i * i_inverse)) + " , " + 
                                (points[i].x + 5 * x_inverse * !i) + "," + (points[i].y - 5 * y_inverse * i * i_inverse); 
            }
        }
        this.p += "L " + (this.dest_x) + "," + (this.dest_y) + " ";
    }

    draw(){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        if (this.p == null)
            this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", this.p);
        this.c_svg.setAttribute("fill", this.config.line.fill);
        this.c_svg.setAttribute("stroke", this.config.shape.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.line.strokeWidth);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();

        this.vertex.map((vertex) => {
            vertex.draw();
        });

        this.children.map(({child}) =>{
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
            this.c_svg.setAttribute("class","move");
        });
    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;

        this.dest_x += dx;
        this.dest_y += dy;

        this.children.map(({child}, index) => {
            child.shift(dx, dy);
        });
    }

    redraw(){
        this.drawVertex();

        this.vertex.map((vertex) => {
            vertex.redraw();
        });

        if (!this.path_is_set)
                this.p = "M "+  (this.x + this.offsetX) + ","+ (this.y + this.offsetY) + " " + ((this.dest_x + this.offsetX ) * this.scaleX)  + "," + ((this.dest_y + this.offsetY) * this.scaleY);
        else
            this.path_is_set = false;

        this.c_svg.setAttribute("d", this.p);

        this.children.map(({child}) => {
            child.redraw();
        });
    }

    calculateAngle(){
        var angle = 0;
        // we can ommit the slope
        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);
        if(this.dest_x == this.x)
            angle = Math.PI/2;
        if(pente == 0)
            angle = 0;
        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
            Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
            Math.pow((this.y - this.dest_y), 2))) );
        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
            Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
            Math.pow((this.y - this.dest_y), 2))) );
        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
            angle = Math.PI - Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        return angle;
    }

    inclination(){
        var angle = 0;
        // we can ommit the slope
        var slope = (this.dest_y - this.y) / (this.dest_x - this.x);
        if(this.dest_x == this.x)
            angle = Math.PI/2;
        else if(slope == 0)
            angle = 0;
        else 
            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + 
                Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + 
                Math.pow((this.y - this.dest_y), 2))) );

        if (slope > 0)
            angle *= -1;
        return angle;
    }

    resize(pos, dx, dy){
        if(pos == 0){
            this.x += dx;
            this.y += dy;

            if (this.children[0]) 
                this.children[0].child.shift(dx, dy);
        }
        else{
            this.dest_x += dx;
            this.dest_y += dy;

            if (this.children[1]) 
                this.children[1].child.shift(dx, dy);
        }
        this.children.map(({child}, index) => {
            child.redraw();
        });
    }
}
export {Line};
