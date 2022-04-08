var test = require("tape");
var FactoryForm = require("../src/factoryForm");
const uuid = require("../src/maths/uuid");

 
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
    var form = new FactoryForm().createForm(uuid.generate(), "circle", {}, []);

    t.equal(form instanceof Circle, true);
    t.end();
});
