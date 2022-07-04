/**
 * @Class Tranch
 */
class Tranch extends Form{

    constructor(uuid, x0 = 0, y0 = 0, x = 10, y = 10, angle = 90, svg, event, config ){
     
        super();

        this.uuid = uuid;

        this.x0 = x0;
        this.y0 = y0;
     
        this.x = x;
        this.y = y;
     
        this.angle = angle;

        this.offSetX = 0;
        this.offSetY = 0;

        this.events = {};

        this.nativeEvent = event;

        this.config = config;

        this.c_svg = "";
        this.svg = svg;

        this.type = "tranch";

        this.scaleX = 1;
        this.scaleY = 1;

        this.children = [];

        this.vertex = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
        ];
        this.c_points = [
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid, 0, 0, 5, this.svg, this.nativeEvent, this.config),
        ];
    }

    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }
    
    deleteEvent(event){
        var callback = this.events[event];
        this.c_svg.removeEventListener(event, callback);
        delete this.events[event];
    }

    addChild(child, translate, rotate){
        child.vertex = [];
        child.c_points = [];
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        translate(this, child);
        rotate(this, child);
        child.draw();
        this.children.push({child, translate, rotate});
    }
    
    drawVertex(){
        if(this.vertex.length == 0)
            return;
    }

    drawConnector(){
        if(this.c_points.length == 0)
            return;
    }
}
export{Tranch};