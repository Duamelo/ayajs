const uuid = require("../maths/uuid");
var Form = require("../abstraction/forme.js");

/**
 * Rectangle class
 */

class Rectangle extends Form
{

    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {array of object} events 
     */
    
    constructor(uuid, x= 0, y = 0, width = 10, height = 10, events = []){
        super();
        this.uuid = uuid;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
      
        this.events = events;
        this.rect = "";
        
        this.c_points = Connector.create('rectangle', uuid);
        this.connectorUpdating();
    }

    draw(svgs){

        const svgns = "http://www.w3.org/2000/svg";
        this.rect = document.createElementNS(svgns,'rect');

        this.rect.setAttributeNS(null, 'x', this.x);
        this.rect.setAttributeNS(null, 'y', this.y);
        this.rect.setAttributeNS(null, 'height', this.height);
        this.rect.setAttributeNS(null, 'width',this.width);
        this.rect.setAttributeNS(null, 'stroke', 'black');
        this.rect.setAttributeNS(null, 'stroke-width', '3px');
        this.rect.setAttributeNS(null, 'fill', 'cornsilk');


        
        svgs.appendChild(this.rect);

        this.c_points.map( (point) => {
            point.draw(svgs);
        });

    }

    connectorUpdating(){
        this.c_points[0].x =  this.x;
        this.c_points[0].y =  this.y;
        this.c_points[0].r =  5;

        this.c_points[1].x =  this.x + this.width/2;
        this.c_points[1].y =  this.y;
        this.c_points[1].r =  5;

        this.c_points[2].x =  this.x + this.width;
        this.c_points[2].y =  this.y;
        this.c_points[2].r =  5;

        this.c_points[3].x =  this.x + this.width;
        this.c_points[3].y =  this.y + this.height/2;
        this.c_points[3].r =  5;

        this.c_points[4].x =  this.x + this.width;
        this.c_points[4].y =  this.y + this.height;
        this.c_points[4].r =  5;

        this.c_points[5].x =  this.x + this.width/2;
        this.c_points[5].y =  this.y + this.height;
        this.c_points[5].r =  5;

        this.c_points[6].x =  this.x;
        this.c_points[6].y =  this.y + this.height;
        this.c_points[6].r =  5;

        this.c_points[7].x =  this.x;
        this.c_points[7].y =  this.y + this.height/2;
        this.c_points[7].r =  5;
    }
}

module.exports = Rectangle;