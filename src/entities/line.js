/**
 * @class Line class
 */

class Line 
{
    constructor(uuid, x = 0, y = 0, events){
        
        this.x = x;
        this.y = y;
        this.dest_x = x;
        this.dest_y = y;
        this.uuid = uuid;
        this.events = events;
        this.c_svg = "";
        this.p = "";
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,'path');

        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        
        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("d", this.p);
        this.c_svg.setAttribute("stroke", "black");
        
        
        svgs.appendChild(this.c_svg);
    }

    shift(dx,dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.dest_x  + "," + this.dest_y;
        this.c_svg.setAttribute("d", this.p);
    }
    
}
 
export {Line};
 

