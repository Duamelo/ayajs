import {_Register}  from "./register.js";
import {_uuid} from "./entities/uuid.js";
import {FactoryForm} from "./factoryForm.js";

class Component
{
    /**
     * 
     * @param {*} type 
     * @param {*} props 
     * @param {*} svg 
     * @param {*} events 
     * @param {*} config 
     */
    constructor( type, props, svg, events, config)
    {
        this.uuid = _uuid.generate();
        this.type = type;
        this.form = FactoryForm.createForm(this.uuid, type, props, svg, events, config);
        _Register.add(this);
        this.form.draw();
    }
}
export  {Component};