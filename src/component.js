//const FactoryForm = require("./factoryForm");
const uuid = require("./maths/uuid");


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
        this.uuid = new uuid().generate();
        this.type = type;
        this.params = params
        this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, this.params, events);
        this.form.draw(svg);
        this.register = Register.add(this.uuid, this);
    }
}

module.exports = Component;