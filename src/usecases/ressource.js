import { CircleEvent } from "./event";

class Ressource{
    constructor(x = 0, y = 0, r = 5, angle = 40, svg, config){
        this.x = x;
        this.y = y;
        this.r = r;
        this.circle = "";

        this.arc_angle = angle;

        this.active_component = "";

        this.methods = [
            {name: "get", selected: false},
            {name: "post", selected: false},
            {name: "put", selected: false},
            {name: "delete", selected: false}
        ];

        this.design_pattern = [
            "adapter",
            "composite",
            "chain of responsability",
            "decorator",
            "strategy"
        ];

        this.config = config;

        this.svg = svg;

        this.type = "ressource";

        this.draw();
    }

    draw(){
        var x = this.x ,  y = this.y + this.r + 20;
        var text = aya.Text(0,0,"empty");
       
        this.circle = aya.Component("circle", {x: this.x, y: this.y, r: this.r});
        this.circle.form.removeBoxFromDOM();
        this.circle.form.deleteEvent("mousedown");
        this.circle.form.deleteEvent("mouseover");
        this.circle.form.deleteEvent("mouseleave");
     
        this.circle.form.addChild(text, (p,c) => {
            c.setOffsetX(p.x - p.r/2);
            c.setOffsetY(p.y + 5)
        }, (p,c) => {}, true);
       
        for(var m of this.methods){
            var arc = aya.Arc(this.x, this.y, x, y, this.arc_angle, 0);
            this.circle.form.addChild(arc, (p,c)=>{}, (p,c) =>{}, false);
            
            var text = aya.Text(arc.x + 10, arc.y, m.name);
            text.setRotateCenter(text.x, text.y);
            text.setRotateAngle(30);

            this.circle.form.addChild(text, null, null, false);
            x = arc.dest_x;
            y = arc.dest_y;
        }

        this.circle.form.addEvent("mouseover", ()=>{
            CircleEvent.mouseovercb(this);

        });
        this.circle.form.addEvent("mouseleave", ()=>{
            CircleEvent.mouseleavecb(this);
        });
    }

    removeArtefact(){
        this.circle.form.children.map(({child}) =>{
            if(child.type == 'arc')
                child.removeFromDOM();
        });
        this.svg.removeEventListener("mouseover", ()=>{});
    }
}
export{Ressource};