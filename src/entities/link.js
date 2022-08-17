import  {_uuid}  from "./uuid.js";
import {_Register}  from "../register.js"
import { config } from "../../config.js";
/**
 * @class Link
 */
class Link
{
    constructor(src_point, dest_point, line = undefined)
    {
       this.uuid = _uuid.generate();
       
       /* référence sur les points de connexions*/
       this.source = src_point;
       this.destination = dest_point;
       this.line = line;
       this.type = "link";
       _Register.add(this);
       if(config.linkcb)
        config.linkcb(this);
    }

    redraw(){
        var source = _Register.find(this.source.ref), destination = _Register.find(this.destination.ref);
        // var dx = 10, dy = 10;
       

        if(this.line != null){

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
            
            this.line.c1.x = this.line.x;
            this.line.c1.y = this.line.y;
            this.line.c2.x = this.line.x;
            this.line.c2.y = this.line.y;
            this.line.c3.x = this.line.dest_x;
            this.line.c3.y = this.line.dest_y;
            this.line.c4.x = this.line.dest_x;
            this.line.c4.y = this.line.dest_y;
            if(i_src == 0){
                if(i_dest == 3 || i_dest == 1){
                    this.line.c2.x = this.line.x;
                    this.line.c2.y = this.line.y;

                    this.line.c3.x = this.line.x;
                    this.line.c3.y = this.line.dest_y;
                }
                if(i_dest == 2){
                    this.line.c2.x = this.line.x;
                    this.line.c2.y = (this.line.y + this.line.dest_y)/2;
                    this.line.c3.x = this.line.dest_x;
                    this.line.c3.y = this.line.c2.y;
                }
            }
            if(i_src == 1){
                if(i_dest == 3){
                    this.line.c2.x = (this.line.x + this.line.dest_x)/2;
                    this.line.c2.y = this.line.y;

                    this.line.c3.x = this.line.c2.x;
                    this.line.c3.y = this.line.dest_y;
                }
                if(i_dest == 2 || i_dest == 0){
                    this.line.c2.x = this.line.x;
                    this.line.c2.y = this.line.y;

                    this.line.c3.x = this.line.dest_x;
                    this.line.c3.y = this.line.c2.y;
                }
                
            }
            if(i_src == 2){
                if(i_dest == 3 || i_dest == 1){
                    this.line.c2.x = this.line.x;
                    this.line.c2.y = this.line.y;
 
                    this.line.c3.x = this.line.c2.x;
                    this.line.c3.y = this.line.dest_y;
                }
                
                if(i_dest == 0){
                    this.line.c2.x = this.line.x                  
                    this.line.c2.y = (this.line.y + this.line.dest_y)/2;

                    this.line.c3.x = this.line.dest_x;
                    this.line.c3.y = this.line.c2.y;
                }
            }
            if(i_src == 3){
                if(i_dest == 2 || i_dest == 0){
                    this.line.c2.x = this.line.x;
                    this.line.c2.y = this.line.y;
 
                    this.line.c3.x = this.line.dest_x;
                    this.line.c3.y = this.line.y;
                }
                if(i_dest == 1){
                    this.line.c2.x = (this.line.x + this.line.dest_x)/2;
                    this.line.c2.y = this.line.y;

                    this.line.c3.x = this.line.c2.x;
                    this.line.c3.y = this.line.dest_y;
                }
            }

            // if(i_dest == 0){
            //     if(i_src == 3 || i_src == 1){
            //         this.line.c2.x = this.line.x;
            //         this.line.c2.y = this.line.y;

            //         this.line.c3.x = this.line.x;
            //         this.line.c3.y = this.line.dest_y;
            //     }
            //     if(i_src == 2){
            //         this.line.c2.x = this.line.x;
            //         this.line.c2.y = (this.line.y + this.line.dest_y)/2;
            //         this.line.c3.x = this.line.dest_x;
            //         this.line.c3.y = this.line.c2.y;
            //     }
            // }
            // if(i_dest == 1){
            //     if(i_src == 3){
            //         this.line.c2.x = (this.line.x + this.line.dest_x)/2;
            //         this.line.c2.y = this.line.y;

            //         this.line.c3.x = this.line.c2.x;
            //         this.line.c3.y = this.line.dest_y;
            //     }
            //     if(i_src == 2 || i_src == 0){
            //         this.line.c2.x = this.line.x;
            //         this.line.c2.y = this.line.y;

            //         this.line.c3.x = this.line.dest_x;
            //         this.line.c3.y = this.line.c2.y;
            //     }
                
            // }
            // if(i_dest == 2){
            //     if(i_src == 3 || i_src == 1){
            //         this.line.c2.x = this.line.x;
            //         this.line.c2.y = this.line.y;
 
            //         this.line.c3.x = this.line.c2.x;
            //         this.line.c3.y = this.line.dest_y;
            //     }
                
            //     if(i_src == 0){
            //         this.line.c2.x = this.line.x                  
            //         this.line.c2.y = (this.line.y + this.line.dest_y)/2;

            //         this.line.c3.x = this.line.dest_x;
            //         this.line.c3.y = this.line.c2.y;
            //     }
            // }

            // if(i_dest == 3){
            //     if(i_src == 2 || i_src == 0){
            //         this.line.c2.x = this.line.x;
            //         this.line.c2.y = this.line.y;
 
            //         this.line.c3.x = this.line.dest_x;
            //         this.line.c3.y = this.line.y;
            //     }
            //     if(i_src == 1){
            //         this.line.c2.x = (this.line.x + this.line.dest_x)/2;
            //         this.line.c2.y = this.line.y;

            //         this.line.c3.x = this.line.c2.x;
            //         this.line.c3.y = this.line.dest_y;
            //     }
            // }

            console.log("this.line 1");
            console.log(this.line);
            this.line.c_svg.setAttribute("fill", "none");
            this.line.redraw();
            console.log("this.line 2");
            console.log(this.line);
        }
    }
}
export {Link};