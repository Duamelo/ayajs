var test = require("tape");
var Component = require("../src/component");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var  dom = new JSDOM(`<!DOCTYPE html>`);
dom = dom.window;

/**
 * 
 */
var form_addEvent = 0;
var form_draw = 0;


class Circle
{
    constructor(uuid, x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.uuid = uuid;
        
    }

    addEvent(ev, cb){
        
        form_addEvent++;
        
    }
    
    draw(){
        form_draw++;
        return `<circle id=${uuid} cx=${x} cy=${y} r=${r}/>`;
    }
}

class _FactoryForm
{

    createForm(uuid, type, param)
    {
        return new Circle(uuid,0,0, 5);
    }

   
}

global.FactoryForm = new _FactoryForm();



test("component should have a unique id", (t)=> {
    var comp1 = new Component("rectangle");
    var comp2 = new Component("circle");

    t.notEqual(comp1.uuid, comp2.uuid, "uuid does not matching");
    t.end();
})


test("test component constructor with 1 parametre", (t)=> {
    
    var comp = new Component("circle");

    t.equal(comp.x, 0, "abscisse should be 0");
    t.equal(comp.y, 0, "ordonne should be 0");
    t.equal(comp.form instanceof Circle, true);
    t.equal(comp.events.length, 0);
    t.end();
});

test("test component constructor with 3 parameters", (t) => {
    
    var comp1 = new Component("circle", [], 1, 5);


    t.equal(comp1.x, 1, "abscisse should be 1");
    t.equal(comp1.y, 5, "ordonnee should be 5");
    t.equal( comp1.form instanceof Object, true);
    t.equal(comp1.events.length, 0);
    t.end();
});"form of component should be different of null"

/*
test("it should be clone a component", (t) => {
    var comp = new Component("circle",[{ev: "drag", cb: null}, {ev: "drag", cb: null}], 1, 2);
    var c_comp = comp.clone();

    t.plan(5);
    t.assert(c_comp instanceof Object,  true, "clone component is an objet before");
    t.equal(c_comp.x, 6 ,"dx1 = dx0 +5");
    t.equal(c_comp.y, 6, "dy1 = dy0 +4");
   // t.equal(c_comp.form, comp.form)
    t.equal(c_comp.type, comp.type, "same type of form");
    t.notEqual(c_comp.uuid, comp.uuid, "different id");
    t.end();
});

*/
test("addEvent from form must be called when Events  ", (t) => {
    form_addEvent = 0;
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}]);
   
    
    t.equal(form_addEvent, 2);
    t.end();
});

test(" Event list must be built when events", (t) => {
    form_addEvent = 0;
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}] );
    
    
    t.equal(comp.events.length, 2);
    t.end();
});

test("draw the associate form", (t) => {
    form_draw = 0;
    var comp = new Component("circle", [{ev: "drag", cb: null}, {ev: "drag", cb: null}], 2, 3);
    
    t.equal(form_draw, 1);
    t.end();
});