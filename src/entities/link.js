import  {_uuid}  from "../uuid.js";
import {_Register}  from "../register.js"
import { config } from "../../config.js";
import { Line } from "./line.js";

/**
 * @class Link
 */
class Link
{
    constructor(src_id, dest_id, userconfig = {})
    {
	var obj = {};
        this.uuid = _uuid.generate();

        var src =  _Register.find(src_id);
        var dest =  _Register.find(dest_id);

	if (!src || !dest)
            throw new Error("component is missing");

        this.type = "link";

	this.src_end_csvg = null;
	this.dest_end_csvg = null;

	if (userconfig.subtype)
	    this.subtype = userconfig.subtype;
	else
	    this.subtype = config.link.type;

	if (userconfig.end_start)
	    this.end_start = userconfig.end_start;
	else
	    this.end_start = config.link.end_start;

	if (userconfig.end_dest)
	    this.end_dest = userconfig.end_dest;
	else
	    this.end_dest = config.link.end_dest;


	if (this.subtype != "broke")
	    obj = this.optimal(src, dest);
	else
            obj = this.breakline(src, dest);

	/* reference on connexion points*/
        this.source = src.shape.c_points[obj.src];
        this.destination = dest.shape.c_points[obj.dest];

	this.line = new Line(_uuid.generate(),
			     this.source.x,
			     this.source.y,
			     this.destination.x,
			     this.destination.y
			    );

	if (this.subtype == "broke"){
	    this.line.c1.x = obj.c1.x;
            this.line.c1.y = obj.c1.y;
            this.line.c2.x = obj.c2.x;
            this.line.c2.y = obj.c2.y;
	    this.line.setPath([this.line.c1, this.line.c2]);
	}
	this.line.draw();
	this.line.setStyles({fill: "none"});

	if (this.end_start)
	    this.addEnd(this.end_start, "source");

	if (this.end_dest)
	    this.addEnd(this.end_dest, "destination");

	_Register.add(this);
    }

    addEnd(type, target){
	if (type != "triangle")
	    return;
	var x, y, h, base, angle, dxa, dya, dx, dy, obj = {}, elt;
	var line_x, line_y, line_dest_x, line_dest_y;

	line_x = this.line.x;
	line_y = this.line.y;
	line_dest_x = this.line.dest_x;
	line_dest_y = this.line.dest_y;

	if (type == "triangle"){
	    h = config.ends.tri.h;
	    base = config.ends.tri.base;
	    angle = this.line.inclination();
   	}
	if (target == "source"){
	    x = this.line.x;
	    y = this.line.y;

	    if (this.src_end_csvg)
		this.src_end_csvg.remove();

	    if ((this.line.x != this.line.c1.x &&
                this.line.c1.x == (this.line.x + this.line.dest_x)/2 &&
                this.line.x != this.line.dest_x) ||
                (this.line.y != this.line.c1.y &&
                this.line.c1.y == (this.line.y + this.line.dest_y)/2 &&
                this.line.x != this.line.dest_x)){

                line_dest_x = this.line.c1.x;
                line_dest_y = this.line.c1.y;
            }
	}
	else if (target == "destination"){
	    x = this.line.dest_x;
	    y = this.line.dest_y;
	    h = -h;

	    if (this.dest_end_csvg)
		this.dest_end_csvg.remove();

	    if ((this.line.dest_x != this.line.c2.x &&
		 this.line.c2.x == (this.line.x + this.line.dest_x)/2 &&
                 this.line.x != this.line.dest_x) ||
                (this.line.dest_y != this.line.c2.y &&
                 this.line.c2.y == (this.line.y + this.line.dest_y)/2 &&
                 this.line.x != this.line.dest_x)){

                line_x = this.line.c2.x;
                line_y = this.line.c2.y;
	    }
	}
        if (line_y == line_dest_y){
            if (line_x < line_dest_x){
                obj.x1 = x;
                obj.y1 = y;

                obj.x2 = x + h;
                obj.y2 = y - base / 2;

                obj.x3 = x + h;
                obj.y3 = y + base / 2;
            }
            else{
                obj.x1 = x;
                obj.y1 = y;

                obj.x2 = x - h;
                obj.y2 = y + base / 2;

                obj.x3 = x - h;
                obj.y3 = y - base / 2;
            }
        }
        else if (line_x == line_dest_x){
            if (line_y < line_dest_y){
                obj.x1 = x;
                obj.y1 = y;

                obj.x2 = x + base / 2;
                obj.y2 = y + h;

                obj.x3 = x - base / 2;
                obj.y3 = y + h;
            }
            else{
                obj.x1 = x;
                obj.y1 = y;

                obj.x2 = x - base / 2;
                obj.y2 = y - h;

                obj.x3 = x + base / 2;
                obj.y3 = y - h;
            }
        }
        else{
            dxa = h * Math.cos(angle);
            dya = h * Math.sin(angle < 0 ? - angle : angle);

            dy = (base / 2) * Math.cos(angle);
            dx = (base / 2) * Math.sin(angle < 0 ? - angle : angle);

            if (angle < 0){
                if (line_x < line_dest_x){
                    obj.x1 = x;
                    obj.y1 = y;

                    obj.x2 = x + dxa + dx;
                    obj.y2 = y + dya - dy;

                    obj.x3 = x + dxa - dx;
                    obj.y3 = y + dya + dy;
                }
                else if (line_x > line_dest_x){
                    obj.x1 = x;
                    obj.y1 = y;

                    obj.x2 = x - dxa + dx;
                    obj.y2 = y - dya - dy;

                    obj.x3 = x - dxa - dx;
                    obj.y3 = y - dya + dy;
                }
            }
            else{
                if (line_x < line_dest_x){
                    obj.x1 = x;
                    obj.y1 = y;

                    obj.x2 = x + dxa - dx;
                    obj.y2 = y - dya - dy;

                    obj.x3 = x + dxa + dx;
                    obj.y3 = y - dya + dy;
                }
                else if (line_x > line_dest_x){
                    obj.x1 = x;
                    obj.y1 = y;

                    obj.x2 = x - dxa + dx;
                    obj.y2 = y + dya + dy;

                    obj.x3 = x - dxa - dx;
                    obj.y3 = y + dya - dy;
                }
            }
        }
	const ns = "http://www.w3.org/2000/svg";
	var c_svg = document.createElementNS(ns, "path");
	var p = "M " + obj.x1 +  "," + obj.y1 + " " + "L " + obj.x2 + "," + obj.y2 + " " + "L " + obj.x3 + "," + obj.y3 + " Z";
	c_svg.setAttribute("d", p);
	c_svg.setAttribute("id", _uuid.generate());
	this.line.svg.appendChild(c_svg);
	if (target == "source")
	    this.src_end_csvg = c_svg;
	if (target == "destination")
	    this.dest_end_csvg = c_svg;
    }

