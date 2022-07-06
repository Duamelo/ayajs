import { _uuid } from "../entities/uuid";
import { Point } from "../entities/point";
import { Form } from "../abstraction/form";


class Croissant{

    constructor(uuid, x0 = 0, y0 = 0, x = 100, y = 100, angle = 90, svg, event, config){

        super();

        this.uuid = uuid;

        this.x0 = x0;
        this.y0= y0;

        this.x = x;
        this.y= y;

        this.angle = angle;

        this.offsetX0 = 0;
        this.offsetY0 = 0;

        this.offsetX = 0;
        this.offsetY = 0;


        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

        this.events = {};

        this.nativeEvent = event;

        this.config = config;


        this.c_svg = "";
        this.svg = svg;

        this.type = "arc";


        this.scaleX = 1;
        this.scaleY = 1;

        this.radius = Math.sqrt (((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * ((this.x + this.offsetX) - (this.x0  + this.offsetX0)) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * ((this.y + this.offsetY) - (this.y0 + this.offsetY0)));

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
        ];
        this.c_points = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
        ];

        var line = FactoryForm.createForm(_uuid.generate(), "line", {x: arc.x, y: arc.y, dest_x: i_dest_x, dest_y: i_dest_y}, this.svg, this.events, this.config);

    }

    draw(){
        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        this.dest_x = Math.round ((this.x0 + this.offsetX0) + ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.cos ((this.angle * Math.PI )/ 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.sin ((this.angle * Math.PI) / 180));
        this.dest_y = Math.round ((this.y0 + this.offsetY0) - ((this.x + this.offsetX) - (this.x0 + this.offsetX0)) * Math.sin ((this.angle * Math.PI) / 180) + ((this.y + this.offsetY) - (this.y0 + this.offsetY0)) * Math.cos ((this.angle * Math.PI) / 180));

        this.p = "M " + this.x + " " + this.y + " A " + this.radius + " " + this.radius + " 0 " + (this.angle > 180 ? 1 : 0) + " 0 " + this.dest_x + " " + this.dest_y;
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("fill", this.config.arc.fill);
        this.c_svg.setAttribute("stroke", this.config.arc.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.arc.strokeWidth);
        this.c_svg.setAttribute("d", this.p);

        this.svg.appendChild(this.c_svg);

        this.drawVertex();
        this.drawConnector();

        this.c_points.map((point) => {
            point.draw();
        });

        this.vertex.map( (vertex) => {
            vertex.draw();
        });

        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
        this.addEvent("mouseover", this.nativeEvent.mouseOverCb);
    }
}
export {Croissant};