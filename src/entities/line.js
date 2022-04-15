/**
 * @class Line class
 */

class Line 
{
    constructor(uuid, x=0, y=0, events){
        
        this.x = x;
        this.y = y;
        this.uuid = uuid;
        this.events = events;
        this.c_svg = "";
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.x  + "," + this.y;
        
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", p);
        this.c_svg.setAttribute("stroke", "black");
        
        svgs.appendChild(this.c_svg);
    }

    redraw(x, y){
        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + x  + "," + y;
        this.c_svg.setAttribute("d", p);
    }
}
 
export {Line};
 

