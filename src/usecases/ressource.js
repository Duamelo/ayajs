import { _Register } from "../register";
import { Point } from "../entities/point";
import { Form } from "../abstraction/form";
import { _uuid } from "../entities/uuid";
import { FactoryForm } from "../factoryForm";

/**
 * @class Ressource
 */
class Ressource extends Form {
    /**
     * 
     * @param {String} uuid 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} r 
     * @param {Number} nb_method 
     * @param {DomElement} svg 
     * @param {Object} event 
     * @param {Object} config 
     */
    constructor(uuid, x = 0, y = 0, r = 5, nb_method = 4, svg, event, config){

        super();

        this.uuid = uuid;

        this.x = x;
        this.y = y;
        this.r = r;
        this.nb_method = nb_method;

        this.events = {};

        this.nativeEvent = event;

        this.config = config;

        this.box = ""

        this.c_svg = "";

        this.svg = svg;

        this.type = "ressource";

        this.scale = 1;

        this.offsetX = 0;
        this.offsetY = 0;

        this.angle = 40;

        this.children = [];
        this.verb = [];
        this.method = {};
        this.pattern = {};

        this.c_points = [
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config)
        ];

        this.vertex = [
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config),
            new Point(this.uuid,0, 0, 5, this.svg, this.nativeEvent, this.config)
        ];
        this.addMethod();
        _Register.add(this);
    }

    addMethod(){
        for(var j = 0; j < this.nb_method; j++){
            if(this.verb.length == 0){
                var arc = FactoryForm.createForm(_uuid.generate(), "arc", {x0: this.x, y0: this.y, x: this.x - 3/2 + this.r - 100, y: this.y - 3/2 + this.r, angle: this.angle}, this.svg, this.nativeEvent, this.config);
                var dest_x = (this.x + arc.x) / 2;
                var dest_y = (this.y + arc.y) /2; 

                var i_dest_x = (arc.x + dest_x) / 2;
                var i_dest_y = (arc.y + dest_y) /2; 
                
                var line1 = FactoryForm.createForm(_uuid.generate(), "line", {x: arc.x, y: arc.y, dest_x: i_dest_x, dest_y: i_dest_y}, this.svg, this.events, this.config);
                line1.children.map(({child}) => {
                   child.removeFromDOM();
                });

                dest_x = (this.x + arc.dest_x) / 2;
                dest_y = (this.y + arc.dest_y) /2; 

                i_dest_x = (arc.dest_x + dest_x) / 2;
                i_dest_y = (arc.dest_y + dest_y) /2; 


                var line2 = FactoryForm.createForm(_uuid.generate(), "line", {x: arc.dest_x, y: arc.dest_y, dest_x: i_dest_x, dest_y: i_dest_y}, this.svg, this.events, this.config);
                line2.children.map(({child}) => {
                   child.removeFromDOM();
                });

                var text = FactoryForm.createForm(_uuid.generate(), "text", {x: arc.x + 10, y: arc.y, text: "get"}, this.svg, this.nativeEvent, this.config);
                text.setRotateCenter(text.x, text.y);
                text.setRotateAngle(30);
                this.verb[j] =  {arc: arc, line1: line1, line2: line2, text: text};
            }
            else{
                var arc = FactoryForm.createForm(_uuid.generate(), "arc", {x0: this.x, y0: this.y, x: this.verb[j-1].arc.dest_x + 1.5, y: this.verb[j-1].arc.dest_y, angle: this.angle}, this.svg, this.nativeEvent, this.config);
                var dest_x = (this.x + arc.x) / 2;
                var dest_y = (this.y + arc.y) /2; 

                var i_dest_x = (arc.x + dest_x) / 2;
                var i_dest_y = (arc.y + dest_y) /2; 

                var line1 = FactoryForm.createForm(_uuid.generate(), "line", {x: this.verb[j-1].arc.dest_x, y: this.verb[j-1].arc.dest_y, dest_x: i_dest_x, dest_y: i_dest_y}, this.svg, this.nativeEvent, this.config);
                line1.children.map(({child}) => {
                   child.removeFromDOM();
                });

                dest_x = (this.x + arc.dest_x) / 2;
                dest_y = (this.y + arc.dest_y) /2; 

                i_dest_x = (arc.dest_x + dest_x) / 2;
                i_dest_y = (arc.dest_y + dest_y) /2; 

                var line2 = FactoryForm.createForm(_uuid.generate(), "line", {x: arc.dest_x, y: arc.dest_y, dest_x: i_dest_x, dest_y: i_dest_y}, this.svg, this.events, this.config);
                line2.children.map(({child}) => {
                   child.removeFromDOM();
                });

                if(j == 1){
                    var text = FactoryForm.createForm(_uuid.generate(), "text", {x: arc.x + 10, y: arc.y, text: "post"}, this.svg, this.nativeEvent, this.config);
                    text.x = text.x - 5;
                    text.y = text.y -5;
                    text.setRotateCenter(text.x, text.y);
                    text.setRotateAngle(-15);
                }
                else if(j == 2){
                    var text = FactoryForm.createForm(_uuid.generate(), "text", {x: arc.x + 10, y: arc.y, text: "put"}, this.svg, this.nativeEvent, this.config);
                    text.x = text.x - 10;
                    text.y = text.y - 10;
                    text.setRotateCenter(text.x, text.y);
                    text.setRotateAngle(-50);
                }
                else if(j == 3){
                    var text = FactoryForm.createForm(_uuid.generate(), "text", {x: arc.x + 10, y: arc.y, text: "del"}, this.svg, this.nativeEvent, this.config);
                    text.x = text.x - 15;
                    text.y = text.y - 10;
                    text.setRotateCenter(text.x, text.y);
                    text.setRotateAngle(-85);
                }

                this.verb[j] =  {arc: arc, line1: line1, line2: line2, text: text};
            }
        }
    }

    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }

    deleteEvent(event){
        var callback = this.events[event];
        this.c_svg.removeEventListener(event, callback);
        delete this.events[event];
    }

    addChild(child, translate, rotate){
        child.setOffsetX(this.x);
        child.setOffsetY(this.y);
        translate(this, child);
        rotate(this, child);
        child.draw();
        this.children.push({child, translate, rotate});
    }

    drawVertex(){
        if(this.vertex.length == 0)
            return;
        this.vertex[0].x = this.x + this.offsetX - this.r * this.scale;
        this.vertex[0].y = this.y + this.offsetY - this.r * this.scale;

        this.vertex[1].x = this.x + this.offsetX + this.r * this.scale;
        this.vertex[1].y = this.y + this.offsetY - this.r * this.scale;

        this.vertex[2].x = this.x + this.offsetX + this.r * this.scale;
        this.vertex[2].y = this.y + this.offsetY + this.r * this.scale;

        this.vertex[3].x = this.x + this.offsetX - this.r * this.scale;
        this.vertex[3].y = this.y + this.offsetY + this.r * this.scale;
    }

    drawConnector() {
        if(this.c_points.length == 0)
            return;
        this.c_points[0].x = this.x + this.offsetX;
        this.c_points[0].y = this.y + this.offsetY - this.r * this.scale;

        this.c_points[1].x = this.x + this.offsetX + this.r * this.scale;
        this.c_points[1].y = this.y + this.offsetY;

        this.c_points[2].x = this.x + this.offsetX;
        this.c_points[2].y = this.y + this.offsetY + this.r * this.scale;

        this.c_points[3].x = this.x + this.offsetX - this.r * this.scale;
        this.c_points[3].y = this.y + this.offsetY;
    }

    drawBox(){
        if(this.vertex.length > 0 && this.c_points.length >0){
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
    }

    draw(){
        var ns="http://www.w3.org/2000/svg";

        this.box = document.createElementNS(ns, "path");
        this.c_svg = document.createElementNS(ns,"circle");

        this.c_svg.setAttribute("id", this.uuid);

        this.c_svg.setAttribute("cx", (this.x + this.offsetX));

        this.c_svg.setAttribute("cy", (this.y + this.offsetY));

        this.c_svg.setAttribute("r", (this.r * this.scale));

        this.c_svg.setAttribute("fill", this.config.form.fill);

        this.c_svg.setAttribute("stroke", this.config.form.stroke);

        this.c_svg.setAttribute("stroke-width", this.config.form.strokeWidth);

        /** draw box */
        this.box.setAttributeNS(null, "stroke", this.config.box.stroke);
        this.box.setAttributeNS(null, "stroke-width", this.config.box.strokeWidth);
        this.box.setAttributeNS(null, "fill", this.config.box.fill);
        this.box.setAttribute("stroke-dasharray", this.config.box.strokeDasharray);

        this.svg.appendChild(this.c_svg);
        this.svg.appendChild(this.box);

        this.drawVertex();
        this.drawConnector();
        this.drawBox();

        this.c_points.map((point) => {
            point.draw();
        });

        this.vertex.map((vertex) => {
            vertex.draw();
        });

        var child = FactoryForm.createForm(_uuid.generate(), "text", {x: 0, y: 0, text: "empty"}, this.svg, this.nativeEvent, this.config);
        this.addChild(child, (p,c) => {
            c.setOffsetX(p.x - p.r/2);
            c.setOffsetY(p.y + 5)
        }, (p,c) => {});


        // this.addEvent("mousedown", this.nativeEvent.mouseDownCb);

    }


    removeFromDOM(){
        this.svg.removeChild(this.c_svg);
    }

    removeBoxFromDOM(){
        this.svg.removeChild(this.box);
    }

    shift(dx, dy){
        this.x += dx;
        this.y += dy;
    }

    redraw(){
        this.c_svg.setAttribute("cx", (this.x + this.offsetX));
        this.c_svg.setAttribute("cy", (this.y + this.offsetY));
        this.c_svg.setAttribute("r", (this.r * this.scale));

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

    resize(pos, dx, dy){
        if(pos == 0)
            this.r += -dx;
        else if(pos == 1)
            this.r += dx;
        else if(pos == 2)
            this.r += dx;
        else
            this.r -= dx;
    }

    setRotateAngle(angle){
        this.angle = angle;
    }

    setOffsetX(x){
       this.offsetX = x;
    }

    setOffsetY(y){
        this.offsetY = y;
    }

    setScale(sc){
        this.scale = sc;
    }
    getOffsetX(){
        return this.offsetX;
    }

    getOffsetY(){
        return this.offsetY;
    }

    getScale(){
        return this.scale;
    }

    optimalPath(line){
        var _x, _y;
        var a = (line.dest_y - line.y)/(line.dest_x - line.x);
        var b = line.y - a * line.x;

        for (var i = 0; i <= 3; i++){
            if(i % 2 == 0){
                _y = this.vertex[i].y;
                _x = (_y - b)/a;
            }
            else{
                _x = this.vertex[i].x;
                _y = a * _x + b;
            }

            if( (_x == line.x && _y == line.y) || (_x == line.dest_x && _y == line.dest_y))
              continue;

              if(((i == 0 &&  _x > this.vertex[i].x && _x < this.vertex[i+1].x) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) ||
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) ||
               ((i == 1 &&  _y > this.vertex[i].y && _y < this.vertex[i+1].y) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) ||
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) )) ||
               ((i == 2 &&  _x > this.vertex[i+1].x && _x < this.vertex[i].x) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  )||
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ))) ||
               ((i == 3 &&  _y >= this.vertex[0].y && _y <= this.vertex[i].y) &&
                  (( line.x <= line.dest_x  && _x <= line.dest_x && _x >= line.x &&  a < 0 ? _y >= line.dest_y && _y <= line.y :_y <= line.dest_y && _y >= line.y  ) ||
                  ( line.x >= line.dest_x  && _x >= line.dest_x &&  _x <= line.x  &&  a < 0 ? _y <= line.dest_y &&  _y >= line.y : _y >= line.dest_y &&  _y <= line.y ) ) )) {
                return this.c_points[i];
               }
          }
        return null;
      }
}
export {Ressource};
