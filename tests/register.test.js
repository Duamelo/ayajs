var test = require("tape");
const Register = require("../src/register");


/**
 * HUB uuid class
 */
class _uuid
 {
 
     constructor() {}
 
     generate()
     {
         return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
     }
 }
global.Uuid = _uuid;


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
        this.uuid = new Uuid().generate();
        this.type = type;
        this.params = params
        this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, this.params, events);
        this.form.draw();
        this.register = new Register().add(this.uuid, this);
    }
}
global.Comp = _Comp;





test("find component by uuid", (t) => {
    var comp1 = new Comp("circle", [], {x: 10, y: 15, r: 60});

    var cp = new Register().find(comp1.uuid);

    t.deepEqual(cp, comp1);
    t.end();
});


test("update component by uuid", (t) => {
    var comp3 = new Comp("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});

    new Register().update(comp3.uuid, {x: 200, y: 200, r: 200});

    t.equal(comp3.params.x, 200);
    t.equal(comp3.params.y, 200);
    t.equal(comp3.params.r, 200);
    t.end();
});


test("delete a registered component", (t) => {
    var comp3 = new Comp("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});
    
    new Register().clear(comp3.uuid);
    var cp = new Register().find(comp3.uuid);

    t.equal(cp, undefined);
    t.end();
});
