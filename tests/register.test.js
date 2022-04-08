var test = require("tape");
const uuid = require("../src/maths/uuid");
const Register = require("../src/register");


 /**
 * HUB FactoryForm Class
 */

class _FactoryForm
{

    createForm(uuid, type, param, events)
    {
        return new Circle(uuid, param.x, param.y, param.r, events);
    }
}
global.FactoryForm = new _FactoryForm();


/**
 * HUB Circle Class
 */

 var form_draw = 0;

class Circle
{

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


 /**
  * HUB Component class
  */
 
class _Comp
{
    constructor( type, events = [],  params = {})
    {
        this.uuid = uuid.generate();
        this.type = type;
        this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, params, events);
        this.form.draw();
        this.register =  Register.add(this);
    }
}
global.Comp = _Comp;





test("find component by uuid", (t) => {
    var comp1 = new Comp("circle", [], {x: 10, y: 15, r: 60});

    var cp = Register.find(comp1.uuid);

    t.deepEqual(cp, comp1);
    t.end();
});


test("delete a registered component", (t) => {
    var comp3 = new Comp("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});
    
    Register.clear(comp3.uuid);
    var cp = Register.find(comp3.uuid);

    t.equal(cp, undefined);
    t.end();
});
