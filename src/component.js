//const FactoryForm = require("./factoryForm");
const uuid = require("./maths/uuid");
const Register = require("./register");


class Component
{
    /**
     * 
     * @param {string} type 
     * @param {array} events 
     * @param {object} params 
     */
    constructor( type, events = [],  params = {})
    {
        this.uuid = uuid.generate();
        this.type = type;
       // this.params = params
        this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, /*this.params*/ params, events);
        Register.add(this);
        this.form.draw(svg);
    }

    
}

module.exports = Component;