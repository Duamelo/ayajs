var  Forme = require("../abstraction/forme.js");


class Losange extends Forme{
    constructor(pt_X1 = {x:0,y:0}, pt_X2 = {x:0,y:0}, pt_X3 = {x:0,y:0}, pt_X4 = {x:0,y:0}){
        super();
        this.points = {"pX1": pt_X1, "pX2": pt_X2, "pX3": pt_X3, "pX4": pt_X4};
        this.drawn();
    }

    drawn(){
        var losange_path = document.createElementNS("http://www.w3.org/2000/svg","path");
        let path = "M"+this.points.pX1.x+ " " +this.points.pX1.y +
        " L"+this.points.pX2.x+ " "+this.points.pX2.y +
        " L"+this.points.pX3.x + " "+this.points.pX3.y + 
        " L"+this.points.pX4.x + " "+this.points.pX4.y +
        " Z";
        losange_path.setAttributeNS(null,"d",path);
        return losange_path;
    }
}

module.export =  Losange ;