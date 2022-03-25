const Form = require("../abstraction/forme");

/**
 * @class Circle 
 * @extends Form
 * @param {number} cx   center abscissa
 * @param {number} cy   center ordinate
 * @param {number} radius  center radius
 */

class Circle extends Form
{
    constructor( cx = 0, cy = 0, radius = 5)
    {
        super();
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
    }


    draw(){
        
    }
}


module.exports = Circle;