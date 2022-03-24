const FactoryForm = require("./FactoryForm");
const uuid = require("./maths/uuid");

/**
 * @class
 * @param {number} x
 * @param {number} y
 * 
 */

class Component
{
    

    constructor( type, x = 0, y = 0)
    {
        this.uuid = new uuid().generate();
        this.type = type;
        this.x = x;
        this.y = y;
        this.form = FactoryForm.createForm(this.type);
        
    }

    
    clone = ()=>
    {
        return new Component(this.type, this.x + 5, this.y + 4);
    }

    draw()
    {

    }

    render()
    {

    }



}

module.exports = Component;