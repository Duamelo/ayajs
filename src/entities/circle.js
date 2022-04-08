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
    }
    
    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";
    
        var circle = document.createElementNS(ns,"circle");
    
        circle.setAttribute("cx", this.x);
    
        circle.setAttribute("cy",this.y);
    
        circle.setAttribute("r", this.r);
    
        circle.setAttribute("id", this.uuid);

        this.events.map( (e)=>{
            circle.addEventListener(e.ev, e.cb);
        });
        svgs.appendChild(circle);
    }
}

module.exports = Circle;