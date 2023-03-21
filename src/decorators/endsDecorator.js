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
        var props = {
            x1: this.component.shape.dest_x - 10,
            y1: this.component.shape.dest_y - 4,
            x2: this.component.shape.dest_x,
            y2: this.component.shape.dest_y,
            x3: this.component.shape.dest_x - 10,
            y3: this.component.shape.dest_y + 4,

        }
        if(type == 'triangle'){
            var child = Factory.createForm(_uuid.generate(), 'triangle', props, this.svg, this.events, this.config);   
            child.dest = true; 
            this.addChild(child, {x: 0, y: 0}, {x: props.x2, y: props.y2}, true);
        }
    }

    addStartEnd(type){
        if (!type)
            throw new Error("type is required");
            var props = {
                x1: this.component.shape.x - 10,
                y1: this.component.shape.y - 4,
                x2: this.component.shape.x,
                y2: this.component.shape.y,
                x3: this.component.shape.x - 10,
                y3: this.component.shape.y + 4,
    
            }
            if(type == 'triangle'){
                var child = Factory.createForm(_uuid.generate(), 'triangle', props, this.svg, this.events, this.config);
                child.src = true;
                this.addChild(child, {x: 0, y: 0}, {x: props.x2, y: props.y2}, true);
            }
    }

}

export {EndsDecorator};