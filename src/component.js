import { Point } from "./entities/point.js";
import {_Register}  from "./register.js";
import {_uuid} from "./uuid.js";

class Component
{
    /**
     * @param { Object } props 
     */
    constructor(props)
    {
        this.uuid = props.uuid ? props.uuid : _uuid.generate();

        /**
        * @description
        * Represents the svg dom element created.
        * 
        * @type { String }
        */
        this.c_svg = "";
        
        this.config = props.config;
        
        /**
        * @description
        * 
        * @type { DomElement}
        */
        this.svg = this.config.svg;

        /**
         * @description
         * Dictionary object to record events and their respective callbacks associated with the form.
         * 
         * @type { Object }
         */
        this.events = {};

        /**
         * @description
         * A table listing all children of the shape.
         * 
         * @type { Array.<(Shape | null)>}
         */
        this.children = [];

        /**
         * @description
         * The offsetX represents the x-offset to be applied to the rectangle.
         * to position it at {this. x + this.offSetX} on the x-axis.
         * 
         @type { Number }
        */
        this.offsetX = 0;

        /**
         * @description
         * The offsetY represents the y-offset to be applied to the rectangle.
         * to position it at {this. y + this.offSetX} on the y-axis.
         * 
         @type { Number }
        */
        this.offsetY = 0;

        /**
         * @description
         * The ScaleX represents the scale to be applied to the size of the
         * shape on the x-axis.
         * 
         * @type { Number }
         */
        this.scaleX = 1;

        /**
         * @description
         * The ScaleX represents the scale to be applied to the size of the
         * shape on the x-axis.
         * 
         * @type { Number }
         */
        this.scaleY = 1;

        /**
        * @description
        * .This variable represents the value of the rotation angle to be
        *  applied to rotate the shape.
        * 
        * @type { Number } - The angle is given in radian.
        */
        this.angle = 0;

        /**
        * @description
        * The center of rotation is defined by defining centerX.
        * 
        * @type { Number } - centerX
        */
        this.centerX = 0;

        /**
        * @description
        * The center of rotation is defined by defining centerY.
        * 
        * @type { Number } - centerY
        */
        this.centerY = 0;
        
        /**
         * @description
         * The variable c_points represents all the connection 
         * points of the form. These are the points from which one 
         * can establish a link with other forms having also these 
         * connection points.
         * 
         * @type { Array<(Point | Null)> }
         */
        this.c_points = [
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
        ];

        /**
         * 
         * @description
         * The vertex variable represents the set of points from 
         * which we can resize the shape.
         * 
         * @type { Array<(Point | Null)> }
         */
        this.vertex = [
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
            new Point(this.uuid, 0, 0, 5, this.config),
        ];
       
       if (props.isSave)
            _Register.add(this);
    }

    /**
     * @description 
     * This method allows us to add an event to this shape.
     * We record the event and the associated callback for easy removal after.
     * 
     * @param { String } event - the event
     * @param { Function } callback - {} This callback is either defined by the user when
     * adding other custom events, or a callback already defined in event.js.
     */
    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }

    /**
     * *@description
     * This method allows us to delete a specific event passed as a string parameter.
     * 
     * @param { String } event - The event.
     */
    deleteEvent(event){
        var callback = this.events[event];
        this.c_svg.removeEventListener(event, callback);
        delete this.events[event];
    }

    /**
     * *@description
     * This method allows us to delete all events defined on the c_svg property.
     */
    deleteAllEvents(){
        Object.keys(this.events).map((event) => {
            this.deleteEvent(event);
        });
    }

    setStyles(o){
        if (o.fill)
            this.c_svg.setAttribute("fill", o.fill);
        if (o.stroke)
            this.c_svg.setAttribute("stroke", o.stroke);
        if (o.strokewidth)
            this.c_svg.setAttribute("stroke-width", o.strokewidth);
        if (o.fillopacity)
            this.c_svg.setAttribute("fill-opacity", o.fillopacity);
        if (o.strokeopacity)
            this.c_svg.setAttribute("stroke-opacity", o.strokeopacity);
        if (o.strokedasharray)
            this.c_svg.setAttribute("stroke-dasharray", o.strokedasharray);
        if (o.strokedashoffset)
            this.c_svg.setAttribute("stroke-dashoffset", o.strokedashoffset);
    }

    makeHiddenCpoints(){
        this.c_points.map((pt) => {
            pt.c_svg.setAttribute("fill", "none");
        });
    }

    makeVisibleCpoints(){
        this.c_points.map((pt) => {
            pt.c_svg.setAttribute("fill", "black");
        });
    }

    makeHiddenVertex(){
        this.vertex.map((vt) => {
            vt.c_svg.setAttribute("fill", "none");
        });
    }

    makeVisibleVertex(){
        this.vertex.map((vt) => {
            vt.c_svg.setAttribute("fill", "black");
        });
    }

    removeChildren(){
        this.children.map(({child}) => {
            child.removeFromDOM();
        });
    }
    
    removeFromDOM(){
        this.c_points.map((pt)=>{
            pt.removeFromDOM();
        });
        this.vertex.map((vt)=>{
            vt.removeFromDOM();
        });
        this.children.map(({child}) => {
            child.removeFromDOM();
        });
        this.svg.removeChild(this.c_svg);
    }

    move(dx,dy){
        this.shape.x += dx;
        this.shape.y += dy;

        this.redraw();
	
        var lk = _Register.findAllLink(this);
        
        lk.map((link) => {
            link.redraw();
        });
    }

    /**
     * @description
     * We can build any shape by adding to a basic component a children shape.
     * 
     * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Component) is added 
     * as a child to a component with a shape.
     * @param { Object } translate - { x:, y: } This object allows us to position the child relative to its parent.
     * @param {Object } rotate  - { x:, y: , angle: } This object allows us to apply a rotation of the child taking into 
     * account its relative position and the center of rotation.
     */
    addChild(child, translate = null, rotate = null, drawing = true){
        /* resizing and connection to child are not possible */
        child.vertex = [];
        child.c_points = [];

        if(translate != null){
            child.offsetX = translate.x;
            child.offsetY = translate.y;
        }
        if(rotate != null){
            child.centerX = rotate.x;
            child.centerY = rotate.y;
            child.angle = rotate.angle;
        }       
        if(drawing == true)
            child.draw();
        this.children.push({child});
    }

    remove(){
        this.removeFromDOM();
        _Register.clear(this.uuid);
    }
}
export {Component};
