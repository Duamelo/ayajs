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
import {config as configuration} from "../config";

export let ayaconfig = configuration;

export let init = (width = 1343, height = 1343) => {
    try{
        var uuid = _uuid.generate();

        var width = width;
        var height = height;

        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("id", uuid);
        var _config = structuredClone(configuration);
        _config.svg = svg;
        svg.addEventListener("mousemove", (e)=>{Events.mousemovecb(e, _config)});
        svg.addEventListener("mouseup", (e)=>{Events.mouseupcb(e, _config)});
        return {
            uuid: uuid,
            svg: svg,
            config: _config,
            id: () => {
                return _uuid.generate();
            },
            grid: (svg, cellW = 40, cellH = 40, subdx = 2, subdy = 4) =>{
                return new Grid(svg, cellW, cellH, subdx, subdy);
            },
            rectangle: (x = 0, y = 0, width = 10, height = 10, isdrawing = true, save = true, uuid = undefined) => {
                return new Rectangle(x, y, width, height, isdrawing, save, uuid, _config);
            },
            lozenge: (x = 0, y = 0, width = 10, height = 10, isdrawing = true, save = true, uuid = undefined) => {
                return new Lozenge(x, y, width, height, isdrawing, save, uuid, _config);
            },
            triangle: (x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, isdrawing = true, save = true, uuid = undefined) => {
                return new Triangle(x1, y1, x2, y2, x3, y3, isdrawing, save, uuid, _config);
            },
            circle: ( x = 0, y = 0, r = 5, isdrawing = true, save = true, uuid = undefined) => {
                return new Circle(x, y, r, isdrawing, save, uuid, _config);
            },
            text: (x = 0, y = 0, text = "text", size = 100, dest_x, dest_y, isdrawing = true) => {
                return new Text(x, y, text, size, dest_x, dest_y, isdrawing, _config);
            },
            line: (x=0, y=0, dest_x = x, dest_y = y, isdrawing = true, save = true, uuid = undefined) => {
                return new Line(x, y, dest_x, dest_y, isdrawing, save, uuid, _config);
            },
            link: (src_id, dest_id, userconfig = {}) =>{
                return new Link(src_id, dest_id, userconfig, _config);
            },
            polyline: (points = [], isdrawing = true, save = true, uuid = undefined) => {
                return new Polyline(points, isdrawing, save, uuid, _config);
            },
            point: (x = 0, y = 0, r = 5, isdrawing = true, save, uuid = undefined) => {
                return new Point(null, x, y, r, isdrawing, save, uuid, _config);
            },
            arc: (x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, ratio = 1/2, isdrawing = true, save = true, uuid = undefined) => {
                return new Arc(x0, y0, x, y, angle, ratio, isdrawing, save, uuid, _config);
            },
            image: (x,y, width, height, path = "", name = "", isdrawing = true, save = true, uuid = undefined) => {
                return new Image(x, y, width, height, path, name, isdrawing, save, uuid, _config);
            }
        }
    }
    catch(e){
        console.log(e);
    }
}
