import {Line} from "./entities/line.js";
import {_Register} from "./register.js";
import {_uuid} from "../src/maths/uuid.js";



function nativeEvents(){
    var id;
    var cp;
    var dx, dy;
    var state = "";
    var deltaX, deltaY;
    var line = "";


    return {
        mouseDownCb: function mousedowncb(e){
        
            console.log(e.target);
            
        
            dx = e.offsetX;
            dy = e.offsetY;
            
            id = e.srcElement.id;
            cp = _Register.find(id);
        
            if(cp.parent == undefined)
                state = "moving";
            else{
                state = "drawing";
                id = _uuid.generate();

                console.log("cp down ");
                console.log(cp);
                line = new Line(id, cp.x, cp.y, []);
                
                line.draw(svg);
            }
            console.log("mouse down state = " + state);


                
        },
        mouseMoveCb: function movecb(e){
    
            console.log("move");
            if(state == "moving"){
                
                deltaX = e.offsetX - dx;
                deltaY = e.offsetY - dy;
        
        
                // deltaX = cp.form.x + deltaX;
                // deltaY = cp.form.y + deltaY;
                
                dx = e.offsetX;
                dy = e.offsetY;
        
                cp.form.redraw(deltaX, deltaY);
            }
            else if (state == "drawing"){
               
                line.redraw(e.clientX, e.clientY);
            }
        },

        mouseUpCb: function mouseupcb(e){
            console.log("mouse up ");
            
            state = "";
        }
    }
}

var events = nativeEvents();

export {events};

