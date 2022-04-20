
var test = require("tape");
var Component = require("../src/component");

var form_draw = 0;



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
 * HUB Register Class
 */

global.store = {};

class _Register{
    
    constructor() {}

    add(uuid, component) {
    
        store[uuid] = component;

        return {
            id: uuid,
            Component: component,
            store: store
        }
    }

    find(uuid){
        return store[uuid];
    }

    update(uuid, params){

        var cp = store[uuid];

        cp.params.x = params.x;
        cp.params.y = params.y;
        cp.params.r = params.r;

        cp.form.x = params.x;
        cp.form.y = params.y;
        cp.form.r = params.r;
    }

    clear(uuid){
        delete store[uuid];
    }
}

global.Register = new  _Register();



class _Events
{
    constructor(){


    }
}

global.Events = _Events;



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

    t.equal(Object.keys(comp.params).length, 0);
    t.equal(comp.form instanceof Circle, true);
    t.equal(comp.events.length, 0);
    t.end();
});

test("test component constructor with 3 parameters", (t) => {
    
    var comp1 = new Component("circle", [], {x: 1, y: 5, r: 9});


    t.equal(comp1.params.x, 1);
    t.equal(comp1.params.y, 5);
    t.equal(comp1.params.r, 9);
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

test("component must be added to register class when we create it", (t) => {
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}], {x: 3, y: 5, r: 14});

    t.equal(comp.register.id, comp.uuid);
    t.equal(comp.register.Component, comp);
    t.end();
});


test("check store when we register a component", (t) => {
    store = {};
    //var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}], {x: 3, y: 5, r: 14});
    var comp1 = new Component("circle", [], {x: 10, y: 15, r: 60});
    var comp3 = new Component("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});

    t.equal(Object.keys(store).length, 2);
    t.end();
});


test("find component by uuid", (t) => {
    var comp1 = new Component("circle", [], {x: 10, y: 15, r: 60});

    var cp = Register.find(comp1.uuid);

    t.deepEqual(cp, comp1);
    t.end();
});


test("update component by uuid", (t) => {
    var comp3 = new Component("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});

    Register.update(comp3.uuid, {x: 200, y: 200, r: 200});

    t.equal(comp3.params.x, 200);
    t.equal(comp3.params.y, 200);
    t.equal(comp3.params.r, 200);
    t.end();
});


test("delete a registered component", (t) => {
    var comp3 = new Component("circle", [{ev: "drag", cb: null}], {x: 100, y: 150, r: 640});
    
    Register.clear(comp3.uuid);
    var cp = Register.find(comp3.uuid);

    t.equal(cp, undefined);
    t.end();
});

