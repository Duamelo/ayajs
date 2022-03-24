var test = require("tape");
var Component = require("../src/component");


/*
class _FactoryForm
{

    createForm(type)
    {
        return type;
    }
}

global.FactoryForm = new _FactoryForm();
*/


test("component should have a unique id", (t)=> {
    var comp1 = new Component("rectangle");
    var comp2 = new Component("circle");

    t.notEqual(comp1.uuid, comp2.uuid, "uuid does not matching");
    t.end();
})


test("test component constructor with 1 parametre", (t)=> {
    
    var comp = new Component("rectangle");

    t.plan(3);
    t.equal(comp.x, 0, "abscisse should be 0");
    t.equal(comp.y, 0, "ordonne should be 0");
    t.equal(comp.form, "rectangle", "form of component should be different of null");

    t.end();
});

test("test component constructor with 3 parameters", (t) => {
    
    var comp1 = new Component("carre", 1, 5);

    t.plan(3);
    t.equal(comp1.x, 1, "abscisse should be 1");
    t.equal(comp1.y, 5, "ordonnee should be 5");
    t.equal(comp1.form, "carre", "form of component should be different of null");
    t.end();
});


test("it should be clone a component", (t) => {
    var comp = new Component("triangle", 1, 2);
    var c_comp = comp.clone();

    t.plan(5);
    t.assert(c_comp instanceof Object,  true, "clone component is an objet before");
    t.equal(c_comp.x, 6 ,"dx1 = dx0 +5");
    t.equal(c_comp.y, 6, "dy1 = dy0 +4");
    t.equal(comp.type, c_comp.type, "same type of form");
    t.notEqual(comp.uuid, c_comp.uuid, "different id");
    t.end();
});