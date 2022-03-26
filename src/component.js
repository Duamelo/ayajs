//const FactoryForm = require("./factoryForm");
const uuid = require("./maths/uuid");

/**
 * @param {string} type 
 * @param {array} events 
 * @param {object} params 
 */

class Component
{
 
    constructor( type, events = [],  params = {})
    {
        this.uuid = new uuid().generate();
        this.type = type;
        this.params = params
        this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, this.params, events);
        this.form.draw();
        this.register = Register.add(this.uuid, this);
    }

    hello = () =>{
        console.log("hello world");
    }
    
    clone = ()=>
    {
        
    }

    add()
    {
        return 1;
    }
}

module.exports = Component;