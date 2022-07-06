import {_Register} from "../register.js";
import {_uuid} from "./uuid.js";

/**
 *
 * @class Point
 * @param {number} x
 * @param {number} y
 *
 */

class Point {
  constructor(uuid, x = 0, y = 0, r = 5, svg, event, config) {

    this.ref = uuid;
    this.uuid = _uuid.generate();

    this.x = x;
    this.y = y;
    this.r = r;

    this.scale = 1;

    this.events = {};
    this.nativeEvent = event;
    this.config = config;


    this.c_svg = "";
    this.svg = svg;

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
 
  setScale(sc){
    this.scale = sc;
  }

  getScale(){
    return this.scale;
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

    
    this.addEvent("mousedown", this.nativeEvent.mouseDownCb);

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
