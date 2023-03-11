/**
 * @class
 * 
 * @description
 * 
 */
class Text{
    constructor(uuid, x = 0, y = 0, text = "text", size, svg, event, config){

        this.uuid = uuid;

        this.x = x;
        this.y = y;

        this.size = size;

        this.text = text;

        this.type = 'text';

        this.svg = svg;
        this.c_svg = "";

        this.events = {};
        this.nativeEvent = event;

        this.config = config;

        this.offsetX = 0;
        this.offsetY = 0;

        this.centerX = 0;
        this.centerY = 0;

        this.parentWidth = 0;
        this.parentHeight = 0;

        this.parentX = 0;
        this.parentY = 0;

        this.angle = 0;

        this.tspan = "";
        this.title = "";

        this.path_id = null;
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

    setRotateCenter(centerX, centerY){
        this.centerX = centerX;
        this.centerY = centerY;
    }

    setRotateAngle(angle){
        this.angle = angle;
    }

    setPath(id){
        this.path_id = id;
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
        const svgns = "http://www.w3.org/2000/svg";

        this.c_svg = document.createElementNS(svgns, "text");
        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
        this.c_svg.setAttributeNS(null, "textLength", this.size);
        this.c_svg.setAttributeNS(null, "id", this.uuid);
        this.c_svg.setAttributeNS(null, "fill", this.config.text.fill);
        this.c_svg.setAttributeNS(null, "stroke", this.config.text.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.text.strokeWidth);
        this.c_svg.setAttributeNS(null, "fill-opacity", this.config.text.fillOpacity);
        this.c_svg.setAttributeNS(null, "stroke-dasharray", this.config.text.strokeDasharray);
        this.c_svg.setAttributeNS(null, "stroke-dashoffset", this.config.text.strokeDashoffset);
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

        this.title = document.createElementNS(svgns, "title");

        this.title.textContent = this.text;

        this.c_svg.textContent = this.text;

        this.c_svg.appendChild(this.title);

        // this.updateWidthText();
        this.svg.appendChild(this.c_svg);
    }

    redraw(){
    	this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
        this.c_svg.setAttributeNS(null, "textLength", this.size);
	    this.c_svg.textContent = this.text;
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
    }
    

    updateWidthText(marge =  5){
        var subString = "", isSoLong = false;
        // lenght of text in pixels  || 6 pixels wide by 8 pixels high. 
        var validLength = this.parentWidth + this.parentX - this.offsetX;
        var deltaLength =( validLength < (this.text.length * 6) ) ? (validLength / 6) : 0;

        if(deltaLength == 0){
            marge = 0;
            subString = this.text.substring(0,(this.text.length));
        }
        else{
            subString = this.text.substring(0,(deltaLength  - marge));
            isSoLong  = true;
        }

        if(isSoLong)
            subString = subString.concat('...');

        this.tspan.textContent = subString;
        this.title.textContent = this.text;
    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }
    
    removeFromDOM(){
        this.c_svg.textContent = "";
    }

    setOffsetX(x){
        this.offsetX = x;
    }

    setOffsetY(y){
        this.offsetY = y;
    }

    setText(text){
        this.text = text;
    }

    getOffsetX(){
        return this.offsetX;
    }

    getOffsetY(){
        return this.offsetY;
    }

    getParentWidth(){
        return this.parentWidth;
    }

    setParentWidth(width){
        this.parentWidth = width;
    }

    getParentHeight(){
        return this.parentHeight;
    }

    setParentHeight(height){
        this.parentHeight = height;
    }

    setParentX(x){
        this.parentX = x;
    }

    setParentY(y){
        this.parentY = y;
    }
}
export {Text};
