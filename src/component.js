import {_Register}  from "./register.js";
import {_uuid} from "./entities/uuid.js";
import {FactoryForm} from "./factoryForm.js";

class Component
{
    /**
     * 
     * @param {string} type 
     * @param {object} props 
     */
    constructor( type, props)
    {
        this.uuid = _uuid.generate();
        this.type = type;
        this.form = FactoryForm.createForm(this.uuid, type, props);
        _Register.add(this);
        this.form.draw(svg);
    }
}
export  {Component};