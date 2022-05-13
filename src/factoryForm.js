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
     * @param {array of object} children 
     * @param {pbject} ratio 
     * @param {boolean} zoom 
     * @returns @form
     */

   static createForm(uuid, type, props = {}, children = [], ratio = {}, zoom = false)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, children, ratio, zoom);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height, children, ratio, zoom);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, props.dest_x, props.dest_y, children, ratio, zoom);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, children, ratio, zoom);
    }
}
export {FactoryForm};
