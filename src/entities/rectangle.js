const  Forme = require("../abstraction/forme");

const _Rect = window.document.createElementNS("http://www.w3.org/2000/svg","rect");

class Rectangle extends Forme{
    
    constructor(width = 10, height = 10, _X = 0, _Y = 0){
        
        super();
        this.width = width;
        this.height = height;
        this.posInit = {x:_X,y:_Y};
        this.forme = this.drawn();

    }

    drawn(){

        const svgns = "http://www.w3.org/2000/svg";
        let rect = _Rect;
        rect.setAttributeNS(null, 'x', this.posInit.x);
        rect.setAttributeNS(null, 'y', this.posInit.y);
        rect.setAttributeNS(null, 'height', this.props.largeur);
        rect.setAttributeNS(null, 'width', this.props.longueur);        

        return rect;
    }

    move(){

    }

}

module.exports = Rectangle;
