import  {Circle}  from "./entities/circle.js";
import  {Rectangle}  from "./entities/rectangle.js";
import  {Line}  from "./entities/line.js";
import  {Triangle}  from "./entities/triangle.js";
import  {Losange} from "./entities/losange.js";


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

   static createForm(uuid, type, props = {}, events, children, ratio = {}, zoom = false)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, events, children, ratio, zoom);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height, events, children);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, events, props.dest_x, props.dest_y, children);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events, children);
        else if(type == "losange")
            return new Losange(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, props.x4, props.y4, events);
    }
}

export {FactoryForm};
