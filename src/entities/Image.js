
class Image{
    constructor(x = 0, y = 0, width = 50, height = 50, path, svg, event, config){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.path = path;
        this.c_svg = "";
        this.events = {};
        this.nativeEvent = event;
        this.config = config;
        this.type = 'image';
        this.svg = svg;
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


    draw(){
        this.c_svg = document.createElementNS('http://www.w3.org/2000/svg','image');
        this.c_svg.setAttributeNS(null,'height',this.height);
        this.c_svg.setAttributeNS(null,'width',this.width);
        this.c_svg.setAttributeNS('http://www.w3.org/1999/xlink','href', this.path);
        this.c_svg.setAttributeNS(null,'x',this.x);
        this.c_svg.setAttributeNS(null,'y',this.y);

        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);

        this.svg.append(this.c_svg);
    }

    shift(dx, dy){
        this.x += dx;
        this.y +=dy;
    }

    redraw(){
        this.c_svg.setAttributeNS(null,'x',this.x);
        this.c_svg.setAttributeNS(null,'y',this.y);
    }

    removeFromDOM(){
        this.svg.removeChild(this.c_svg);
    }
}
export {Image}