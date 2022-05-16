import { events } from "../events.js";
import { _uuid } from "./uuid.js";
import { EventManager } from "../eventManager.js";
import { _Register } from "../register.js";
import { Point } from "./point.js";

/**
 * @class Triangle
 */

class Triangle {

  constructor( uuid, x1 = 0, y1 = 0, x2 = 5, y2 = 5, x3 = 10, y3 = 10, children = [], ratio = {}, zoom = false )
  {

    this.uuid = uuid;

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.x3 = x3;
    this.y3 = y3;

    this.events = new EventManager();

    this.c_svg = "";
    this.p = "";

    this.type = "triangle";
    this.ratio = ratio;
    this.zoom = zoom;
    this.box = "";  

    this.children = [];

    this.p1 = {x: 0, y: 0};
    this.p2 = {x: 0, y: 0};
    this.p3 = {x: 0, y: 0};

    this.c_points = [
      new Point(this.uuid,0, 0 ),
      new Point(this.uuid,0, 0 ),
      new Point(this.uuid,0, 0 ),
      new Point(this.uuid,0, 0 ),
    ];

    this.vertex = [
        new Point(this.uuid,0, 0 ),
        new Point(this.uuid,0, 0 ),
        new Point(this.uuid,0, 0 ),
        new Point(this.uuid,0, 0 ),
        new Point(this.uuid,0, 0 ),
    ];

    // console.log(this.base() + " " + this.perimeter() + " " + this.area() + " " + this .hauteur());

    // console.log(this.p1.x + " " + this.p1.y + " " + this.p2.x + " " + this.p2.y + " " + this.p3.x + " " + this.p3.y  );
    // console.log(this.x1 + " " + this.y1 + " " + this.x2 + " " + this.y2 + " " + this.x3 + " " + this.y3 );

    // console.log(this.vertex);
    // console.log(this.c_points);

    this.createChildren(children);
  }

  base(){
    var base;
               (this.x2 - this.x1) < (this.x2 - this.x3) ? 
                 ( (this.x2 - this.x3) < (this.x3 - this.x1) && ( this.p1.x = this.x1, this.p1.y = this.y1,  this.p2.x = this.x3, this.p2.y = this.y3, this.p3.x = this.x2, this.p3.y = this.y2) ? 
                    base = Math.sqrt((Math.pow((this.x3 - this.x1), 2) + Math.pow((this.y3 - this.y1), 2))) :
                 base = Math.sqrt((Math.pow((this.x2 - this.x3), 2) + Math.pow((this.y2 - this.y3), 2))) )  &&( (this.p1.x = this.x2, this.p1.y = this.y2, this.p2.x = this.x3, this.p2.y = this.y3, this.p3.x = this.x1, this.p3.y = this.y1))  : 
               (this.x2 - this.x1) < (this.x3 - this.x1)  && (( this.p1.x = this.x1, this.p1.y = this.y1, this.p2.x = this.x3, this.p2.y = this.y3, this.p3.x = this.x2, this.p3.y = this.y2)) ?
                    base = Math.sqrt((Math.pow((this.x3 - this.x1), 2) + Math.pow((this.y3 - this.y1), 2))) : 
                base = Math.sqrt((Math.pow((this.x2 - this.x1), 2) + Math.pow((this.y2 - this.y1), 2))) && ( this.p1.x = this.x1, this.p1.y = this.y1, this.p2.x = this.x2, this.p2.y = this.y2, this.p3.x = this.x3, this.p3.y = this.y3);
    return base;
  }

  perimeter(){
    return (
                (Math.sqrt((Math.pow((this.x2 - this.x1), 2) + Math.pow((this.y2 - this.y1), 2))))
               + (Math.sqrt((Math.pow((this.x3 - this.x1), 2) + Math.pow((this.y3 - this.y1), 2)))) 
               + (Math.sqrt((Math.pow((this.x2 - this.x3), 2) + Math.pow((this.y2 - this.y3), 2)))) 
            )/2;
  }

  area(){
    return  this.perimeter() 
              * (this.perimeter() - Math.sqrt((Math.pow((this.x2 - this.x1), 2) + Math.pow((this.y2 - this.y1), 2)))) 
              * (this.perimeter() - Math.sqrt((Math.pow((this.x3 - this.x1), 2) + Math.pow((this.y3 - this.y1), 2))))
              * (this.perimeter() - Math.sqrt((Math.pow((this.x2 - this.x3), 2) + Math.pow((this.y2 - this.y3), 2)))) ;
  }

  hauteur(){
    return Math.sqrt(   ( (4 * this.area()) / Math.pow(this.base(), 2) )  )
  }



