/**
 * @class
 * 
 * @description
 * 
 */
class Text{
    constructor(uuid, x = 0, y = 0, text = "text", svg, event, config){

        this.uuid = uuid;

        this.x = x;
        this.y = y;

        this.text = text;

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


    setRotateCenter(centerX, centerY){
        this.centerX = centerX;
        this.centerY = centerY;
    }

    setRotateAngle(angle){
        this.angle = angle;
    }

    draw(){
        const svgns = "http://www.w3.org/2000/svg";

        this.c_svg = document.createElementNS(svgns, "text");
        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
        this.c_svg.setAttributeNS(null, "id", this.uuid);
        this.c_svg.setAttributeNS(null, "fill", this.config.text.fill);
        this.c_svg.setAttributeNS(null, "stroke", this.config.text.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width", this.config.text.strokeWidth);
        this.c_svg.setAttributeNS(null, "fill-opacity", this.config.text.fillOpacity);
        this.c_svg.setAttributeNS(null, "stroke-dasharray", this.config.text.strokeDasharray);
        this.c_svg.setAttributeNS(null, "stroke-dashoffset", this.config.text.strokeDashoffset);
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

        // this.tspan = document.createElementNS(svgns, "tspan");
        // this.title = document.createElementNS(svgns, "title");

        // this.title.textContent = this.text;
        // this.tspan.textContent = this.text;

        this.c_svg.textContent = this.text;
        // this.c_svg.appendChild(this.tspan);
        // this.c_svg.appendChild(this.title);

        // this.updateWidthText();
        this.svg.appendChild(this.c_svg);
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
    
    removeFromDOM(){
        // this.title.textContent = "";
        // this.tspan.textContent = "";
        this.c_svg.textContent = "";
    }

    redraw(){
        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
        // this.updateWidthText();
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