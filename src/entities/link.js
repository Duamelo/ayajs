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
       
       console.log(this);
    }

    redraw(){
        this.smallWay();

        var delta_x, delta_y, c1 = {x : 0, y: 0}, c2 = {x : 0, y: 0};

        delta_x = (this.line.x > this.line.dest_x) ? this.line.x - this.line.dest_x :  -(this.line.x - this.line.dest_x);
        delta_y = (this.line.y > this.line.dest_y) ? this.line.y - this.line.dest_y :  -(this.line.y - this.line.dest_y);
        
        console.log("delta_x,delta_y")
        console.log(delta_x,delta_y)
        console.log("this.line")
        console.log(this.line)

        // c1.x = (this.line.x > this.line.dest_x) ? this.line.x - delta_x/2 : this.line.x + delta_x/2;
        // c1.y = (this.line.y > this.line.dest_y) ? this.line.y  : this.line.dest_y;

        // c2.x = c1.x;
        // c2.y = -delta_y + c1.y;

        delta_x /= 2;
        c1.x = (this.line.x < this.line.dest_x) ? this.line.x + delta_x : this.line.x - delta_x;
        c1.y = this.line.y;

        c2.x = (this.line.dest_x < this.line.x) ? this.line.dest_x + delta_x : this.line.dest_x - delta_x;
        c2.y = this.line.dest_y;

        console.log('c1')
        console.log(c1)
        console.log('c2')
        console.log(c2)

        this.line.c1 = c1;
        this.line.c2 = c2;

        this.line.redraw();
        
    }

    
    smallWay(){
        function calculateDistance(a, b){
            return (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y);
            // return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
            
        }

        //get source point
        var srcPoint, destPoint; 

        this.source.form.c_points.forEach(elt => {
            if( elt.x == this.line.x && elt.y == this.line.y){
                console.log(' source point  found ');
                console.log(elt);
                srcPoint = elt;
            }
                
        });

        //get destination point
        this.destination.form.c_points.forEach(elt => {
            if( elt.x == this.line.dest_x && elt.y == this.line.dest_y){
                console.log(' destination point found ');
                console.log(elt);
                destPoint = elt;
            }
                
        });

        //calculate Min distance

            //first value of minValue
        var minValue = calculateDistance(this.source.form.c_points[0], destPoint);
        
        this.source.form.c_points.forEach(ptSource => {

            this.destination.form.c_points.forEach(ptDest => {
                var newDistance = calculateDistance(ptSource, ptDest)
                if( minValue >= newDistance){
                    minValue = newDistance;
                    
                    srcPoint = ptSource;
                    destPoint = ptDest;
                }
            });
            

        });


 
        this.line.x = srcPoint.x;
        this.line.y = srcPoint.y;

        this.line.dest_x = destPoint.x;
        this.line.dest_y = destPoint.y;


        //calculate distance between source and destination



    }
}

export {Link};