
/**
 * @class Event
 */

class Events{

    constructor(){
        this.nativeEvents = new Array();
    }

    /**
     * 
     * @param {SVGElement} target 
     * @param {DOMEvent} event 
     * @param {function} callback 
     */
    add(target, event, callback){
        this.nativeEvents.push([target, event, callback, false]);
    }

    destroy(){
       this.nativeEvents.splice(0, this.nativeEvents.length);
    }
}


module.exports = Events;

