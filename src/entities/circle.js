var Form = require("../abstraction/forme.js");

/**
 * @class Circle
 */

class Circle extends Form
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
        super();
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r;
        this.events = events;
        this.circle = "";
    }
    
    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";
    
        this.circle = document.createElementNS(ns,"circle");
    
        this.circle.setAttribute("cx", this.x);
    
        this.circle.setAttribute("cy",this.y);
    
        this.circle.setAttribute("r", this.r);
    
        this.circle.setAttribute("id", this.uuid);

        svgs.appendChild(this.circle);
    }
}

module.exports = Circle;