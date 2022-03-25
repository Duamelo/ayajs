//const FactoryForm = require("./factoryForm");
const uuid = require("./maths/uuid");

/**
 * @class
 * @param {number} x
 * @param {number} y
 * 
 */

class Component
{
    

    constructor( type, events = [],  x = 0, y = 0)
    {
        this.uuid = new uuid().generate();
        this.type = type;
        this.x = x;
        this.y = y;
        this.events = events;
        this.form = FactoryForm.createForm(this.type);
        
        this.events.map( (e) => {
            this.form.addEvent(e.ev, e.cb);
        });

        this.form.draw();
       
    }

    
    clone = ()=>
    {
        return new Component(this.type, this.x + 5, this.y + 4);
    }

    render()
    {

    }




}

module.exports = Component;