import  {_uuid}  from "./uuid.js";
import {_Register}  from "../register.js"
import { EndsDecorator } from "../decorators/endsDecorator.js";

/**
 * @class Link
 */
class Link
{
    constructor(src_point, dest_point, line = undefined, svg, config = null)
    {
       this.uuid = _uuid.generate();
       
       /* reference on the connexion points*/
       this.source = src_point;
       this.destination = dest_point;

       this.line = line;
       this.type = "link";
        
       this.svg = svg;

       this.line_t = config ? config.line.type : null;

       var c_line = _Register.find(this.line.uuid);

       if (c_line)
            new EndsDecorator(c_line, c_line.shape.config, this.svg, c_line.shape.nativeEvent);

        /* set config.linkcb to retrieve the current link */
       if(config && config.current_link)
            config.current_link(this);
        _Register.add(this);
    }

    redraw(){
        var source = _Register.find(this.source.ref), destination = _Register.find(this.destination.ref);

        if(this.line != null){
            var i_src = source.shape.optimalPath(this.line);
            var i_dest = destination.shape.optimalPath(this.line);
            if (i_src == null)
                source.shape.c_points.map((pt, index) => { if (pt.x == this.source.x && pt.y == this.source.y) i_src = index});
            if (i_dest == null)
                destination.shape.c_points.map((pt, index) => { if (pt.x == this.destination.x && pt.y == this.destination.y) i_dest = index});
    
            this.source = source.shape.c_points[i_src];            
            this.destination = destination.shape.c_points[i_dest];

            this.line.x = this.source.x;
            this.line.y = this.source.y;
            this.line.dest_x = this.destination.x;
            this.line.dest_y = this.destination.y;

            this.setTypeLink();

            if (this.line_t){
                if(this.line.x < this.line.dest_x && this.line.y > this.line.dest_y){
                    if (i_src == 0 &&  i_dest == 2){
                        this.line.c2.x = this.line.x;
                        this.line.c2.y = (this.line.y + this.line.dest_y) / 2;
            
                        this.line.c3.y = this.line.c2.y;
                        this.line.c3.x = this.line.dest_x;
                        
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(-Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(Math.PI/2);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                    else if (i_src == 0 && i_dest == 3){
                        this.line.c3.x = this.line.x;
                        this.line.c3.y = this.line.dest_y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(2 * Math.PI);
                            else if (child.src)
                                child.setRotateAngle(Math.PI/2);
                        });
                        this.line.setPath([this.line.c3]);
                    }
                    else if (i_src == 1 && i_dest == 2){
                        this.line.c2.x = this.line.dest_x;
                        this.line.c2.y = this.line.y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(-Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(Math.PI);
                        });

                        this.line.setPath([this.line.c2]);
                    }
                    else if (i_src == 1 && i_dest == 3){
                        this.line.c2.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c2.y = this.line.y;
            
                        this.line.c3.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c3.y = this.line.dest_y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(0);
                            else if (child.src)
                                child.setRotateAngle(Math.PI);
                        });

                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                }
                else if(this.line.x < this.line.dest_x && this.line.y < this.line.dest_y){
                    if (i_src == 1 && i_dest == 0){
                        this.line.c3.x = this.line.dest_x;
                        this.line.c3.y = this.line.y;
    
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(Math.PI);
                        });
                        this.line.setPath([this.line.c3]);
                    }
                    else if (i_src == 1 && i_dest == 3){
                        this.line.c2.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c2.y = this.line.y;
            
                        this.line.c3.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c3.y = this.line.dest_y;
    
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(2 * Math.PI);
                            else if (child.src)
                                child.setRotateAngle(Math.PI);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                    else if (i_src == 2 && i_dest == 3){
                        this.line.c1.x = this.line.x;
                        this.line.c1.y = this.line.dest_y;
    
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(2 * Math.PI);
                            else if (child.src)
                                child.setRotateAngle(-Math.PI/2);
                        });
                        this.line.setPath([this.line.c1]);
                    }
                    else if (i_src == 2 && i_dest == 0){
                        this.line.c2.x = this.line.x;
                        this.line.c2.y = (this.line.y + this.line.dest_y) / 2;
            
                        this.line.c3.y = this.line.c2.y;
                        this.line.c3.x = this.line.dest_x;

                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(-Math.PI/2);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                }
                else if(this.line.dest_x < this.line.x &&  this.line.dest_y > this.line.y){
                    if (i_dest == 0 &&  i_src == 2){
                        this.line.c2.x = this.line.x;
                        this.line.c2.y = (this.line.y + this.line.dest_y) / 2;
            
                        this.line.c3.y = this.line.c2.y;
                        this.line.c3.x = this.line.dest_x;
    
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(-Math.PI/2);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                    else if (i_dest == 0 && i_src == 3){
                        this.line.c3.x = this.line.dest_x;
                        this.line.c3.y = this.line.y;
                       
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(2 * Math.PI);
                        });
                        this.line.setPath([this.line.c3]);
                    }
                    else if (i_dest == 1 && i_src == 2){
                        this.line.c3.x = this.line.x;
                        this.line.c3.y = this.line.dest_y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI);
                            else if (child.src)
                                child.setRotateAngle(-Math.PI/2);
                        });
                        this.line.setPath([this.line.c3]);
                    }
                    else if (i_dest == 1 && i_src == 3){
                        this.line.c2.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c2.y = this.line.y;
            
                        this.line.c3.x = (this.line.dest_x + this.line.x)/2;
                        this.line.c3.y = this.line.dest_y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI);
                            else if (child.src)
                                child.setRotateAngle(2 * Math.PI);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                }
                else if(this.line.dest_x < this.line.x &&  this.line.dest_y < this.line.y){   
                    if (i_src == 0 && i_dest == 1){
                        this.line.c2.x = this.line.x;
                        this.line.c2.y = this.line.dest_y;
    
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI);
                            else if (child.src)
                                child.setRotateAngle(Math.PI/2);
                        });
                        this.line.setPath([this.line.c2]);
                    }         
                    else if (i_src == 3 && i_dest == 1){
                        this.line.c2.x = (this.line.x + this.line.dest_x) / 2;
                        this.line.c2.y = this.line.y;
    
                        this.line.c3.x = (this.line.x + this.line.dest_x) / 2;
                        this.line.c3.y = this.line.dest_y;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(Math.PI);
                            else if (child.src)
                                child.setRotateAngle(2 * Math.PI);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                    else if (i_src == 0 && i_dest == 2){
                        this.line.c2.x = this.line.x;
                        this.line.c2.y = (this.line.y + this.line.dest_y) / 2;
            
                        this.line.c3.x = this.line.dest_x;
                        this.line.c3.y = (this.line.y + this.line.dest_y) / 2;
            
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(-Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(Math.PI/2);
                        });
                        this.line.setPath([this.line.c2, this.line.c3]);
                    }
                    else if (i_src == 3 && i_dest == 2){
                        this.line.c3.x = this.line.dest_x;
                        this.line.c3.y = this.line.y;
                                
                        this.line.children.map(({child})=>{
                            if (child.dest)
                                child.setRotateAngle(-Math.PI/2);
                            else if (child.src)
                                child.setRotateAngle(2 * Math.PI);
                        });
                        this.line.setPath([this.line.c3]);
                    }
                }
            }
            else
                this.line.children.map(({child})=>{
                    if (child.dest)
                        child.setRotateAngle(this.line.calculateAngle());
                    else if (child.src)
                        child.setRotateAngle(this.line.calculateAngle() - Math.PI);
                });
            this.line.setStyles({fill: "none"});
            this.line.redraw();
        }
    }

    setTypeLink(){
        this.line.setTypeLink(this.line_t);
    }
}
export {Link};