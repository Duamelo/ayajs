import { Method } from "./method";

class CircleEvent{

    static mouseovercb(self){
        if(state == "mouseover")
            return;
        state = "mouseover";
        active_component = self;
        self.methods.map((m, index)=>{
            if(m.type == 'arc'){
                m.draw();
                console.log("arc drawing");
                console.log(m.children);
                m.children.map(({child})=>{
                    if(index == 0){
                        child.setRotateAngle(-20);
                        child.setOffsetX(2);
                        child.setOffsetY(-5);
                    }
                    if(index == 1){
                        child.setRotateAngle(-60);
                        child.setOffsetX(2);
                        child.setOffsetY(-10);
                    }
                    if(index == 2){
                        child.setRotateAngle(-90);
                        child.setOffsetX(5);
                        child.setOffsetY(-15);
                    }
                    if(index == 3){
                        child.setRotateAngle(-150);
                        child.setOffsetX(20);
                        child.setOffsetY(-2);
                    }
                    child.draw();
                });
                m.addEvent("mouseover", ()=>{
                    ArcEvent.mouseovercb(m);
                });
                m.addEvent("mouseleave", ()=>{
                    ArcEvent.mouseleavecb(m);
                });
                m.addEvent("mousedown", ()=>{
                    ArcEvent.mousedowncb({self: self, arc: m});
                });
            }
        });
        self.svg.addEventListener("mouseover", ()=>{
            console.log("mouseover svg");
            if(state == "mouseover" )
                return;
            console.log(active_component);
            if(active_component)
                active_component.removeArtefact();
            active_component = null;
        });
    }
    static mouseleavecb(self){
        state = "";
    }
}
class ArcEvent{
    static mouseovercb(arc){
        state = "mouseover";
        arc.c_svg.setAttribute("fill", "black");
    }

    static mouseleavecb(arc){
        arc.c_svg.setAttribute("fill", "white");
        state = "";
    }

    static mousedowncb(self){
        console.log("mousedown arc, comp actif");
        console.log(active_component);
        self.self.svg.removeEventListener("mouseover", ()=>{});
        active_component.removeArtefact();
        self.arc.children[0].child.draw();
        active_component = null;
        var method_name = ";"

        for(var m of self.self.data.methods){
            if(m.name == self.arc.children[0].child.text){
                method_name = m.id;
                break;
            }
        }
        state = "";
        self.self.methods[self.self.relocate(self.arc)] = new Method(self.self.x, self.self.y, self.self.r, self.self.relocate(self.arc), method_name, self.self.svg);
    }
}

class RectangleEvent{
    static mouseovercb(self){
        state = "mouseover";
        // self.id.c_svg.setAttribute("fill", "indigo");
        if(active_component)
            return;
        active_component = self;
        self.createArtefact();
        self.svg.addEventListener("mouseover", ()=>{
            console.log("mouseover svg from over rect");
            if(state == "mouseover" )
                return;
            console.log(active_component);
            if(active_component)
                active_component.removeArtefact();
            active_component = null;
        });
    }

    static mouseleavecb(self){
        state = "";
        // self.id.c_svg.setAttribute("fill", "white");
        
    }
}

class EsquissEvent{
    static mouseovercb(self){
    //    self.esquiss.c_svg.setAttribute("fill", "red");
        state = "mouseover";
    }

    static mouseleavecb(self){
        // self.esquiss.c_svg.setAttribute("fill", "white");
         state = "";
    }
}

class PatternEvent{
    static mouseovercb(self){
        state = "mouseover";
        self.child.c_svg.setAttribute("class", "scroll");
    }
    static mouseleavecb(self){
        // self.svg.addEventListener("mouseover", ()=>{
        //     console.log("mouseover svg from over mouseover");
        //     if(state == "mouseover")
        //         return;
        //     console.log(active_component);
        //     if(active_component)
        //         active_component.removeArtefact();
        //     active_component = null;
        // });
    }
    static mousedowncb(self){
        console.log("mousedown sur le text");
        if(self.child.text == 'adapter'){
            console.log(self.child.text);
            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/adapter.png");
            self.self.id.addChild(img, null, null, false);
            self.child.removeFromDOM();
        }
        else if(self.child.text == "composite"){
            console.log(self.child.text);
            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/composite.png");
            self.self.id.addChild(img, null, null, false);
        }
        else if(self.child.text == "chain of responsability"){
            console.log(self.child.text);
            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/chain.png");
            self.self.id.addChild(img, null, null, false);
        }
        else if(self.child.text == "decorator"){
            console.log(self.child.text);
            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/decorator.png");
            self.self.id.addChild(img, null, null, false);
        }
        else if(self.child.text == "strategy"){
            console.log(self.child.text);
            var img = aya.Image(self.self.id.x + 5, self.self.id.y - self.self.height/2, 30,30, "icons/strategy.png");
            self.self.id.addChild(img, null, null, false);
        }
    }
}

class AncreEvent{
    static mousedowncb(self){
        self.method.ancre.selected = true;
        self.self.methods.map((m) =>{
            if(m.type == 'method' && m != self.method && m.ancre.selected == true){
                 m.id.removeFromDOM();
                 m.polyline.removeFromDOM();
                 m.ancre.selected = false;
            }
            if(m.type == 'method' && m == self.method){
                if(active_method == self.method){
                    console.log("active_ancre");
                    m.id.removeFromDOM();
                    m.polyline.removeFromDOM();
                    active_method = "";
                }
                else{
                    self.method.id.draw();
                    self.method.polyline.draw();
                    self.method.id.addEvent("mouseover", ()=>{
                        RectangleEvent.mouseovercb(self.method);
                    });
                    self.method.id.addEvent("mouseleave", ()=>{
                        RectangleEvent.mouseleavecb(self.method);
                    });
                    self.method.polyline.c_svg.setAttribute("fill", "none");
                    active_method = m;
                }
            }
        });
    }
}
export {CircleEvent, ArcEvent, RectangleEvent, EsquissEvent, PatternEvent, AncreEvent};