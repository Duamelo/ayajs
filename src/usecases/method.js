import { AncreEvent, EsquissEvent, PatternEvent, RectangleEvent } from "./event";

class Method{
    constructor(x, y, r, min, name = "", svg){

        this.design_pattern = [
            aya.Text(0,0,"adapter"),
            aya.Text(0,0,"composite"),
            aya.Text(0,0,"chain of responsability"),
            aya.Text(0,0,"decorator"),
            aya.Text(0,0,"strategy")
        ];
        this.x_circle = x;
        this.y_circle = y;
        this.r_circle = r;

        this.points = [
            Math.cos( ( (60 - min * 30 ) * Math.PI) / 180) * this.r_circle + this.x_circle,
            Math.sin( ( (60 - min * 30 ) *  Math.PI) / 180) * this.r_circle + this.y_circle,
            this.x_circle + this.r_circle + 5 ,
            this.y_circle + 100 - min * 50,
            this.x_circle + this.r_circle + 5 + 50,
            this.y_circle + 100 - min * 50
        ];
       
        this.width = 125;
        this.height = 30;

        this.name = name;
       
        this.polyline = "";
        this.id = "";
        this.esquiss = "";

        this.svg = svg;

        this.type  = "method";
        this.draw();
    }

    draw(){
        this.polyline = aya.Polyline(this.points);
        this.ancre = aya.Circle(this.polyline.x, this.polyline.y, 5);
        this.ancre.draw();
        this.ancre.removeBoxFromDOM();
        this.ancre.c_svg.setAttribute("fill", "black");
        this.id = aya.Rectangle(this.polyline.dest_x, this.polyline.dest_y - 15, this.width, this.height);
        this.method_name = aya.Text(0,0,this.name);
        this.id.addChild(this.method_name, (p,c)=>{
            c.setOffsetX(p.x + p.width/3);
            c.setOffsetY(p.y + 20);
        }, (p,c)=>{}, false);
        this.polyline.draw();
        this.id.draw();

        this.polyline.c_svg.setAttribute("fill", "none");

        this.id.addEvent("mouseover", ()=>{
            RectangleEvent.mouseovercb(this);
        });
        this.id.addEvent("mouseleave", ()=>{
            RectangleEvent.mouseleavecb(this);
        });
    }

    removeFromDOM(){}

    createArtefact(){
        var points = [
            this.id.x + this.id.width +  -1/4 * this.width,
            this.id.y + this.id.height + 0,
            this.id.x + this.id.width + 0,
            this.id.y + this.id.height +0,
            this.id.x + this.id.width + 0,
            this.id.y + this.id.height +200,
            this.id.x + this.id.width + 300,
            this.id.y + this.id.height +200,
            this.id.x + this.id.width + 300,
            this.id.y + this.id.height + -(300 + 100 + this.height - 50),
            this.id.x + this.id.width + 0,
            this.id.y + this.id.height +-(300 + 100 + this.height - 50),
            this.id.x + this.id.width + 0,
            this.id.y + this.id.height +-this.height,
            this.id.x + this.id.width + -1/4 * this.width,
            this.id.y + this.id.height +-this.height
        ];
        this.esquiss = aya.Polyline(points);

        this.design_pattern.map((pattern, index) =>{
            this.esquiss.addChild(pattern, (p,c) =>{
                if(index == 0){
                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25 + 25);
                    c.setOffsetY((p.y - 30) + 30/2 - 25 - 25);
                }
                if(index == 1){
                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25);
                    c.setOffsetY((p.y - 30) + 30/2 - 25);
                }
                if(index == 2){
                    c.setOffsetX(p.x + (1/4 * 125) + 25);
                    c.setOffsetY((p.y - 30) + 30/2);
                }
                if(index == 3){
                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25);
                    c.setOffsetY((p.y - 30) + 30/2 + 25);
                }
                if(index == 4){
                    c.setOffsetX(p.x + (1/4 * 125) + 25 + 25 + 25);
                    c.setOffsetY((p.y - 30) + 30/2 + 25 + 25);
                }
            }, (p,c)=>{}, false);
        });
        this.esquiss.draw();
        this.esquiss.children.map(({child}) =>{
            child.draw();
        });
        this.esquiss.c_svg.setAttribute("stroke-width", "0px");
        this.esquiss.addEvent("mouseover", ()=>{
            EsquissEvent.mouseovercb(this);
        });
        this.esquiss.addEvent("mouseleave", ()=>{
            EsquissEvent.mouseleavecb(this);
        });
        this.esquiss.children.map(({child}) =>{
            child.addEvent("mouseover", () =>{
                PatternEvent.mouseovercb({self: this, child: child});
            });
            child.addEvent("mouseleave", () =>{
                PatternEvent.mouseleavecb({self: this, child: child});
            });
            child.addEvent("mousedown", ()=>{
                PatternEvent.mousedowncb({self: this, child: child});
            });
        });
    }

    removeArtefact(){
        this.esquiss.removeFromDOM();
        this.svg.removeEventListener("mouseover", ()=>{});
    }
}
export{Method};