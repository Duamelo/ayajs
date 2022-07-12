import { config } from "../config";
import { Component } from "./component";
import { Circle } from "./entities/circle";
import { Lozenge } from "./entities/lozenge";
import { Rectangle } from "./entities/rectangle";
import { Triangle } from "./entities/triangle";
import { Text } from "./entities/text";
import { _uuid } from "./entities/uuid";
import { Events } from "./events";
import { Line } from "./entities/line";
import { Polyline } from "./entities/polyline";
import { Point } from "./entities/point";
import { Group } from "./entities/group";
import { Arc } from "./entities/arc";
import { Ressource } from "./usecases/ressource";


class Application{
    constructor(width = 1343, height = 1343){

        this.uuid = _uuid.generate();

        this.svg_width = width;
        this.svg_height = height;

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

        this.svg.setAttribute("width", this.svg_width);
        this.svg.setAttribute("height", this.svg_height);
        this.svg.setAttribute("id", this.uuid);

        this.config = config;
        this.events = Events.setup(this.svg, this.uuid,this.config);

        this.tail_px = 25;
        this.nc = Math.floor(this.svg_width / this.tail_px) + 1; 
        this.nl = Math.floor(this.svg_height / this.tail_px) + 1;

        this.u_tail_px = 10;
        this.u_nc = Math.floor(this.tail_px / this.u_tail_px); 
        this.u_nl = Math.floor(this.tail_px / this.u_tail_px);
        
        this.box = this.Component("rectangle", {
            x: 0,
            y: 0,
            height: this.svg_height,
            width: this.svg_width
        });

        this.box.form.c_svg.setAttributeNS(null, "fill", "#FFFF");
        this.box.form.c_svg.setAttribute("stroke", "#57564F");
        this.box.form.c_svg.setAttributeNS(null, "stroke-width", "0.5pt");

        this.box.form.vertex.map( (vt) => {
            vt.removeFromDOM();
        });

        this.box.form.c_points.map( (cp) => {
            cp.removeFromDOM();
        });

        Object.keys(this.box.form.events).map((ev) => {
            this.box.form.deleteEvent(ev);
        });

        for(var j = 1; j <= this.nl - 1; j++){
            var line = this.Line(0, j * this.tail_px, this.nl * this.tail_px, j * this.tail_px);

            // for(var k = 1; k <=( this.u_nl - 1) + this.tail_px; k++){
            //     var u_line = this.Line(0, k * this.u_tail_px, this.nl * this.tail_px, k * this.u_tail_px);

            //     this.box.form.addChild(u_line, (p, c)=> {}, (p,c)=>{});

            //     u_line.c_svg.setAttribute("fill", "white");
            //     u_line.c_svg.setAttribute("stroke", "#57564F");
            //     u_line.c_svg.setAttributeNS(null, "stroke-width", "0.1pt");
    
            //     u_line.children.map( ({child}) => {
            //         child.removeFromDOM();
            //     });
    
            //     u_line.vertex.map( (vt) => {
            //         vt.removeFromDOM();
            //     });
    
            //     u_line.c_points.map( (point) => {
            //         point.removeFromDOM();
            //     });
    
            //     Object.keys(u_line.events).map((ev) => {
            //         u_line.deleteEvent(ev);
            //     });
            // }

            this.box.form.addChild(line, (p, c)=> {}, (p,c)=>{});

            line.c_svg.setAttribute("fill", "#B266FF");
            line.c_svg.setAttribute("stroke", "#57564F");
            line.c_svg.setAttributeNS(null, "stroke-width", "0.8pt");

            line.children.map( ({child}) => {
                child.removeFromDOM();
            });

            line.vertex.map( (vt) => {
                vt.removeFromDOM();
            });

            line.c_points.map( (point) => {
                point.removeFromDOM();
            });

            Object.keys(line.events).map((ev) => {
                line.deleteEvent(ev);
            });
        }

        for(var j = 1; j <= this.nc - 1; j++){
            var line = this.Line(j * this.tail_px, 0, this.tail_px * j, this.nc * this.tail_px);

            this.box.form.addChild(line, (p, c)=> {},  (p,c)=>{});

            line.c_svg.setAttribute("fill", "#B266FF");
            line.c_svg.setAttribute("stroke", "#57564F");
            line.c_svg.setAttributeNS(null, "stroke-width", "0.8pt");

            line.children.map( ({child}) => {
                child.removeFromDOM();
            });

            line.vertex.map( (vt) => {
                vt.removeFromDOM();
            });

            line.c_points.map( (point) => {
                point.removeFromDOM();
            });

            Object.keys(line.events).map((ev) => {
                line.deleteEvent(ev);
            });
        }

        this.svg.addEventListener("mousemove", this.events.mouseMoveCb);
        this.svg.addEventListener("mouseup", this.events.mouseUpCb);
    }

    Component(type, props){
        return new Component(type, props, this.svg, this.events, this.config);
    }

    Rectangle(x = 0, y = 0, width = 10, height = 10){
        return new Rectangle(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
    }

    Lozenge(x = 0, y = 0, width = 10, height = 10){
        return new Lozenge(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
    }

    Triangle(x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10){
        return new Triangle(_uuid.generate(), x1, y1, x2, y2, x3, y3, this.svg, this.events, this.config);
    }

    Circle( x = 0, y = 0, r = 5){
        return new Circle(_uuid.generate(), x, y, r, this.svg, this.events, this.config);
    }

    Text(x = 0, y = 0, text = "text"){
        return new Text(_uuid.generate(), x, y, text, this.svg, this.events, this.config);
    }

    Line(x=0, y=0, dest_x = x, dest_y = y, type_line = "droit"){
        return new Line(this.uuid, this.svg, this.events, this.config, _uuid.generate(), x, y, dest_x, dest_y, type_line    );
    }

    Polyline( points = []){
        return new Polyline(_uuid.generate(), points, this.svg, this.events, this.config);
    }

    Point( x = 0, y = 0, r = 5){
        return new Point(_uuid.generate(), x, y, r, this.svg, this.events, this.config);
    }

    Arc(x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2){
        return new Arc(_uuid.generate(), x0, y0, x, y, angle, ratio, this.svg, this.events, this.config);
    }

    Group(){
        return new Group(_uuid.generate(),this.svg, this.events, this.config);
    }

    Ressource(x = 0, y = 0, r = 5, angle = 40){
        return new Ressource(x, y, r, angle, this.svg, this.config);
    }
}
export {Application};