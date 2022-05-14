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
            }else{
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