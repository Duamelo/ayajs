/**
 * @class FactoryForm
 */

class FactoryForm
{
   /**
    * 
    * @param {string} uuid 
    * @param {string} type 
    * @param {object} param 
    * @param {array} events 
    * @returns form
    */

    createForm(uuid, type, param, events)
    {
        return new Circle(uuid, param.x, param.y, param.r, events);
    }
}

module.exports = FactoryForm;