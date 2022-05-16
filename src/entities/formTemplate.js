import { _Register } from "../register";
import { _uuid } from "./uuid";
import {events} from "../events";
import { EventManager } from "../eventManager";
import { Point } from "./point";


class TemplateForm{
    /**
     * 
     * @param {string} uuid 
     * @param {number} x 
     * @param {number} y 
     * @param {number} r 
     * @param {array of object} children 
     * @param {object} ratio 
     * @param {boolean} zoom 
     */

    constructor(uuid, /* ajouter les paramètres de votre forme */){

        this.uuid = uuid;

        /* ajouter vos events */
        this.events = new EventManager();


        this.c_svg = "";
        this.type = "";

     

        /* ajouter autant de point de connexion que nécessaire*/
        this.c_points = [
            new Point(this.uuid,0, 0 ),
        ];

        /* ajouter autant de sommet que nécessaire*/
        this.vertex = [
            new Point(this.uuid,0, 0 ),
        ];

        /* ajouter les enfants d'un composant*/
        this.children = [];

        /* s'il s'agit de enfant*/
        this.ratio = ratio;
        this.zoom = zoom;

        /* créer chacque enfant s'il y a lieu*/
        this.createChildren(children);

        /* enregistrer le composant*/
        _Register.add(this);
    }

    determine_the_right_point(line){

        var _x, _y;
        var a = (line.dest_y - line.y)/(line.dest_x - line.x);
        var b = line.y - a * line.x;
        

        for (var i = 0; i <= 3; i++){
            if(i % 2 == 0){
                _y = this.vertex[i].y;
                _x = (y - b)/a;
            }
            else{
                _x = this.vertex[i].x;
                _y = a * x + b;
            }
            if( (_x == this.line.x && _y == line.y) || (_x == this.line.dest_x && _y == line.dest_y))
                continue;
            if((i == 0 &&  _x > this.vertex[i].x && _x < this.vertex[i+1].x) ||
               (i == 1 &&  _x > this.vertex[i].y && _x < this.vertex[i+1].y) || 
               (i == 2 &&  _x > this.vertex[i+1].x && _x < this.vertex[i].x) ||
               (i == 3 &&  _x > this.vertex[0].y && _x < this.vertex[i].y)) 
                
               return this.c_points[i];
    }


}






 
  
    determine_the_equation_of_a_straight_line(pt1, pt2){
        var _cf, _slope;

        _slope = this.slope_of_a_straight_line(pt1, pt2);
        _cf = this.determine_the_coefficient(pt1, pt2, slope);

        return {coefficient: _cf, slope: _slope}
    }

    /* return the interction point of two line*/
    solve_the_equation_system(cf1, slope1, cf2, slope2){
        var _x = (cf1 - cf2) / (slope2 - slope1);
        var _y = slope2 * _x + cf2;
        return {x: _x, y: _y};
    }

    /* pente de la droite */
    slope_of_a_straight_line(pt1, pt2){
        return (pt2.y - pt1.y) / (pt2.x - pt1.x); 
    }


    determine_the_coefficient(pt1, pt2, slope){
        return pt2.y - slope * pt1.x;
    }



    drawVertex(){
       /* initialiser les coordonnées de chaque sommet*/
    //    this.c_points[0].x = this.x;
    //    this.c_points[0].y = this.y - this.r;
    }
    
    drawConnector() {
        /* initialiser les coordonnées de chaque point de connexion*/

        // this.c_points[0].x = this.x;
        // this.c_points[0].y = this.y - this.r;
    }

    drawBox(){


        /* dessiner le contour de la forme sous forme de carré*/

        // var p = `M ${this.vertex[0].x} ${this.vertex[0].y}
        //           L ${this.c_points[0].x} ${this.c_points[0].y} 
        //           L ${this.vertex[1].x}   ${this.vertex[1].y} 
        //           L ${this.c_points[1].x} ${this.c_points[1].y}
        //           L ${this.vertex[2].x}   ${this.vertex[2].y}
        //           L ${this.c_points[2].x} ${this.c_points[2].y} 
        //           L ${this.vertex[3].x}   ${this.vertex[3].y} 
        //           L ${this.c_points[3].x} ${this.c_points[3].y} Z`;
    
        // this.box.setAttribute("d", p);
      }
    
    /**
     * 
     * @param {DOMElement} svgs 
     */
    
    draw(svgs){

        /* dessiner la forme svg adéquate*/
        const svgns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(svgns, "rect");
        
        /* dessin le contour */
        this.drawBox();
        this.box.setAttributeNS(null, "stroke", "rgb(82, 170, 214)");
        this.box.setAttributeNS(null, "stroke-width", "1px");
        this.box.setAttributeNS(null, "fill", "none");
        this.box.setAttribute("stroke-dasharray", "4");

        
        svgs.appendChild(this.c_svg);
        svgs.appendChild(this.box);

        
        this.drawVertex();
        this.drawConnector();

        this.c_points.map((point) => {
            point.draw(svgs);
          });
      
          this.vertex.map((point) => {
            point.draw(svgs);
          });
      

          /* ajouter vos évènements dans events*/
        this.events.add(this.c_svg, "mousedown", events.mouseDownCb);

        /* créer les évènements*/
        this.events.create();
    }

  
    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){

        /* modifier les paramètres de la forme en fonction de vos besoins*/
        
        this.drawConnector();
        this.drawVertex();
        this.drawBox();


        this.vertex.map((vert) => {
            vert.redraw();
            });

            this.c_points.map( (point) => {
            point.redraw();
        });
    }

    resize(pos, dx, dy, param = {}){
        if(Object.keys(param).length > 0){
            if( this.zoom == false && Object.keys(this.ratio).length > 0 ){
                this.x = param.x + this.ratio.x * param.width;
                this.y = param.y + this.ratio.y * param.height;
            }
            else{
                this.x = param.x + this.ratio.x * param.width;
                this.y = param.y + this.ratio.y * param.height;
                (param.width <= param.height) ? this.r = this.ratio.r * param.width : this.r = this.ratio.r * param.height;
            }
        }
        else{
            if(pos == 0)
                this.r += -dx;
            else if(pos == 1)
                this.r += dx;
            else if(pos == 2)
                this.r += dx;
            else
                this.r -= dx;
        }

        
    }

    createChildren(children){
        children.map( (chd) => {

        });
    }

}



/**
 *         equation_line = this.determine_the_equation_of_a_straight_line({x: this.line.x, y: this.line.y}, {x: this.line.dest_x, y: this.line.dest_y});

        for (var i = 0; i <=3; i++){

            if( i == 3){
                equation_of_a_side = this.determine_the_equation_of_a_straight_line(this.vertex[i], this.vertex[0]);
                
                var solution = this.solve_the_equation_system(equation_line.coefficient, equation_line.slope, equation_of_a_side.coefficient, equation_of_a_side.slope);
                
                if(i % 2 == 0){
                    if(solution.x > this.vertex[i].x && solution.x < this.vertex[i+1])
                        result.push(solution);
                }
                else{
                    if( (solution.y > this.vertex[i].y && solution.y < this.vertex[i+1]) && (solution.x != ))

                }
            }
            equation_line = this.determine_the_equation_of_a_straight_line({x: this.line.x, y: this.line.y}, {x: this.line.dest_x, y: this.line.dest_y});
            equation_of_a_side = this.determine_the_equation_of_a_straight_line(this.vertex[i], this.vertex[i+1]);
            
            var solution = this.solve_the_equation_system(equation_line.coefficient, equation_line.slope, equation_of_a_side.coefficient, equation_of_a_side.slope);
            
            result.push(solution);


 */