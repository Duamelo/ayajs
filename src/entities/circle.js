/**
 * @class Circle
 */

class Circle
{
    /**
     * 
     * @param {string} uuid id
     * @param {number} x center abscissa
     * @param {number} y   center ordinate
     * @param {number} r radius of circle
     * @param {array} events   array of object events
     */

    constructor(uuid, x = 0, y = 0, r = 5, events = []){
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r;
        this.events = events;
        this.c_svg = "";
    }
    
    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";
    
        this.c_svg = document.createElementNS(ns,"circle");
    
        this.c_svg.setAttribute("cx", this.x);
    
        this.c_svg.setAttribute("cy",this.y);
    
        this.c_svg.setAttribute("r", this.r);
    
        this.c_svg.setAttribute("id", this.uuid);

        svgs.appendChild(this.c_svg);
    }
}

export {Circle};
