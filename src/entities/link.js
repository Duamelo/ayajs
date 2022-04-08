const uuid = require("../maths/uuid");
const Register = require("../register");

/**
 * @class Link 
 */

class Link
{
    constructor(source, destination, link = undefined) 
    {
       this.uuid = uuid.generate();
       this.source = source;
       this.destination = destination;
       this.link = link;
       Register.add(this);
    }
}
module.exports = Link;
