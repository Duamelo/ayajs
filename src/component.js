import {_Register}  from "./register.js";
import {_uuid} from "./entities/uuid.js";
import {FactoryForm} from "./factoryForm.js";

class Component
{
    /**
     * 
     * @param {string} type 
     * @param {array} events 
     * @param {object} params 
     */
    constructor( type, events = [],  props, children = [])
    {
        this.uuid = _uuid.generate();
        this.type = type;
        this.form = FactoryForm.createForm(this.uuid, type, props, events);
        _Register.add(this);
        this.form.draw(svg);
        this.createChildren(children);
    }

    createChildren(children){

            children.map((chd) => {
                var child = FactoryForm.createForm(_uuid.generate(), chd.type, chd.props, chd.events);
                this.form.children.push(child);
                child.draw(svg);
            });
    }
}

export  {Component};