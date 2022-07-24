
class Image{
    constructor(x = 0, y = 0, width = 50, height = 50, path, svg){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.path = path;
        this.c_svg = "";
        this.svg = svg;
        this.draw();
    }

    draw(){
        this.c_svg = document.createElementNS('http://www.w3.org/2000/svg','image');
        this.c_svg.setAttributeNS(null,'height',this.height);
        this.c_svg.setAttributeNS(null,'width',this.width);
        this.c_svg.setAttributeNS('http://www.w3.org/1999/xlink','href', this.path);
        this.c_svg.setAttributeNS(null,'x',this.x);
        this.c_svg.setAttributeNS(null,'y',this.y);
        this.svg.append(this.c_svg);
    }

    removeFromDOM(){
        this.svg.removeChild(this.c_svg);
    }
}
export {Image}