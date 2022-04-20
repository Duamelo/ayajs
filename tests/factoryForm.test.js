var test = require("tape");
var FactoryForm = require("../src/factoryForm");


/**
 * HUB uuid class
 */

 class _uuid
 {
 
     constructor()
     {
 
     }
 
     generate()
     {
         return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
     }
 }
 
 
 global.Uuid = new _uuid();
 

 
/**
 * HUB Circle Class
 */

class _Circle{

    constructor(uuid, x, y, r, events){
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r;
        this.events = events;
        
    }

    draw(){
        form_draw++;
    }
}

global.Circle = _Circle;

test("create a specific form", (t) => {
    var form = new FactoryForm().createForm(Uuid.generate(), "circle", {}, []);

    t.equal(form instanceof Circle, true);
    t.end();
});