    breakline(source, destination){
	var obj = {
	    src: 1,
	    dest: 3,
	    c1: {},
	    c2: {}
	};
	var inflexion = "horizontal";

	if ((source.shape.c_points[1].y == destination.shape.c_points[3].y && (obj.src = 1) && (obj.dest = 3)) ||
	    (source.shape.c_points[3].y == destination.shape.c_points[1].y && (obj.src = 3) && (obj.dest = 1)) ||
	    (source.shape.c_points[0].x == destination.shape.c_points[2].x && (obj.src = 0) && (obj.dest = 2)) ||
	    (source.shape.c_points[2].x == destination.shape.c_points[0].x && (obj.src = 2) && (obj.dest = 0)))
	    inflexion = false;
	else{
	    if (source.shape.c_points[obj.src].x > destination.shape.c_points[obj.dest].x){
		obj.src = 3;
		obj.dest = 1;
	    }
	    if (source.shape.c_points[obj.src].y > destination.shape.c_points[obj.dest].y){
                if ((Math.abs(destination.shape.c_points[obj.dest].x - source.shape.c_points[obj.src].x) <= 2 * config.ends.minspace)){
                    obj.src = 0;
                    obj.dest = 2;
                    inflexion = "vertical";
                }
            }
            else{
                if (Math.abs(destination.shape.c_points[obj.dest].x - source.shape.c_points[obj.src].x) <= 2 * config.ends.minspace){
                    obj.src = 2;
                    obj.dest = 0;
                    inflexion = "vertical";
                }
            }
	}
	if (inflexion == "vertical"){
            obj.c1.x = source.shape.c_points[obj.src].x;
            obj.c1.y = (source.shape.c_points[obj.src].y + destination.shape.c_points[obj.dest].y) / 2;
            obj.c2.x = destination.shape.c_points[obj.dest].x;
            obj.c2.y =  (source.shape.c_points[obj.src].y + destination.shape.c_points[obj.dest].y) / 2;
        }
        else if (inflexion == "horizontal"){
            obj.c1.x =  (source.shape.c_points[obj.src].x + destination.shape.c_points[obj.dest].x) / 2;
            obj.c1.y = source.shape.c_points[obj.src].y;
            obj.c2.x =  (source.shape.c_points[obj.src].x + destination.shape.c_points[obj.dest].x) / 2;
            obj.c2.y = destination.shape.c_points[obj.dest].y;
        }
        else{
            obj.c1.x = source.shape.c_points[obj.src].x;
            obj.c1.y = source.shape.c_points[obj.src].y;
            obj.c2.x = destination.shape.c_points[obj.dest].x;
            obj.c2.y = destination.shape.c_points[obj.dest].y;
        }
	return obj;
    }

    redraw(){
        var source = _Register.find(this.source.ref);
        var destination = _Register.find(this.destination.ref);
	var obj = {};

	if (this.subtype != "broke")
            obj = this.optimal(source, destination);
	else
            obj = this.breakline(source, destination);

	/* reference on connexion points*/
        this.source = source.shape.c_points[obj.src];
        this.destination = destination.shape.c_points[obj.dest];

	this.line.x = this.source.x;
        this.line.y = this.source.y;
        this.line.dest_x = this.destination.x;
        this.line.dest_y = this.destination.y;

	if (this.subtype == "broke"){
	    this.line.c1.x = obj.c1.x;
            this.line.c1.y = obj.c1.y;
            this.line.c2.x = obj.c2.x;
            this.line.c2.y = obj.c2.y;
	    this.line.setPath([this.line.c1, this.line.c2]);
	}

	this.line.redraw();

	if (this.end_start)
	    this.addEnd(this.end_start, "source");

	if (this.end_dest)
	    this.addEnd(this.end_dest, "destination");
    }

    optimal(src, dest){
        var obj = {}, dmin;
        var i,j, d;

        for (i = 0; i < 4; i++){
            for (j = 0; j < 4; j++){
                d = (src.shape.c_points[i].x - dest.shape.c_points[j].x) * 
                        (src.shape.c_points[i].x - dest.shape.c_points[j].x) + 
                        (src.shape.c_points[i].y - dest.shape.c_points[j].y) * 
                        (src.shape.c_points[i].y - dest.shape.c_points[j].y);
                if (!dmin || 
                    (d < dmin)){
                        obj.src = i;
                        obj.dest = j;
                        dmin = d;
                    }
            }
        }
        return obj;
    }
}
export {Link};
