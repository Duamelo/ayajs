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
        var source = _Register.find(this.source.ref), destination = _Register.find(this.destination.ref);
        var dx = 10, dy = 10;
        var i_src = source.form.optimalPath(this.line);
        var i_dest = destination.form.optimalPath(this.line);
        var source_point = source.form.c_points[i_src];
        var dest_point = destination.form.c_points[i_dest];

        if(source_point)
            this.source = source_point;
        if(dest_point)
            this.destination = dest_point;

        this.line.x = this.source.x;
        this.line.y = this.source.y;

        this.line.dest_x = this.destination.x;
        this.line.dest_y = this.destination.y;

        if(this.line.x <= this.line.dest_x){
            i_src != 1 ? this.line.c1.x = this.line.x : this.line.c1.x = this.line.x + dx;
            i_dest != 3 ? this.line.c4.x = this.line.dest_x : this.line.c4.x = this.line.dest_x - dx;
            if(i_src == 0)
                this.line.c1.y = this.line.y - dy;
            if(i_src == 1)
                this.line.c1.y = this.line.y;
            if(i_src == 2)
                this.line.c1.y = this.line.y + dy;
            if(i_dest == 0)
                this.line.c4.y = this.line.dest_y - dy;
            if(i_dest == 2)
                this.line.c4.y = this.line.dest_y + dy;
            if(i_dest == 3)
                this.line.c4.y = this.line.dest_y;
            this.line.c2.x = (this.line.dest_x + this.line.x)/2;
            this.line.c2.y = this.line.c1.y;
            this.line.c3.x = this.line.c2.x;
            this.line.c3.y = this.line.c4.y;
        }
        else if(this.line.dest_x <= this.line.x){
            i_src != 3 ? this.line.c1.x = this.line.x : this.line.c1.x = this.line.x - dx;
            (i_dest == 0 || i_dest == 2) ? this.line.c4.x = this.line.dest_x : this.line.c4.x = this.line.dest_x + dx;
            (i_dest == 1 || i_dest == 3) ? this.line.c4.y = this.line.dest_y : i_dest == 0 ? this.line.c4.y = this.line.dest_y - dy : this.line.c4.y = this.line.dest_y + dy;

            if(i_src == 0)
                this.line.c1.y = this.line.y - dy;
            if(i_src == 2)
                this.line.c1.y = this.line.y + dy;
            if(i_src == 3)
                this.line.c1.y = this.line.y;

            this.line.c2.x = (this.line.x + this.line.dest_x) / 2;
            this.line.c2.y = this.line.c1.y;
            this.line.c3.x = this.line.c2.x;
            this.line.c3.y = this.line.c4.y;
        }
     
        this.line.c_svg.setAttribute("fill", "none");
        this.line.redraw();
    }
}
export {Link};