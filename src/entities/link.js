import  {_uuid}  from "../uuid.js";
import {_Register}  from "../register.js"
import { Line } from "./line.js";
import { Text } from "./text.js";

/**
 * @class Link
 */
class Link
{
    constructor(src_id, dest_id, userconfig = {}, config)
    {
        this.config = config;

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

        this.altpath = userconfig.altpath ? true : false;

        if (this.subtype != "broke")
            obj = this.optimal(src, dest);
        else
            obj = this.breakline(src, dest);

        /* reference on connexion points*/
        this.source = src.c_points[obj.src];
        this.destination = dest.c_points[obj.dest];

        this.line = new Line(this.source.x,
                        this.source.y,
                        this.destination.x,
                        this.destination.y,
                        false,
                        false,
                        null,
                        config
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

        this.text = null;
        this.text_c_svg = null;
        _Register.add(this);
    }

    addEnd(type, target){
        var x, y, line_x, line_y, line_dest_x, line_dest_y, obj = {}, angle, c_svg = null;
        var r = this.config.ends.circle.r, h = this.config.ends.tri.h;	

        const ns = "http://www.w3.org/2000/svg";

        line_x = this.line.x;
        line_y = this.line.y;
        line_dest_x = this.line.dest_x;
        line_dest_y = this.line.dest_y;
        angle = this.line.inclination();

        if (type != "triangle" && type != "circle")
            return;

        if (target == "source"){
            x = this.line.x;
            y = this.line.y;

            if (this.src_end_csvg)
                this.src_end_csvg.remove();

            if (this.line.x != this.line.c1.x &&
                this.line.y != this.line.c1.y){
    
                    line_dest_x = this.line.c1.x;
                    line_dest_y = this.line.c1.y;
                }
        }
        else if (target == "destination"){
            x = this.line.dest_x;
            y = this.line.dest_y;
            h = -h;
            r = -r;

            if (this.dest_end_csvg)
                this.dest_end_csvg.remove();
            if (this.line.x != this.line.c2.x &&
                this.line.y != this.line.c2.y){
    
                    line_x = this.line.c2.x;
                    line_y = this.line.c2.y;
            }
        }

        if (type == "triangle"){
            var base, dxa, dya, dx, dy;

            base = this.config.ends.tri.base;

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
           
            c_svg = document.createElementNS(ns, "path");
            var p = "M " + obj.x1 +  "," + obj.y1 + " " + "L " + obj.x2 + "," + obj.y2 + " " + "L " + obj.x3 + "," + obj.y3 + " Z";
            c_svg.setAttribute("d", p);
            c_svg.setAttribute("id", _uuid.generate());
            c_svg.setAttribute("fill", this.config.ends.tri.fill);
            c_svg.setAttribute("stroke", this.config.ends.tri.stroke);
            c_svg.setAttribute("stroke-width", this.config.ends.tri.strokeWidth);
        }
        else if (type == "circle"){

            if (line_y == line_dest_y){
                if (line_x < line_dest_x){
                   obj.x = x + r;
                   obj.y = y;
                }
                else{
                    obj.x = x - r;
                    obj.y = y;
                }
            }
            else if (line_x == line_dest_x){
                if (line_y < line_dest_y){
                    obj.x = x;
                    obj.y = y + r;
                }
                else{
                    obj.x = x;
                    obj.y = y - r;
                }
            }
            else{
                var slope = (line_dest_y - line_y) / (line_dest_x - line_x);

                if (angle < 0){
                    if (line_x < line_dest_x){
                        obj.x = x + r * Math.cos(angle);
                        obj.y = slope * obj.x + (line_y - slope * line_x);
                    }
                    else if (line_x > line_dest_x){
                        obj.x = x - r * Math.cos(angle);
                        obj.y = slope * obj.x + (line_y - slope * line_x);
                    }
                }
                else{
                    if (line_x < line_dest_x){
                        obj.x = x + r * Math.cos(angle);
                        obj.y = slope * obj.x + (line_y - slope * line_x);
                    }
                    else if (line_x > line_dest_x){
                        obj.x = x - r * Math.cos(angle);
                        obj.y = slope * obj.x + (line_y - slope * line_x);
                    }
                }
            }
            c_svg = document.createElementNS(ns, "circle");
            c_svg.setAttribute("cx", obj.x);
            c_svg.setAttribute("cy", obj.y);
            c_svg.setAttribute("r", this.config.ends.circle.r);
            c_svg.setAttribute("fill", this.config.ends.circle.fill);
            c_svg.setAttribute("stroke", this.config.ends.circle.stroke);
            c_svg.setAttribute("stroke-width", this.config.ends.circle.strokeWidth);
            c_svg.setAttribute("id", _uuid.generate());
        }
        this.config.svg.appendChild(c_svg);
        if (target == "source")
            this.src_end_csvg = c_svg;
        if (target == "destination")
            this.dest_end_csvg = c_svg;
    }

    addText(text, position){
        if (!text)
            return;
        this.text = text;
        if (position != "top" && position != "bottom" && position != "middle")
            position = "top";
        this.position = position;
        if (!this.text_c_svg){
            var coordonate = this.textCoordonate();
            this.text_c_svg = new Text(_uuid.generate(), coordonate.x, coordonate.y, 
                                        this.text, 0, coordonate.dest_x, coordonate.dest_y);
            this.text_c_svg.draw();
        }
        else{
            var coordonate = this.textCoordonate();
            this.text_c_svg.x = coordonate.x;
            this.text_c_svg.y = coordonate.y;
            this.text_c_svg.dest_x = coordonate.dest_x;
            this.text_c_svg.dest_y = coordonate.dest_y;
            this.text_c_svg.text = this.text;
            this.text_c_svg.redraw();
        }
    }

    textCoordonate(){
        var c = {
            x: 0,
            y: 0,
            dest_x: 0,
            dest_y: 0
        };

        if (this.subtype == "broke"){
            if (this.line.c2.y == this.line.dest_y && this.line.dest_x > this.line.c2.x){
                //path c2 dest
                c.x = this.line.c2.x;
                c.y = this.line.c2.y;
                c.dest_x = this.line.dest_x;
                c.dest_y = this.line.dest_y;
            }
            else if (this.line.c2.y == this.line.dest_y && this.line.dest_x < this.line.c2.x){
                //path c2 dest
                c.x = this.line.dest_x;
                c.y = this.line.dest_y;
                c.dest_x = this.line.c2.x;
                c.dest_y = this.line.c2.y;
            }
            else if (this.line.c1.x < this.line.c2.x){
                // path c1 c2
                c.x = this.line.c1.x;
                c.y = this.line.c1.y;
                c.dest_x = this.line.c2.x;
                c.dest_y = this.line.c2.y;
            }
            else {
                //path c2 c1
                c.x = this.line.c2.x;
                c.y = this.line.c2.y;
                c.dest_x = this.line.c1.x;
                c.dest_y = this.line.c1.y;
            }
            if (this.position == "top"){
                c.y -= 10;
                c.dest_y -= 10;
            }
            else if (this.position == "bottom"){
                c.y += 10 + 12; 
                c.dest_y += 10 + 12; // 12 for text height
            }
            else{
                c.y += 15/2 - 3;
                c.dest_y += 15/2 - 3;
            }
        }
        return c;
    }

    removeFromDOM(){
        this.line.removeFromDOM();
        if (this.src_end_csvg)
            this.config.svg.removeChild(this.src_end_csvg);
        if (this.dest_end_csvg)
            this.config.svg.removeChild(this.dest_end_csvg);
        if (this.text)
            this.text_c_svg.removeFromDOM();
        var lk = _Register.find(this.uuid);
        _Register.clear(lk.uuid);
    }

    breakline(source, destination){
	var obj = {
	    src: 1,
	    dest: 3,
	    c1: {},
	    c2: {},
	};
	var inflexion = "horizontal";

	if ((source.c_points[1].y == destination.c_points[3].y && (obj.src = 1) && (obj.dest = 3)) ||
	    (source.c_points[3].y == destination.c_points[1].y && (obj.src = 3) && (obj.dest = 1)) ||
	    (source.c_points[0].x == destination.c_points[2].x && (obj.src = 0) && (obj.dest = 2)) ||
	    (source.c_points[2].x == destination.c_points[0].x && (obj.src = 2) && (obj.dest = 0)))
	    inflexion = false;
	else{
	    if (source.c_points[obj.src].x > destination.c_points[obj.dest].x){
		obj.src = 3;
		obj.dest = 1;
	    }
	    if (source.c_points[obj.src].y > destination.c_points[obj.dest].y){
            if ((Math.abs(destination.c_points[obj.dest].x - source.c_points[obj.src].x) <= 2 * this.config.ends.minspace)){
                obj.src = 0;
                obj.dest = 2;
                inflexion = "vertical";
            }
        }
        else{
            if (Math.abs(destination.c_points[obj.dest].x - source.c_points[obj.src].x) <= 2 * this.config.ends.minspace){
                obj.src = 2;
                obj.dest = 0;
                inflexion = "vertical";
            }
        }
	}
    if (this.altpath){
        if ((obj.src == 1 && obj.dest == 3) ||
            (obj.src == 3 && obj.dest == 1)){
            if (source.c_points[obj.src].y < destination.c_points[obj.dest].y){
                obj.src = 2;
                obj.dest = 2;
            }
            else{
                obj.src = 0;
                obj.dest = 0;
            }
        }
        else if ((obj.src == 0 && obj.dest == 2) ||
                (obj.src == 2 && obj.dest == 0)){
            obj.src = 3;
            obj.dest = 3;
        }
        inflexion = "altpath";
    }
	if (inflexion == "vertical"){
            obj.c1.x = source.c_points[obj.src].x;
            obj.c1.y = (source.c_points[obj.src].y + destination.c_points[obj.dest].y) / 2;
            obj.c2.x = destination.c_points[obj.dest].x;
            obj.c2.y =  (source.c_points[obj.src].y + destination.c_points[obj.dest].y) / 2;
        }
    else if (inflexion == "horizontal"){
        obj.c1.x =  (source.c_points[obj.src].x + destination.c_points[obj.dest].x) / 2;
        obj.c1.y = source.c_points[obj.src].y;
        obj.c2.x =  (source.c_points[obj.src].x + destination.c_points[obj.dest].x) / 2;
        obj.c2.y = destination.c_points[obj.dest].y;
    }
    else if (inflexion == "altpath"){
        if(obj.src == 0){
            obj.c1.x =  source.c_points[obj.src].x;
            obj.c1.y = destination.c_points[obj.dest].y - 2 * this.config.ends.minspace;
            obj.c2.x =  destination.c_points[obj.dest].x;
            obj.c2.y = destination.c_points[obj.dest].y - 2 * this.config.ends.minspace;
        }
        else if (obj.src == 2){
            obj.c1.x =  source.c_points[obj.src].x;
            obj.c1.y = destination.c_points[obj.dest].y + 2 * this.config.ends.minspace;
            obj.c2.x =  destination.c_points[obj.dest].x;
            obj.c2.y = destination.c_points[obj.dest].y + 2 * this.config.ends.minspace;
        }
        else{
            obj.c1.x =  source.c_points[obj.src].x - 3 * this.config.ends.minspace;
            obj.c1.y = source.c_points[obj.src].y;
            obj.c2.x =  source.c_points[obj.src].x - 3 * this.config.ends.minspace;
            obj.c2.y = destination.c_points[obj.dest].y;
        }
    }
    else{
        obj.c1.x = source.c_points[obj.src].x;
        obj.c1.y = source.c_points[obj.src].y;
        obj.c2.x = source.c_points[obj.src].x;
        obj.c2.y = source.c_points[obj.src].y;
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
        this.source = source.c_points[obj.src];
        this.destination = destination.c_points[obj.dest];

	this.line.x = this.source.x;
        this.line.y = this.source.y;
        this.line.dest_x = this.destination.x;
        this.line.dest_y = this.destination.y;

	if (this.subtype == "broke"){ 
            this.line.c1.x = obj.c1.x;
            this.line.c1.y = obj.c1.y;
            this.line.c2.x = obj.c2.x;
            this.line.c2.y = obj.c2.y;
        if (Math.abs(this.line.y - this.line.dest_y) > 9  &&
            (obj.c1.x != obj.c2.x || obj.c1.y != obj.c2.y))
            this.line.setPathCur([this.line.c1, this.line.c2]);
        else
            this.line.setPath([this.line.c1, this.line.c2]);
    }

        this.line.redraw();

        if (this.end_start)
            this.addEnd(this.end_start, "source");

        if (this.end_dest)
            this.addEnd(this.end_dest, "destination");

        if (this.text != undefined){ // text must be different of ""
            var c = this.textCoordonate();
            this.text_c_svg.x = c.x;
            this.text_c_svg.y = c.y;
            this.text_c_svg.dest_x = c.dest_x;
            this.text_c_svg.dest_y = c.dest_y;
            this.text_c_svg.redraw();
        }
    }

    optimal(src, dest){
        var obj = {}, dmin;
        var i,j, d;

        for (i = 0; i < 4; i++){
            for (j = 0; j < 4; j++){
                d = (src.c_points[i].x - dest.c_points[j].x) * 
                        (src.c_points[i].x - dest.c_points[j].x) + 
                        (src.c_points[i].y - dest.c_points[j].y) * 
                        (src.c_points[i].y - dest.c_points[j].y);
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
