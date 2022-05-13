import  {_uuid}  from "./uuid.js";
import {_Register}  from "../register.js"

/**
 * @class Link 
 */

class Link
{
    constructor(source, destination, line = undefined) 
    {
       this.uuid = _uuid.generate();
       this.source = source;
       this.destination = destination;
       this.line = line;
       this.type = "link";
       _Register.add(this);
    }
}

export  {Link};