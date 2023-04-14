import { config } from "../config";
import { Component } from "./component";
import { Circle } from "./entities/circle";
import { Lozenge } from "./entities/lozenge";
import { Rectangle } from "./entities/rectangle";
import { Triangle } from "./entities/triangle";
import { Text } from "./entities/text";
import { _uuid } from "./uuid";
import { Events } from "./events";
import { Line } from "./entities/line";
import { Polyline } from "./entities/polyline";
import { Point } from "./entities/point";
import { Arc } from "./entities/arc";
import { Image } from "./entities/Image";
import { _Register } from "./register";
import { Link } from "./entities/link";
import { Grid } from "./grid";

class Init{
    constructor(width = 1343, height = 1343){

        this.uuid = _uuid.generate();

        this.width = width;
        this.height = height;
 
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

        this.svg.setAttribute("width", this.width);
        this.svg.setAttribute("height", this.height);
        this.svg.setAttribute("id", this.uuid);

        this.grid = new Grid(this.svg, 40, 80, 2, 4);

        config.svg = this.svg;

        this.config = config;

        this.svg.addEventListener("mousemove", Events.mousemovecb);
        this.svg.addEventListener("mouseup", Events.mouseupcb);
    }

    setGridSize(o){
        if (o.cellw)
            this.grid.cellW = o.cellw;
        if (o.cellh)
            this.grid.cellH = o.cellh;
        if (o.subdx)
            this.grid.subdivisionX = o.subdx;
        if (o.subdy)
            this.grid.subdivisionY = o.subdy;
        if (o.bgc)
            this.grid.bgColor = o.bgc;
        if (o.lc)
            this.grid.lineColor = o.lc;
        if (o.border)
            this.grid.lineThicness = o.border;
        if (o.width)
            this.svg.setAttribute("width", o.width);
        if (o.height)
            this.svg.setAttribute("height", o.height);    
        this.grid.redraw();
    }

    /* set the current link */
    // setCurrentLink(lk){
    //     this.config.current_link = lk;
    // }

    _uuid(){
        return _uuid;
    }

    Component(type, props){
        return new Component(type, props);
    }

    Rectangle(x = 0, y = 0, width = 10, height = 10){
        return new Rectangle(_uuid.generate(), x, y, width, height);
    }

    Lozenge(x = 0, y = 0, width = 10, height = 10){
        return new Lozenge(_uuid.generate(), x, y, width, height);
    }

    Triangle(x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10){
        return new Triangle(_uuid.generate(), x1, y1, x2, y2, x3, y3);
    }

    Circle( x = 0, y = 0, r = 5){
        return new Circle(_uuid.generate(), x, y, r);
    }

    Text(x = 0, y = 0, text = "text", size = 100){
        return new Text(_uuid.generate(), x, y, text, size);
    }

    Line(x=0, y=0, dest_x = x, dest_y = y){
        return new Line(_uuid.generate(), x, y, dest_x, dest_y);
    }

    Link(src_id, dest_id, userconfig = {}){
        return new Link(src_id, dest_id, userconfig);
    }

    Polyline( points = []){
        return new Polyline(_uuid.generate(), points);
    }

    Point( x = 0, y = 0, r = 5){
        return new Point(_uuid.generate(), x, y, r);
    }

    Arc(x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2){
        return new Arc(_uuid.generate(), x0, y0, x, y, angle, ratio);
    }
    
    Image(x,y, width, height, path = "", name = ""){
        return new Image(_uuid.generate(), x, y, width, height, path, name);
    }
}
export {Init};
