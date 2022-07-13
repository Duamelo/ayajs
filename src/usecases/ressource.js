import { CircleEvent } from "./event";
var methods = [
    "get",
    "post",
    "put",
    "del",
];
class Ressource{
    constructor(x = 0, y = 0, r = 5, angle = 40, svg, config){
        this.x = x;
        this.y = y;
        this.r = r;
        this.circle = "";

        this.arc_angle = angle;


        this.methods = [];

        this.config = config;

        this.svg = svg;

        this.type = "ressource";

        this.draw();
    }

    draw(){
        var x = this.x ,  y = this.y + this.r + 20, cpt = 0;
       
        this.circle = aya.Component("circle", {x: this.x, y: this.y, r: this.r});
        this.circle.form.removeBoxFromDOM();
        this.circle.form.deleteEvent("mousedown");
        this.circle.form.deleteEvent("mouseover");
        this.circle.form.deleteEvent("mouseleave");

        var text = aya.Text(0,0,"empty");
        this.circle.form.addChild(text, (p,c) => {
            c.setOffsetX(p.x - p.r/2);
            c.setOffsetY(p.y + 5)
        }, (p,c) => {}, true);

        for(var m of methods){
            var arc = aya.Arc(this.x, this.y, x, y, this.arc_angle, 3/4);

            this.circle.form.addChild(arc, null, null, false);
            
            var text = aya.Text(arc.x + 10, arc.y, m);

            arc.addChild(text, (p,c)=>{
                c.setOffsetX(0);
                c.setOffsetY(0);
            }, (p,c) =>{
                c.setRotateCenter(c.x, c.y);
            }, false);

            this.circle.form.addChild(text, null, null, false);
            this.methods.push(arc);
            x = arc.dest_x;
            y = arc.dest_y;
            cpt++;
        }

        this.circle.form.addEvent("mouseover", ()=>{
            CircleEvent.mouseovercb(this);
        });
        this.circle.form.addEvent("mouseleave", ()=>{
            CircleEvent.mouseleavecb(this);
        });
    }

    removeArtefact(){
        this.methods.map((m) =>{
            if(m.type == 'arc')
                m.removeFromDOM();
        });
        this.svg.removeEventListener("mouseover", ()=>{});
    }
}
export{Ressource};