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

    createForm(uuid, type, props, events)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, events);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.width, props.height, props._X,props._Y, events);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, events);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
    }
}

module.exports = FactoryForm;
