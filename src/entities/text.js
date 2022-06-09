import { config } from "../../config";

class Text{
    constructor(uuid, x = 0, y = 0, text = "text"){
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.text = text;
        this.offsetX = 0;
        this.offsetY = 0;
        this.centerX = 0;
        this.centerY = 0;

        this.angle = 0;


    };

    setRotateCenter(centerX, centerY){
        this.centerX = centerX;
        this.centerY = centerY;
    }

    setRotateAngle(angle){
        this.angle = angle;
    }
    

    draw(svg){

        const svgns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(svgns, "text");
        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
        this.c_svg.setAttributeNS(null, "id", this.uuid);
        this.c_svg.setAttributeNS(null, "fill",config.text.fill);
        this.c_svg.setAttributeNS(null, "stroke",config.text.stroke);
        this.c_svg.setAttributeNS(null, "stroke-width",config.text.strokeWidth);
        this.c_svg.setAttributeNS(null, "fill-opacity",config.text.fillOpacity);
        this.c_svg.setAttributeNS(null, "stroke-dasharray",config.text.strokeDasharray);
        this.c_svg.setAttributeNS(null, "stroke-dashoffset",config.text.strokeDashoffset);
        this.c_svg.textContent = this.text;

        
       
        svg.appendChild(this.c_svg);
    }

    redraw(){
        this.c_svg.setAttributeNS(null, "x", this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, "y", this.y + this.offsetY);
    }

    setOffsetX(x){
        this.offsetX = x;
    }

    setOffsetY(y){
        this.offsetY = y;
    }

    getOffsetX(){
        return this.offsetX;
    }

    getOffsetY(){
        return this.offsetY;
    }

}

export {Text};