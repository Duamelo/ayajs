
/**
 * @class Triangle class
 */

class Triangle extends Form
{
  /**
   * 
   * @param {string} uuid 
   * @param {abscissa starting point} x1 
   * @param {ordonne starting point} y1 
   * @param {LineTo this abscissa point} x2 
   * @param {LineTo this ordonne point} y2 
   * @param {LineTo this abscissa point} x3 
   * @param {LineTo this ordonne point} y3 
   * @param {array of object} events 
   */
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
