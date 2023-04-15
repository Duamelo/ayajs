import  {Circle}  from "./entities/circle.js";
import  {Rectangle}  from "./entities/rectangle.js";
import  {Line}  from "./entities/line.js";
import  {Triangle}  from "./entities/triangle.js";
import  {Lozenge} from "./entities/lozenge.js";
import { Polyline } from "./entities/polyline.js";
import { Arc } from "./entities/arc";
import { Text } from "./entities/text.js";

/**
 * @class FactoryShape
 */
class Factory
{
    /**
     * 
     * @param {*} uuid 
     * @param {*} type 
     * @param {*} props 
     * @returns 
     */
   static createShape(uuid, type, props = {})
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, props.dest_x, props.dest_y);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3);
        else if(type == "lozenge")
            return new Lozenge(uuid, props.x, props.y, props.width, props.height);
        else if(type == "polyline")
            return new Polyline(uuid, props.points);
        else if(type == "arc")
            return new Arc(uuid, props.x0, props.y0, props.x, props.y, props.angle, props.ratio);
        else if(type == "text")
            return new Text(uuid, props.x, props.y, props.text, props.size);
    }
}
export {Factory};
