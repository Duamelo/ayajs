import  {Circle}  from "./entities/circle.js";
import  {Rectangle}  from "./entities/rectangle.js";
import  {Line}  from "./entities/line.js";
import  {Triangle}  from "./entities/triangle.js";
import  {Lozenge} from "./entities/lozenge.js";
import { Polyline } from "./entities/polyline.js";
import { Arc } from "./entities/arc";
import { Ressource } from "./usecases/ressource.js";
import { Group } from "./entities/group.js";
import { Text } from "./entities/text.js";


/**
 * @class FactoryForm
 */


class FactoryForm
{
   
    /**
     * 
     * @param {*} uuid 
     * @param {*} type 
     * @param {*} props 
     * @param {*} svg 
     * @param {*} events 
     * @param {*} config 
     * @returns 
     */
   static createForm(uuid, type, props = {}, svg, events, config)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, svg, events, config);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height, svg, events, config);
        else if(type == "line")
            return new Line(0,svg, events, config, uuid, props.x, props.y, props.dest_x, props.dest_y);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, svg, events, config);
        else if(type == "lozenge")
            return new Lozenge(uuid, props.x, props.y, props.width, props.height, svg, events, config);
        else if(type == "polyline")
            return new Polyline(uuid, props.points, svg, events, config);
        else if(type == "arc")
            return new Arc(uuid, props.x0, props.y0, props.x, props.y, props.angle, svg, events, config);
        else if(type == "ressource")
            return new Ressource(uuid, props.x, props.y, props.r,props.nb_method, svg, events, config);
        else if(type == "group")
            return new Group(uuid, svg, events, config);
        else if(type == "text")
            return new Text(uuid, props.x, props.y, props.text, svg, events, config);
    }
}
export {FactoryForm};