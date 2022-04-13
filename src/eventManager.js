nativeEvents = [];
/**
 * @class EventManager
 */

 class EventManager{

   

    /**
     * 
     * @param {SVGElement} target 
     * @param {DOMEvent} event 
     * @param {function} callback 
     */



    static add(target, event, callback){
        nativeEvents.push([target, event, callback, false]);
    }

    static destroy(){
       nativeEvents.splice(0, nativeEvents.length);
    }
}


module.exports = {
    nativeEvents,
    EventManager
};

