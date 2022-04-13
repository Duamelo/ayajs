/**
 * 
 * @class Point
 * @param {number} x
 * @param {number} y
 * 
 */

class Point
{
    constructor(uuid, x = 0, y = 0, r = 5)
    {
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r
    }

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

module.exports = Point;