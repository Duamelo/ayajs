var svg = 1;

/**
 * UUID Class
 */

class uuid
{
    static generate()
    {
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
}

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


/**
 * Component Class
 */

class Component
{
    constructor( type, events = [],  props)
    {
        this.uuid = uuid.generate();
        this.type = type;
        this.props = props;
        this.form = FactoryForm.createForm(this.uuid, this.type, this.props, events);
        this.form.draw(svg);
       
    }
}

/**
 * Circle Class
 */

class Circle
{
    
    constructor(uuid, x, y, r, events){
        this.x = x;
        this.y = y;
        this.r = r;
        this.uuid = uuid;
        this.events = events;

    }
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";

        var circle = document.createElementNS(ns,"circle");
    
        circle.setAttribute("cx", this.x);
    
        circle.setAttribute("cy",this.y);
    
        circle.setAttribute("r", this.r);

        circle.setAttribute("id", this.uuid);
    
        // this.events.map( (e)=>{
        //     circle.addEventListener(e.ev, e.cb);
        // });
        svgs.appendChild(circle);
    }
}


/**
 * Connector class
 */

 class Connector
 {
     static create(type, uuid){
         var cp = [];
 
         if(type == 'rectangle'){
            for(var i = 0; i < 8; i++){
                cp.push(new Point(uuid, 0, 0, 5));
            }
         }
         return cp;
     }
 }


/**
 * Rectangle class
 */

 class Rectangle {

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

        new Events(this.rect);

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



/**
 * Line class
 */

class Line 
{
    constructor(uuid, x=0, y=0, events){
        
        this.x = x;
        this.y = y;
        this.uuid = uuid;
        this.events = events;
        this.path = "";
    }

    draw(svgs){

        const ns = "http://www.w3.org/2000/svg";
        this.path = document.createElementNS(ns,'path');

        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + this.x  + "," + this.y;
        
        this.path.setAttribute("id", this.uuid);
        this.path.setAttribute("d", p);
        this.path.setAttribute("stroke", "indianred");
       
        svgs.appendChild(this.path);
    }

    redraw(x, y){
        var p = "M "+  this.x + ","+ this.y + " "+ "Q " + this.x+ "," + this.y + " " + x  + "," + y;
        this.path.setAttribute("d", p);
    }
}




/**
 * Triangle class
 */

 class Triangle
{
   constructor(uuid, x1 = 0, y1 = 0, x2 = 5 , y2 = 5 , x3 = 10 , y3 = 10, events = []){

    this.uuid = uuid;

    this.x1 = x1;
    this.y1 = y1;
 
    this.x2 = x2;
    this.y2 = y2;
 
    this.x3 = x3;
    this.y3 = y3;

    this.events = events;
    this.path = "";
   }

   draw(svgs){

    const ns = "http://www.w3.org/2000/svg";
    this.path = document.createElementNS(ns,'path');

    var p = "M "+  this.x1 + ","+ this.y1 + " "+ "L " + this.x2+ "," + this.y2 + " " + "L " + this.x3 + "," + this.y3  + " Z";
    
    this.path.setAttribute("id", this.uuid);
    this.path.setAttribute("d", p);
    this.path.setAttribute("stroke", "darkviolet");

    this.path.setAttribute("fill", "lavenderblush");
   
    svgs.appendChild(this.path);
    }
}
 


/**
 * FactoryForm class
 */

class _FactoryForm
{

    createForm(uuid, type, props, events)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, events);
        else if(type == "rectangle")
            return new Rectangle(uuid, props.x, props.y, props.width, props.height, events);
        else if(type == "line")
            return new Line(uuid, props.x, props.y, events);
        else if(type == "triangle")
            return new Triangle(uuid, props.x1, props.y1, props.x2, props.y2, props.x3, props.y3, events);
    }
}


FactoryForm = new _FactoryForm();

var events = [];
var nativeEvents = [];

class Events{
    constructor(svgElement){
        this.add(svgElement, "mousedown", this.mousedowncb, false);
        this.add(svgElement, "mouseup", this.mouseupcb, false);
        this.add(svgElement, "mouseover", this.mouseovercb, false);
        this.add(svgElement, "mouseenter", this.mouseentercb, false);
        this.add(svgElement, "focus", this.focuscb, false);
        this.create();
    }

    create(){
        console.log(nativeEvents);
        nativeEvents.map( (ev) =>{
            ev[0].addEventListener(ev[1], ev[2]);
            ev[3] = true;
        })
    }


    /**
     * 
     * @param {SVGElement} target 
     * @param {DOMEvent} event 
     * @param {function} callback 
     */

    add(target, event, callback, active){
        nativeEvents.push([target, event, callback, active]);
    }

    destroy(){
        nativeEvents.splice(0, nativeEvents.length);
    }


    // event fonctions

    mousedowncb(e){
        console.log("mouse down ");
    }

    mouseupcb(e){
        console.log("mouse up ");
    }

    mousemovecb(e){
        console.log("mouse move");
    }

    focuscb(e){
        console.log("focus event");
    }

    mouseentercb(e){
        console.log("mouse enter");
    }

    mouseovercb(e){
        console.log("mouse over");
    }

    movecb(e){
        
    }

}

