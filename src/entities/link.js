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
       
       /* référence sur les points de connexions*/
       this.source = source;
       this.destination = destination;
       this.line = line;
       this.type = "link";
       _Register.add(this);
    }

    redraw(){
        console.log(this.destination.ref);
        console.log(this.source.ref);

        var source = _Register.find(this.source.ref), destination = _Register.find(this.destination.ref);

        var source_point = source.form.optimalPath(this.line);
        var dest_point = destination.form.optimalPath(this.line);


        if(source_point)
            this.source = source_point;
        if(dest_point)
            this.destination = dest_point;

        this.line.x = this.source.x;
        this.line.y = this.source.y;

        this.line.dest_x = this.destination.x;
        this.line.dest_y = this.destination.y;

        this.line.redraw();
    }
}
export {Link};