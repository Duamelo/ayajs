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


class Application{
    constructor(width = 1300, height = 1000){

        this.uuid = _uuid.generate();

        this.svg_width = width;
        this.svg_height = height;

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

        this.svg.setAttribute("width", this.svg_width);
        this.svg.setAttribute("height", this.svg_height);
        this.svg.setAttribute("id", this.uuid);

        this.config = config;
        this.events = Events.setup(this.svg, this.uuid,this.config);

        this.svg.addEventListener("mousemove", this.events.mouseMoveCb);
        this.svg.addEventListener("mouseup", this.events.mouseUpCb);
    }

    createComponent(type, props){
        return new Component(type, props, this.svg, this.events, this.config);
    }

    createRectangle(x = 0, y = 0, width = 10, height = 10){
        return new Rectangle(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
    }

    createLozenge(x = 0, y = 0, width = 10, height = 10){
        return new Lozenge(_uuid.generate(), x, y, width, height, this.svg, this.events, this.config);
    }

    createTriangle(x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10){
        return new Triangle(_uuid.generate(), x1, y1, x2, y2, x3, y3, this.svg, this.events, this.config);
    }

    createCircle( x = 0, y = 0, r = 5){
        return new Circle(_uuid.generate(), x, y, this.svg, this.events, this.config);
    }

    createText(x = 0, y = 0, text = "text"){
        return new Text(_uuid.generate(), x, y, text, this.svg, this.events, this.config);
    }

    createLine(x=0, y=0, dest_x = x, dest_y = y){
        return new Line( this.uuid, this.svg, this.events, this.config, _uuid.generate(), x, y, dest_x, dest_y);
    }

    createPolyline( points = []){
        return new Polyline(_uuid.generate(), points, this.svg, this.events, this.config);
    }

    createPoint( x = 0, y = 0, r = 5){
        return new Point(_uuid.generate(), x, y, r, this.svg, this.events, this.config);
    }

    createArc(x0 = 0, y0 = 0, x = 100, y = 100, angle = 90){
        return new Arc(_uuid.generate(), x0, y0, x, y, angle, this.svg, this,this.events, this.config);
    }

    createGroup(){
        return new Group(_uuid.generate(), this.svg, this.events, this.config);
    }
}
export {Application};