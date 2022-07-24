import { AncreEvent, CircleEvent } from "./event";
import { Method } from "./method";
var methods = [
    "get",
    "post",
    "put",
    "del",
];
class Ressource{
    constructor(x = 0, y = 0, r = 5, angle = 40, data = {}, svg, config){
        this.x = x;
        this.y = y;
        this.r = r;
        this.circle = "";

        this.data = data;

        this.delta = 0;

        this.arc_angle = angle;

        this.methods = [];

        this.config = config;

        this.svg = svg;

        this.type = "ressource";

        this.draw();
    }

    draw(){
        if((!this.data.children && !this.data.params && !this.data.methods) ||
           (this.data.children && !this.data.methods && !this.data.params)  
        )
            this.drawPath(this.data.path);
        else if( (!this.data.children && this.data.params) ||
                 (this.data.children  && this.data.params)
        )
            this.drawParam(this.data.params);
        if(this.data.methods)
            this.drawRessource();

        if(this.data.children){
            this.data.children.map((m)=>{
                aya.Ressource(this.x + this.delta, this.y + 50, this.r, this.arc_angle, m);
                this.delta = 200;

            });
        }
    }

    drawPath(name){
        var path = aya.Component("circle", {x: this.x + 100, y: this.y + 50, r: 10});
        path.form.c_svg.setAttribute("fill", "#151e3e");
        path.form.addChild(aya.Text(0,0,name), (p,c)=>{
            c.setOffsetX(p.x - p.r);
            c.setOffsetY(p.y - p.r - 10);
        }, (p,c)=>{}, true);
    }

    drawParam(params){
        params.map((param)=>{
            var node = aya.Component("lozenge", {x: this.x + 80, y: this.y - 50, width: 30, height: 30});
            node.form.c_svg.setAttribute("fill", "#415682");
            var text = aya.Text(0,0,"{"+param.name+"}");
            node.form.addChild(text, (p,c)=>{
                c.setOffsetX(p.x - p.width/3 - 12);
                c.setOffsetY(p.y + p.height/2 + 5);
            }, (p, c) =>{}, true);
        });
    }

    drawRessource(){
        var x = this.x, y = this.y + this.r + 10, idx;

        this.circle = aya.Component("circle", {x: this.x, y: this.y, r: this.r});
        this.circle.form.c_svg.setAttribute("fill", "#909294");

        this.circle.form.removeBoxFromDOM();
        // this.circle.form.deleteEvent("mousedown");
        // this.circle.form.deleteEvent("mouseover");
        // this.circle.form.deleteEvent("mouseleave");

        if(Object.keys(this.data)){
            var text = aya.Text(0,0, "res");
            this.circle.form.addChild(text, (p,c) => {
                c.setOffsetX(p.x - p.r/2 + 10);
                c.setOffsetY(p.y + 5)
            }, (p,c) => {}, true);
            text.title.textContent = "ressource";
        }


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
        }
        if(this.data.methods){
            for(var m of this.data.methods){
                for(var mm of this.methods){
                    if(mm.type == 'arc' && mm.children[0].child.text == m.name){
                        console.log("idx");
                        idx = this.relocate(mm);
                        break;
                    }
                }
                console.log("this.methods[idx]");

                console.log(this.methods[idx]);
                delete this.methods[idx]
                this.methods[idx] = new Method(this.x, this.y, this.r, idx, m.id, this.svg);
                this.methods[idx].ancre.addChild(aya.Text(0,0,m.name), (p,c)=>{
                    c.setOffsetX(p.x + 10);
                    c.setOffsetY(p.y + 10);
                }, (p,c)=>{}, true);
                this.methods[idx].id.removeFromDOM();
                this.methods[idx].polyline.removeFromDOM();
            }
        }

        this.methods.map( (m) =>{
            if(m.type == 'method'){
                m.ancre.addEvent("mousedown", ()=>{
                    AncreEvent.mousedowncb({self: this, method: m});
                });
            }
        })
        this.circle.form.addEvent("mouseover", ()=>{
            CircleEvent.mouseovercb(this);
        });
        this.circle.form.addEvent("mouseleave", ()=>{
            CircleEvent.mouseleavecb(this);
        });

    }

    relocate(arc){
        var min = -1, temp;
            this.methods.map((m1, index) =>{
                console.log(m1);
                if( m1.type == 'arc' && min == -1 )
                    min = index;
            });
    
            console.log("this.methods[min]");
            console.log(this.methods[min]);
            temp = this.methods[min].children[0].child.text;
            console.log("temp");
            console.log(temp);
            this.methods[min].children[0].text = arc.children[0].child.text;
            arc.children[0].child.text = temp;
        return min;
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