import { config } from "../../config.js";
import { Events } from "../events.js";
import {_Register} from "../register.js";
import {_uuid} from "../uuid.js";

/**
 *
 * @class Point
 * @param {number} x
 * @param {number} y
 *
 */

class Point {
  constructor(uuid, x = 0, y = 0, r = 5) {

    this.ref = uuid;
    this.uuid = _uuid.generate();

    this.x = x;
    this.y = y;
    this.r = r;

    this.scale = 1;

    this.events = {};
    this.config = config;

    this.type = "point";

    this.c_svg = "";
    this.svg = this.config.svg;

    _Register.add(this);
  }

  addEvent(event, callback){
    this.c_svg.addEventListener(event, callback);
    this.events[event] = callback;
  }

  deleteEvent(event){
    var callback = this.events[event];
    this.c_svg.removeEventListener(event, callback);
    delete this.events[event];
  }

  deleteAllEvents(){
    Object.keys(this.events).map((event) => {
      this.deleteEvent(event);
    });
  }
 
  setScale(sc){
    this.scale = sc;
  }

  getScale(){
    return this.scale;
  }

  setStyles(o){
    if (o.fill)
      this.c_svg.setAttribute("fill", o.fill);
    if (o.stroke)
      this.c_svg.setAttribute("stroke", o.stroke);
    if (o.strokewidth)
      this.c_svg.setAttribute("stroke-width", o.strokewidth);
    if (o.fillopacity)
      this.c_svg.setAttribute("fill-opacity", o.fillopacity);
    if (o.strokeopacity)
      this.c_svg.setAttribute("stroke-opacity", o.strokeopacity);
      if (o.strokedasharray)
      this.c_svg.setAttribute("stroke-dasharray", o.strokedasharray);
    if (o.strokedashoffset)
      this.c_svg.setAttribute("stroke-dashoffset", o.strokedashoffset);
  }

  draw() {
    var ns = "http://www.w3.org/2000/svg";

    this.c_svg = document.createElementNS(ns, "circle");

    this.c_svg.setAttribute("id", this.uuid);

    this.c_svg.setAttribute("cx", this.x);

    this.c_svg.setAttribute("cy", this.y);

    this.c_svg.setAttribute("r", this.config.point.radius * this.scale);

    // this.c_svg.setAttribute("class", "point");
    this.c_svg.setAttribute("class", "hidden_point");
    
    this.addEvent("mousedown", Events.mousedowncb);
    this.addEvent("mouseover", (e)=>{
      this.r += 4;
      this.c_svg.setAttribute("r", this.r);
    });
    this.addEvent("mouseleave", (e)=>{
      this.r = this.config.point.radius;
      this.c_svg.setAttribute("r", this.r);
    });
    this.svg.appendChild(this.c_svg);
  }

  removeFromDOM(){
    this.svg.removeChild(this.c_svg);
  }

  shift(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  redraw() {
    this.c_svg.setAttribute("cx", this.x);
    this.c_svg.setAttribute("cy", this.y);
    this.c_svg.setAttribute("r", this.config.point.radius * this.scale);
  }
}

export { Point };
