import { Point } from "./point";
import { Component } from "../component";

/**
 * @class Polyline
 */
class Polyline extends Component {
    constructor(points = [], isdrawing = true, save = true, id = undefined, config){

        super({uuid: id, isSave: save, config: config});

        this.x = points[0];
        this.y = points[1];

        this.dest_x = points[points.length - 2];
        this.dest_y = points[points.length - 1];

        this.points = points;

        this.type = "polyline";

        this.vertex = [
            new Point(this.uuid, 0, 0, 5, config),
            new Point(this.uuid, 0, 0, 5, config),
        ];
        this.c_points = [
            new Point(this.uuid, 0, 0, 5, config),
            new Point(this.uuid, 0, 0, 5, config),
        ];
        if (isdrawing)
            this.draw();
    }

    drawVertex(){
        if(this.vertex.length == 0)
            return;
    }

    drawConnector(){
        if(this.c_points.length == 0)
            return;
    }

    draw(){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'polyline');

        var path = "";
        for(var i = 0; i < this.points.length; i++){
            if(i % 2 == 0)
                path += this.points[i] + this.offsetX + ",";
            else
                path += this.points[i] + this.offsetY + " ";
        }
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("fill", this.config.shape.fill);
        this.c_svg.setAttribute("stroke", this.config.shape.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.shape.strokeWidth);
        this.c_svg.setAttribute("points", path);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();

        this.c_points.map((point) => {
            point.draw();
        });

        this.vertex.map( (vertex) => {
            vertex.draw();
        });

        this.children.map(({child}) =>{
            child.draw();
        });
    }

    shift(dx,dy){
        for (var i = 0; i < this.points.length; i++){
            if (i%2 == 0)
                this.points[i] += dx;
            else
                this.points[i] += dy;
        }
        this.children.map ( ({child}) => {
            child.shift(dx, dy);
        }); 
    }

    redraw(){
        this.drawVertex();
        this.vertex.map( (vertex) => {
            vertex.redraw();
        });
        var path = "";
        for(var i = 0; i < this.points.length; i++){
            if(i % 2 == 0)
                path += this.points[i] + this.offsetX + ",";
            else
                path += this.points[i] + this.offsetY + " ";
        }

        this.c_svg.setAttribute("points", path);

        this.children.map ( ({child}) => {
            child.redraw();
        });
    }

    calculateAngle(){
        var angle;
        var pente = (this.dest_y - this.y) / (this.dest_x - this.x);

        if(pente == 0)
            angle = 0;
        if( pente >= 0 && (this.x < this.dest_x && this.y < this.dest_y))
            angle = Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.y - this.dest_y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(pente >= 0 && (this.x > this.dest_x && this.y > this.dest_y))
            angle = Math.PI + Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if( pente <= 0 && (this.x < this.dest_x && this.y > this.dest_y))
            angle =  2 * Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );
        else if(pente <= 0 && (this.x > this.dest_x && this.y < this.dest_y))
            angle =   Math.PI -  Math.asin( (Math.sqrt( Math.pow((this.x - this.x), 2) + Math.pow((this.dest_y - this.y), 2)) ) / ( Math.sqrt( Math.pow((this.x - this.dest_x), 2) + Math.pow((this.y - this.dest_y), 2))) );

        return angle;
    }

    resize(pos, dx, dy){
        if(pos == 0){
            this.x += dx;
            this.y += dy;
        }
        else{
            this.dest_x += dx;
            this.dest_y += dy;
        }
        this.children.map ( ({child}) => {
            child.setRotateAngle((this.calculateAngle() + ( Math.PI * 90)/180));
            child.redraw();
        });
    }
}
export {Polyline}; 
