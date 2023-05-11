import { _uuid } from "../uuid";

/**
 * @class
 * 
 * @description
 * 
 */
class Text{
    constructor(x = 0, y = 0, text = "text", size = 0, dest_x, dest_y, isdrawing = true, config){

        this.uuid = _uuid.generate();

        this.x = x;
        this.y = y;

        this.config = config;

        if (dest_x && dest_y){
            this.dest_x = dest_x;
            this.dest_y =dest_y;
        }
        else if (size)
            this.size = size;
        else 
            this.size = this.config.text.size;

        this.text = text;

        this.type = 'text';

        this.svg = this.config.svg;
        
        
        this.events = {};
        
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.centerX = 0;
        this.centerY = 0;
        
        this.angle = 0;
        
        this.title = "";
        
        this.c_svg = null
        this.textPath = null;
        this.path_text = null;
        if (isdrawing)
            this.draw();
    };

    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }
    
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
        if (o.fontsize)
            this.c_svg.setAttribute("font-size", o.fontsize);
        if (o.fontfamily)
            this.c_svg.setAttribute("font-family", o.fontfamily);
        if (o.fontstyle)        
            this.c_svg.setAttribute("font-style", o.fontstyle);
        if (o.wordspacing)
            this.c_svg.setAttribute("word-spacing", o.wordspacing);
        if (o.letterspacing)
            this.c_svg.setAttribute("letter-spacing", o.letterspacing);
        if (o.textlength)
            this.c_svg.setAttributeNS(null, "textLength", o.textlength);
    }

    draw(){
        const ns = "http://www.w3.org/2000/svg";
        var p = "M " + this.x + "," + this.y + " ";

        if (this.dest_x)
            p += this.dest_x + "," + this.dest_y;
        else
            p += this.x + this.size + "," + this.y;

        this.path_text = document.createElementNS(ns,'path');
        this.path_text.setAttribute("id", _uuid.generate());
        this.path_text.setAttribute("d", p);
        this.svg.appendChild(this.path_text);

        this.c_svg = document.createElementNS(ns, "text");
        this.c_svg.setAttribute("id", _uuid.generate());
        this.c_svg.setAttributeNS(null, "letter-spacing", this.config.text.letterspacing);
        this.c_svg.setAttributeNS(null, "font-family", this.config.text.fontfamily);
        this.c_svg.setAttributeNS(null, "font-size", this.config.text.fontsize);
        this.c_svg.setAttributeNS(null, "font-style", this.config.text.fontstyle);

        this.textPath = document.createElementNS(ns, "textPath");
        this.textPath.setAttribute("id", _uuid.generate());
        this.textPath.setAttribute("href", "#" + this.path_text.getAttribute("id"));
        this.textPath.setAttribute("startOffset", this.config.text.startoffset);
        this.textPath.setAttribute("text-anchor", this.config.text.textanchor);
        this.textPath.textContent = this.text;

        this.c_svg.appendChild(this.textPath);
        this.svg.appendChild(this.c_svg);

        this.title = document.createElementNS(ns, "title");

        this.title.textContent = this.text;

        this.c_svg.appendChild(this.title);

        this.svg.appendChild(this.c_svg);
    }

    redraw(){
        this.path_text.remove();
        this.c_svg.remove();
        this.textPath.remove();
        this.draw();
    }
    
    shift(dx, dy){
        this.x += dx;
        this.y += dy;
        if (this.dest_x){
            this.dest_x += dx;
            this.dest_y += dy;
        }
    }
    
    removeFromDOM(){
        this.path_text.remove();
        this.c_svg.remove();
        this.textPath.remove();
    }

    setText(text){
        this.text = text;
    }
}
export {Text};
