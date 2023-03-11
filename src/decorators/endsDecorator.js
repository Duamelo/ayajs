import { _uuid } from "../entities/uuid";
import { Factory } from "../factory";
import { Decorator } from "./decorator";

class EndsDecorator extends Decorator{
    constructor(component, config, svg, events){
        super(component);
        this.component = component;
        this.config = config;
        this.svg = svg;
        this.events = events;
        this.addDestEnd(config && config.line.ends.dest ? config.line.ends.dest.type : null);
        this.addStartEnd(config && config.line.ends.start ? config.line.ends.start.type : null);
    }

    addDestEnd(type){
        if (!type)
            throw new Error("type is required");
        if(type == 'triangle'){
            var child = Factory.createForm(_uuid.generate(), 'triangle', {}, this.svg, this.events, this.config);    
            this.addChild(child, 
                (p, c) => {
                    c.setOffsetX(0);
                    c.setOffsetY(0);
                    c.x1 =  p.dest_x - 10;
                    c.y1 =  p.dest_y - 4;
                    c.x2 =  p.dest_x;
                    c.y2 =  p.dest_y;
                    c.x3 =  p.dest_x - 10;
                    c.y3 =  p.dest_y + 4;   
                    c.dest = true;         
                }, 
                (p, c) => {
                    c.setRotateCenter(c.x2, c.y2);
                }, 
            true);
        }
    }

    addStartEnd(type){
        if (!type)
            throw new Error("type is required");
        if(type == 'triangle'){
            var child = Factory.createForm(_uuid.generate(), 'triangle', {}, this.svg, this.events, this.config);    
            this.addChild(child, 
                (p, c) => {
                    c.setOffsetX(0);
                    c.setOffsetY(0);
                    c.x1 =  p.x - 10;
                    c.y1 =  p.y - 4;
                    c.x2 =  p.x;
                    c.y2 =  p.y;
                    c.x3 =  p.x - 10;
                    c.y3 =  p.y + 4;       
                    c.src = true;     
                }, 
                (p, c) => {
                    c.setRotateCenter(c.x2, c.y2);
                }, 
            true);
        }
    }

}

export {EndsDecorator};