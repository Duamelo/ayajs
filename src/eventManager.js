/**
 *  @class 
 */

class EventManager
{
    constructor()
    {
        /**
         * @type {Array}
         * Store all events in the manager, their target and callback
         * 
         * Format  [target, event, callback, active]
         */

        this.events = [];
    }

    
    add = (target, event, callback) =>
    {
        this.events.push([target, event, callback, false]);
    }
}


module.exports = EventManager;
