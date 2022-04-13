
var test = require("tape");
var Component = require("../src/component");
var Register = require("../src/register");

var form_draw = 0;
global.svg = 0;



/**
 * HUB FactoryForm Class
 */

class _FactoryForm{

    createForm(uuid, type, param, events)
    {
        return new Circle(uuid, param.x, param.y, param.r, events);
    }
}
global.FactoryForm = new _FactoryForm();


/**
 * HUB Circle Class
 */

class Circle{

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
 * Test
 */

test("component should have a unique id", (t)=> {
    var comp1 = new Component("rectangle");
    var comp2 = new Component("circle");

    t.notEqual(comp1.uuid, comp2.uuid, "uuid does not matching");
    t.end();
});


test("test component constructor with 1 parametre", (t)=> {
    
    var comp = new Component("circle");

    t.equal(comp.form instanceof Circle, true);
    t.equal(comp.events.length, 0);
    t.end();
});

test("test component constructor with 3 parameters", (t) => {
    
    var comp1 = new Component("circle", [], {x: 1, y: 5, r: 9});

    t.equal( comp1.form instanceof Object, true);
    t.equal(comp1.events.length, 0);
    t.end();
});"form of component should be different of null"


test(" Event list must be built when events", (t) => {
    form_addEvent = 0;
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}], {x: 3, y: 5, r: 14} );
    
    
    t.equal(comp.events.length, 2);
    t.end();
});

test("draw the associate form", (t) => {
    form_draw = 0;
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}], {x: 3, y: 5, r: 14});
    
    t.equal(form_draw, 1);
    t.end();
});


test("check store when we register a component", (t) => {
    var comp1 = new Component("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});

    t.equal(Register.find(comp1.uuid), comp1);
    t.end();
});


test("delete a registered component", (t) => {
    var comp3 = new Component("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});
    
    Register.clear(comp3.uuid);
    var cp = Register.find(comp3.uuid);

    t.equal(cp, undefined);
    t.end();
});
