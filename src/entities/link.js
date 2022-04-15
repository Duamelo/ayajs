import { _uuid } from "../maths/uuid.js";
import {_Register } from "../register.js"

/**
 * @class Link 
 */

class Link
{
    constructor(source, destination, link = undefined) 
    {
       this.uuid = _uuid.generate();
       this.source = source;
       this.destination = destination;
       this.link = link;
       _Register.add(this);
    }
}

export {Link}