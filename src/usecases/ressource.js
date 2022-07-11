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
        this.methods = [
            {name: "get", selected: false},
            {name: "post", selected: false},
            {name: "put", selected: false},
            {name: "delete", selected: false}
        ];

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

        this.angle = 30;

        this.children = [];

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
    }

    addMethod(){
        var x = this.x ,  y = this.y + this.r + 20;
        for(var m of this.methods){
                if(m.selected == false){
                    var arc = FactoryForm.createForm(_uuid.generate(), "arc", {x0: this.x, y0: this.y, x: x, y: y, angle: this.angle, ratio : 0}, this.svg, this.nativeEvent, this.config);
                    var text = FactoryForm.createForm(_uuid.generate(), "text", {x: arc.x + 10, y: arc.y, text: m.name}, this.svg, this.nativeEvent, this.config);
                    arc.addChild(text, (p,c) =>{
                        c.setOffsetX(0);
                        c.setOffsetY(0);
                        c.setText(m.name);
                    }, (p,c) =>{
                        c.setRotateCenter(c.x, c.y);
                        c.setRotateAngle(30);
                    }, false);
                    m.arc = arc;
                    x = arc.dest_x;
                    y = arc.dest_y;
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
        var state = "";
        var ns="http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(ns,"circle");

        this.c_svg.setAttribute("id", this.uuid);

        this.c_svg.setAttribute("cx", (this.x + this.offsetX));

        this.c_svg.setAttribute("cy", (this.y + this.offsetY));

        this.c_svg.setAttribute("r", (this.r * this.scale));

        this.c_svg.setAttribute("fill", this.config.form.fill);

        this.c_svg.setAttribute("stroke", this.config.form.stroke);

        this.c_svg.setAttribute("stroke-width", this.config.form.strokeWidth);

        this.svg.appendChild(this.c_svg);

        var child = FactoryForm.createForm(_uuid.generate(), "text", {x: 0, y: 0, text: "empty"}, this.svg, this.nativeEvent, this.config);
        this.addChild(child, (p,c) => {
            c.setOffsetX(p.x - p.r/2);
            c.setOffsetY(p.y + 5)
        }, (p,c) => {});


        this.addEvent("mouseover", ()=>{ 
            if(state == "mouseover")
                return;
            state = "mouseover";
            this.methods.map( (m, index) => {
                if(m.selected == false){
                    m.arc.draw();
                    m.arc.addEvent("mouseover", ()=>{
                        m.arc.c_svg.setAttribute("fill", "black");
                    });
                    m.arc.addEvent("mousedown", () => {
                        state = "";
                        var x1, x2, x3, y1, y2, y3, i, temp;
                        for(i = 0; i < this.methods.length; i++){
                            if( this.methods[i].selected == false)
                                break;
                        }
                        temp = this.methods[i].name;
                        this.methods[i].name = m.name;
                        this.methods[i].arc.children[0].child.text = m.name;
                        this.methods[index].arc.children[0].child.text = temp;
                        m.name = temp; 
                        x1 =  Math.cos( ( (60 - i * 30 ) * Math.PI) / 180) * this.r + this.x;
                        y1 =  Math.sin( ( (60 - i * 30 ) *  Math.PI) / 180) * this.r + this.y; 
                        y2 =  this.y + 100 - i * 50;
                        x2 =  this.x + this.r + 5;
                        x3 = x2 + 50;
                        y3 = y2;
                        this.methods.map( (m) =>{
                            if(m.selected == false)
                                m.arc.removeFromDOM();
                        });
                        this.methods[i].selected = true;
                        var polyline = aya.Polyline([x1, y1, x2, y2, x3, y3]);
                        var box = aya.Rectangle(polyline.dest_x, polyline.dest_y - 15, 125, 30);
                        polyline.draw();
                        box.draw();
                        polyline.c_svg.setAttribute("fill", "none");
                    });
                }
            });
        });
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
