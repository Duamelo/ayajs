import {Point } from "../maths/point.js";
class Connector
{
    static create(type, uuid){
        var cp = [];

        if(type == 'rectangle'){
           for(var i = 0; i < 8; i++){
               cp.push(new Point(uuid, 0, 0, 5));
           }
        }
        return cp;
    }
}


export {Connector};