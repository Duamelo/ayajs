/**
 * @class Link 
 */

var registry_link = {};

class Link
{
 

    constructor() {}

    add(uuid, source, destination){
        registry_link[uuid] = {src: source, dest: destination};
    }

    find(uuid){
        return registry_link[uuid];
    }
    
    draw(link_id){
        BezierCurve.draw(link_id);
    }
    
    destroy(uuid){
        delete registry_link[uuid];
    }
}
module.exports = Link;
