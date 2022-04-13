var Form = require("../abstraction/forme.js");

/**
 * @class Line class
 */
class Line extends Form
{
    constructor(uuid, x=0, y=0, events = []){
        super();
        this.x = x;
        this.y = y;
        this.uuid = uuid;
       
        this.events = events;
        this.path = "";
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.path = document.createElementNS(ns,'path');


        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.x  + "," + this.y;


        this.path.setAttribute("id", this.uuid);
        this.path.setAttribute("d", p);
        this.path.setAttribute("stroke", "indianred");
       
        svgs.appendChild(this.path);
    }

    redraw(x, y){
        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + x  + "," + y;
        this.path.setAttribute("d", p);
    }
}

module.exports = Line;