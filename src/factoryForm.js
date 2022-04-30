import  {Circle}  from "./entities/circle.js";
import  {Rectangle}  from "./entities/rectangle.js";
import  {Line}  from "./entities/line.js";
import  {Triangle}  from "./entities/triangle.js";


/**
 * @class FactoryForm
 */


class FactoryForm
{
   /**
    * 
    * @param {string} uuid 
    * @param {string} type 
    * @param {object} props 
    * @param {array} events 
    * @returns form
    */

   static createForm(uuid, type, props = {}, events)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, events);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height, events);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, events, props.dest_x, props.dest_y);
        else if(type == "triangle")
             return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
    }
}

export {FactoryForm};