  drawVertex(){
    /* initialiser les coordonnées de chaque sommet*/

    this.vertex[0].x = this.p1.x;
    this.vertex[0].y = (this.p1.y > this.p3.y) ? this.p1.y - (this.p1.y - this.p3.y): this.p1.y;

    this.vertex[1].x = this.p2.x;
    this.vertex[1].y = (this.p2.y > this.p3.y) ? this.p2.y - (this.p2.y - this.p3.y) : this.p2.y;

    this.vertex[2].x = this.p2.x + this.p1.x;
    this.vertex[2].y = (this.p2.y < this.p3.y) ? this.p2.y + (this.p3.y - this.p2.y) : this.p2.y;

    this.vertex[3].x =  this.p2.x + this.p1.x - this.base();
    this.vertex[3].y = (this.p1.y < this.p3.y) ? this.p1.y + (this.p3.y - this.p1.y): this.p1.y;

    this.vertex[4].x = this.p3.x;
    this.vertex[4].y = this.p3.y;
  }

 drawConnector() {
     /* initialiser les coordonnées de chaque point de connexion*/

     this.c_points[0].x = (this.p1.x + this.p2.x) / 2;
     this.c_points[0].y = (this.p1.y + this.p2.y) / 2;

     this.c_points[1].x = this.vertex[1].x;
     this.c_points[1].y = (this.vertex[1].y + this.vertex[2].y) / 2;

     this.c_points[2].x = (this.vertex[2].x + this.vertex[3].x) / 2;
     this.c_points[2].y = this.vertex[2].y;

     this.c_points[3].x = this.vertex[0].x;
     this.c_points[3].y = (this.vertex[0].y + this.vertex[3].y) / 2;
}

 drawBox(){
     /* dessiner le contour de la forme sous forme de carré*/

     var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
               L ${this.c_points[0].x} ${this.c_points[0].y} 
               L ${this.vertex[1].x}   ${this.vertex[1].y} 
               L ${this.c_points[1].x} ${this.c_points[1].y}
               L ${this.vertex[2].x}   ${this.vertex[2].y}
               L ${this.c_points[2].x} ${this.c_points[2].y} 
               L ${this.vertex[3].x}   ${this.vertex[3].y}
               L ${this.c_points[3].x} ${this.c_points[3].y} Z`;
 
     this.box.setAttribute("d", p);
}


  draw(svgs) {

    const ns = "http://www.w3.org/2000/svg";
    this.c_svg = document.createElementNS(ns, "path");
    // this.box = document.createElementNS(ns, "path");


    var p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";


    this.c_svg.setAttribute("id", this.uuid);
    this.c_svg.setAttribute("d", p);
    this.c_svg.setAttributeNS(null, "stroke", "darkviolet");
    this.c_svg.setAttributeNS(null, "stroke-width", "2px");
    this.c_svg.setAttribute("fill", "lavenderblush");


    // this.drawVertex();
    // this.drawConnector();

    /* dessin le contour */
    // this.drawBox();
    // this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
    // this.box.setAttributeNS(null, "stroke-width", "1px");
    // this.box.setAttributeNS(null, "fill", "none");
    // this.box.setAttribute("stroke-dasharray", "4");

    
    svgs.appendChild(this.c_svg);
    // svgs.appendChild(this.box);


    // this.vertex.map((v) => {
    //   v.draw(svgs);
    // });

    // this.c_points.map((point) => {
    //   point.draw(svgs);
    // });

    

    this.events.add(this.c_svg, "mousedown", events.mouseDownCb);
    this.events.add(this.c_svg, "mouseup", events.mouseUpCb);
    this.events.add(this.c_svg, "mouseover", events.mouseOverCb);
    this.events.add(this.c_svg, "mouseleave", events.mouseLeaveCb);

    this.events.create();
  }

  shift(dx, dy) {
    this.x1 += dx;
    this.y1 += dy;

    this.x2 += dx;
    this.y2 += dy;

    this.x3 += dx;
    this.y3 += dy;

    this.c_points.map((p) => {
      p.shift(dx, dy);
    });

    this.vertex.map((v) => {
      v.shift(dx, dy);
    });
  }

  redraw() {
    var p = "M " + this.x1 + "," + this.y1 + " " + "L " + this.x2 + "," + this.y2 + " " + "L " + this.x3 + "," + this.y3 + " Z";

    this.c_svg.setAttribute("d", p);

    // this.drawVertex();
    // this.drawConnector();
    // this.drawBox();


    // this.vertex.map((v) => {
    //   v.redraw();
    // });

    // this.c_points.map((p) => {
    //   p.redraw();
    // });
  }
  
  resize(pos, dx, dy, param = {}) {

    if(Object.keys(this.ratio).length > 0){

        (this.zoom == false) ? 
          this.shift(dx,dy):
        undefined ;
    }
    else{
      if (pos == 0) {
        this.x1 = dx;
        this.y1 = dy;
        this.vertex[0].x = dx;
        this.vertex[0].y = dy;
        // this.drawConnector();
      } 
      else if (pos == 1) {
        this.x2 = dx;
        this.y2 = dy;
        this.vertex[1].x = dx;
        this.vertex[1].y = dy;
        // this.drawConnector();
      }
      else if (pos == 2) {
        this.x3 = dx;
        this.y3 = dy;
        this.vertex[2].x = dx;
        this.vertex[2].y = dy;
        // this.drawConnector();
      }
 
    }
  }


  createChildren(children){
    children.map( (chd) => {

    });
  }
}
export { Triangle };
